import { Injectable, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SVG_CATALOG } from './svg-catalog';

@Injectable({
  providedIn: 'root'
})
export class SvgService {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly cache = new Map<string, string>();
  private readonly safeCache = new Map<string, SafeHtml>();

  constructor() {
    // Pre-populate cache from the catalog for instantaneous zero-latency rendering
    for (const [name, svg] of Object.entries(SVG_CATALOG)) {
      this.cache.set(name, svg);
      this.safeCache.set(name, this.sanitizer.bypassSecurityTrustHtml(svg));
    }
  }

  /**
   * Returns a sanitized SafeHtml instance for inline SVG rendering.
   */
  getSvg(name: string): SafeHtml {
    const cachedSafe = this.safeCache.get(name);
    if (cachedSafe) {
      return cachedSafe;
    }

    const rawSvg = this.cache.get(name);
    if (rawSvg) {
      const safe = this.sanitizer.bypassSecurityTrustHtml(rawSvg);
      this.safeCache.set(name, safe);
      return safe;
    }

    // Dynamic runtime fetch from assets/*.svg for any new or uncached icon
    if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
      fetch(`/assets/${encodeURIComponent(name)}.svg`)
        .then((res) => {
          if (res.ok) {
            return res.text();
          }
          throw new Error(`Failed to load SVG icon: ${name}`);
        })
        .then((svgText) => {
          this.cache.set(name, svgText);
          this.safeCache.set(name, this.sanitizer.bypassSecurityTrustHtml(svgText));
        })
        .catch(() => {
          // Fallback handled by default icon
        });
    }

    // Return fallback icon SafeHtml if available, or empty
    const fallback = this.safeCache.get('code') || this.sanitizer.bypassSecurityTrustHtml('');
    return fallback;
  }
}
