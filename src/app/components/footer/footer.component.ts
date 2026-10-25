import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'block w-full border-t border-slate-200/80 dark:border-white/10 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl mt-20'
  }
})
export class FooterComponent {
  protected readonly scrollService = inject(ScrollService);

  readonly currentYear = new Date().getFullYear();
  readonly githubUrl = 'https://github.com/chinmaya-704';
  readonly linkedinUrl = 'https://www.linkedin.com/in/chinmaya-kumar-sahoo-b47385254/';

  scrollToTop(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.scrollService.scrollTo('hero');
  }
}
