import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ProjectCategory } from '../../models/portfolio.models';
import { ProjectCardComponent } from './project-card.component';
import { ProjectModalComponent } from './project-modal.component';
import { IconComponent } from '../icon/icon.component';

interface CategoryFilterTab {
  readonly id: ProjectCategory;
  readonly label: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCardComponent, ProjectModalComponent, IconComponent],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'block py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
  }
})
export class ProjectsComponent {
  protected readonly projectService = inject(ProjectService);

  readonly categoryTabs: readonly CategoryFilterTab[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full-Stack MERN' },
    { id: 'frontend', label: 'Frontend Apps' },
    { id: 'ai-ml', label: 'AI & Medical Diagnostics' },
    { id: 'mini', label: 'Interactive Utilities' }
  ];
}
