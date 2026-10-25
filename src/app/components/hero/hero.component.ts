import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
  ChangeDetectionStrategy
} from '@angular/core';
import { TypewriterService } from '../../services/typewriter.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'block relative pt-6 pb-16 sm:py-24 overflow-hidden'
  }
})
export class HeroComponent implements OnInit, OnDestroy {
  protected readonly typewriter = inject(TypewriterService);

  readonly emailAddress = 'cksahoo704@gmail.com';
  readonly githubUrl = 'https://github.com/chinmaya-704';
  readonly linkedinUrl = 'https://www.linkedin.com/in/chinmaya-kumar-sahoo-b47385254/';

  readonly copiedToast = signal<boolean>(false);
  private copyTimeout: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.typewriter.init([
      'Full-Stack Developer',
      'Angular, NestJS & Node.js',
      '.NET & Backend Systems',
      'API & Database Architect'
    ]);
  }

  ngOnDestroy(): void {
    this.typewriter.destroy();
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
    }
  }

  async copyEmail(event?: Event): Promise<void> {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(this.emailAddress);
        this.copiedToast.set(true);
        if (this.copyTimeout) clearTimeout(this.copyTimeout);
        this.copyTimeout = setTimeout(() => {
          this.copiedToast.set(false);
        }, 2500);
      }
    } catch (err) {
      console.warn('Clipboard write prevented or unsupported:', err);
    }
  }
}
