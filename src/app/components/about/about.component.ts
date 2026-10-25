import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'block py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
  }
})
export class AboutComponent {
  readonly corePrinciples = [
    {
      title: 'Scalable Full-Stack Engineering',
      description: 'Building modular applications with Angular, NestJS, Node.js, and .NET, emphasizing maintainability, performance, and clean separation of concerns.',
      icon: 'layers'
    },
    {
      title: 'Robust APIs & Data Systems',
      description: 'Designing reliable REST APIs and working with PostgreSQL, MongoDB, and SQL to support efficient data access and dependable backend services.',
      icon: 'database'
    },
    {
      title: 'Leadership & Collaboration',
      description: 'Experienced in coordinating 30+ member teams, managing event delivery, mentoring hackathon participants, and driving initiatives through collaboration.',
      icon: 'users'
    }
  ];
}
