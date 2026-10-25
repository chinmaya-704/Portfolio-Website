import {
  Component,
  ElementRef,
  viewChild,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  NgZone,
  ChangeDetectionStrategy
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

@Component({
  selector: 'app-ambient-canvas',
  standalone: true,
  templateUrl: './ambient-canvas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'fixed inset-0 pointer-events-none -z-10 block overflow-hidden'
  }
})
export class AmbientCanvasComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private animationFrameId: number | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private mouse = { x: -1000, y: -1000, radius: 150 };
  private width = 0;
  private height = 0;
  private isTabVisible = true;
  private prefersReducedMotion = false;

  private readonly onResize = (): void => {
    this.resize();
  };

  private readonly onMouseMove = (e: MouseEvent): void => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  };

  private readonly onVisibilityChange = (): void => {
    if (typeof document !== 'undefined') {
      this.isTabVisible = !document.hidden;
      if (this.isTabVisible && !this.animationFrameId && !this.prefersReducedMotion) {
        this.startAnimation();
      }
    }
  };

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.prefersReducedMotion =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    this.ngZone.runOutsideAngular(() => {
      this.initCanvas();
    });
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    if (this.isBrowser && typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
      window.removeEventListener('mousemove', this.onMouseMove);
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', this.onVisibilityChange);
      }
    }
  }

  private initCanvas(): void {
    const canvas = this.canvasRef().nativeElement;
    this.ctx = canvas.getContext('2d', { alpha: true });
    if (!this.ctx) return;

    this.resize();
    this.createParticles();
    this.setupEventListeners();

    if (this.prefersReducedMotion) {
      this.renderStaticFrame();
    } else {
      this.startAnimation();
    }
  }

  private setupEventListeners(): void {
    if (typeof window === 'undefined') return;
    window.addEventListener('resize', this.onResize, { passive: true });
    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', this.onVisibilityChange);
    }
  }

  private resize(): void {
    const canvas = this.canvasRef().nativeElement;
    const dpr = Math.min((typeof window !== 'undefined' && window.devicePixelRatio) || 1, 2);
    this.width = (typeof window !== 'undefined' && window.innerWidth) || 1200;
    this.height = (typeof window !== 'undefined' && window.innerHeight) || 800;

    canvas.width = this.width * dpr;
    canvas.height = this.height * dpr;
    canvas.style.width = `${this.width}px`;
    canvas.style.height = `${this.height}px`;

    if (this.ctx) {
      this.ctx.scale(dpr, dpr);
    }
  }

  private createParticles(): void {
    const densityDivisor = this.width < 768 ? 18000 : 12000;
    const count = Math.min(Math.floor((this.width * this.height) / densityDivisor), 75);

    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.5 + 0.25,
        color: this.getRandomColor()
      });
    }
  }

  private getRandomColor(): string {
    const colors = ['34, 211, 238', '129, 140, 248', '168, 85, 247', '56, 189, 248'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  private startAnimation(): void {
    const loop = () => {
      if (!this.isTabVisible || !this.ctx) {
        this.animationFrameId = null;
        return;
      }
      this.draw();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }

  private renderStaticFrame(): void {
    this.draw();
  }

  private draw(): void {
    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    const maxDistance = this.width < 768 ? 95 : 130;

    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];

      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const lineAlpha = (1 - dist / maxDistance) * 0.16;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(${p1.color}, ${lineAlpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }

      const mdx = this.mouse.x - p1.x;
      const mdy = this.mouse.y - p1.y;
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

      if (mDist < this.mouse.radius && mDist > 0) {
        const force = (this.mouse.radius - mDist) / this.mouse.radius;
        const angle = Math.atan2(mdy, mdx);
        p1.x -= Math.cos(angle) * force * 1.5;
        p1.y -= Math.sin(angle) * force * 1.5;
      }

      p1.x += p1.vx;
      p1.y += p1.vy;

      if (p1.x < 0) {
        p1.x = 0;
        p1.vx *= -1;
      } else if (p1.x > this.width) {
        p1.x = this.width;
        p1.vx *= -1;
      }

      if (p1.y < 0) {
        p1.y = 0;
        p1.vy *= -1;
      } else if (p1.y > this.height) {
        p1.y = this.height;
        p1.vy *= -1;
      }

      this.ctx.beginPath();
      this.ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p1.color}, ${p1.alpha})`;
      this.ctx.fill();
    }
  }
}
