import {
  Component,
  AfterViewInit,
  inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { ScrollService } from './services/scroll.service';
import { AmbientCanvasComponent } from './components/background-mesh/ambient-canvas.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { StatsBarComponent } from './components/stats-bar/stats-bar.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AmbientCanvasComponent,
    NavbarComponent,
    HeroComponent,
    // StatsBarComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements AfterViewInit {
  private readonly scrollService = inject(ScrollService);

  ngAfterViewInit(): void {
    // Register section IDs for intersection observer scroll-spy
    this.scrollService.registerSections([
      'hero',
      'about',
      'skills',
      'experience',
      'projects',
      'contact'
    ]);
  }
}
