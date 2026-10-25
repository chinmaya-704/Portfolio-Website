import { Injectable, signal, inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly activeSection = signal<string>('hero');
  readonly isScrolled = signal<boolean>(false);

  private observer?: IntersectionObserver;

  constructor() {
    if (this.isBrowser && typeof window !== 'undefined') {
      this.initScrollListener();
      this.checkInitialHash();
    }
  }

  registerSections(sectionIds: string[]): void {
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') return;

    if (this.observer) {
      this.observer.disconnect();
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      this.ngZone.run(() => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
            break;
          }
        }
      });
    }, options);

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        this.observer.observe(el);
      }
    }
  }

  scrollTo(sectionId: string, updateHash: boolean = true): void {
    if (!this.isBrowser || typeof window === 'undefined') return;
    const cleanId = sectionId.replace(/^#/, '');
    const el = document.getElementById(cleanId);
    if (el) {
      const yOffset = -80; // Navbar height offset
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      this.activeSection.set(cleanId);

      if (updateHash && typeof history !== 'undefined' && typeof history.pushState === 'function') {
        history.pushState(null, '', '#' + cleanId);
      }
    }
  }

  private checkInitialHash(): void {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      setTimeout(() => {
        this.scrollTo(hash.substring(1), false);
      }, 150);
    }
  }

  private initScrollListener(): void {
    window.addEventListener(
      'scroll',
      () => {
        const scrolled = window.scrollY > 20;
        if (this.isScrolled() !== scrolled) {
          this.isScrolled.set(scrolled);
        }
      },
      { passive: true }
    );
  }
}
