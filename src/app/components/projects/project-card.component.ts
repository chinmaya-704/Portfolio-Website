import { Component, input, inject, ChangeDetectionStrategy } from '@angular/core';
import { Project } from '../../models/portfolio.models';
import { ProjectService } from '../../services/project.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './project-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'block h-full'
  }
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
  protected readonly projectService = inject(ProjectService);

  openModal(): void {
    this.projectService.openProjectModal(this.project());
  }
}
