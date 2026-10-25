import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ExperienceService, ExperienceTrack } from '../../services/experience.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './experience.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'block py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
  }
})
export class ExperienceComponent {
  protected readonly expService = inject(ExperienceService);

  readonly tracks = [
    { id: 'all' as ExperienceTrack, label: 'All Milestones' },
    { id: 'work' as ExperienceTrack, label: 'Work Experience' },
    { id: 'leadership' as ExperienceTrack, label: 'Leadership & Community' }
  ];
}
