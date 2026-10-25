import { Injectable, signal, inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TypewriterService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly text = signal<string>('');

  private phrases: string[] = [
    'Full-Stack MERN Developer',
    'Angular & React Engineer',
    'Modern UI/UX Architect',
    'Creative Tech Leader'
  ];

  private currentPhraseIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private timer: ReturnType<typeof setTimeout> | null = null;

  init(customPhrases?: string[]): void {
    if (customPhrases && customPhrases.length > 0) {
      this.phrases = customPhrases;
    }

    if (this.isBrowser) {
      this.ngZone.runOutsideAngular(() => {
        this.tick();
      });
    }
  }

  destroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private tick = (): void => {
    const currentPhrase = this.phrases[this.currentPhraseIndex];

    if (this.isDeleting) {
      this.currentCharIndex--;
    } else {
      this.currentCharIndex++;
    }

    const currentSubstr = currentPhrase.substring(0, this.currentCharIndex);
    this.ngZone.run(() => {
      this.text.set(currentSubstr);
    });

    let delta = this.isDeleting ? 45 : 90;

    if (!this.isDeleting && this.currentCharIndex === currentPhrase.length) {
      // Pause at full phrase
      delta = 1800;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      // Finished deleting, move to next phrase
      this.isDeleting = false;
      this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
      delta = 400;
    }

    this.timer = setTimeout(this.tick, delta);
  };
}
