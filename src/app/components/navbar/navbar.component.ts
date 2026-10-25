import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';
import { IconComponent } from '../icon/icon.component';

interface NavItem {
  readonly id: string;
  readonly label: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'sticky top-0 z-50 block w-full'
  }
})
export class NavbarComponent {
  protected readonly scrollService = inject(ScrollService);

  readonly isMobileMenuOpen = signal<boolean>(false);

  readonly navItems: readonly NavItem[] = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' }
  ];

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  navTo(event: Event, id: string): void {
    event.preventDefault();
    this.scrollService.scrollTo(id);
    this.closeMobileMenu();
  }
}
