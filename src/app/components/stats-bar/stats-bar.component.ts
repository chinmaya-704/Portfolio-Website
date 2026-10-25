import { Component, ChangeDetectionStrategy } from '@angular/core';
import { QuickStat } from '../../models/portfolio.models';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-stats-bar',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './stats-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'
  }
})
export class StatsBarComponent {
  readonly stats: readonly QuickStat[] = [
    {
      value: '7+',
      label: 'Deployed Web Applications',
      icon: 'layers'
    },
    {
      value: '30+',
      label: 'Team Members Led',
      icon: 'user'
    },
    {
      value: '3',
      label: 'Hackathon Finalist Teams Mentored',
      icon: 'award'
    },
    {
      value: '2+',
      label: 'Years Continuous Building',
      icon: 'terminal'
    }
  ];
}
