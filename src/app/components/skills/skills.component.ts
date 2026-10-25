import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { SkillCategory } from '../../models/portfolio.models';
import { IconComponent } from '../icon/icon.component';

type SkillTab = 'all' | 'frontend' | 'backend' | 'database' | 'tools';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './skills.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'block py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
  }
})
export class SkillsComponent {
  readonly activeTab = signal<SkillTab>('all');

  readonly categories: readonly (SkillCategory & { id: SkillTab })[] = [
    {
      id: 'frontend',
      title: 'Frontend & UI Engineering',
      skills: [
        { name: 'Angular', icon: 'angular', proficiency: 'Advanced' },
        { name: 'React', icon: 'react', proficiency: 'Beginner' },
        { name: 'TypeScript', icon: 'typescript', proficiency: 'Advanced' },
        { name: 'Tailwind CSS', icon: 'tailwind', proficiency: 'Intermediate' },
        { name: 'HTML5 & CSS3', icon: 'html5', proficiency: 'Advanced' }
      ]
    },
    {
      id: 'backend',
      title: 'Backend & APIs',
      skills: [
        { name: 'Node.js', icon: 'nodejs', proficiency: 'Advanced' },
        { name: 'NestJS', icon: 'nestjs', proficiency: 'Advanced' },
        { name: '.NET', icon: 'dotnet', proficiency: 'Advanced' },
        { name: 'Express.js', icon: 'express', proficiency: 'Intermediate' },
        { name: 'RESTful APIs', icon: 'api', proficiency: 'Advanced' },
        { name: 'GraphQL', icon: 'graphql', proficiency: 'Intermediate' },
        { name: 'JWT & Authentication', icon: 'jwt', proficiency: 'Intermediate' },
        { name: 'Flask / Python', icon: 'python', proficiency: 'Beginner' }
      ]
    },
    {
      id: 'database',
      title: 'Databases & Storage',
      skills: [
        { name: 'MongoDB', icon: 'mongodb', proficiency: 'Intermediate' },
        { name: 'SQL Server', icon: 'sqlserver', proficiency: 'Advanced' },
        { name: 'Mongoose ODM', icon: 'mongoose', proficiency: 'Intermediate' },
        { name: 'Entity Framework Core', icon: 'dotnet', proficiency: 'Advanced' },
        { name: 'PostgreSQL', icon: 'postgresql', proficiency: 'Intermediate' }
      ]
    },
    {
      id: 'tools',
      title: 'Tools & Workflow',
      skills: [
        { name: 'Git & GitHub', icon: 'git', proficiency: 'Advanced' },
        { name: 'Postman', icon: 'postman', proficiency: 'Intermediate' },
        { name: 'Vercel', icon: 'vercel', proficiency: 'Beginner' },
        { name: 'Linux / Bash', icon: 'linux', proficiency: 'Beginner' }
      ]
    }
  ];

  readonly displayedCategories = computed(() => {
    const tab = this.activeTab();
    if (tab === 'all') {
      return this.categories;
    }
    return this.categories.filter((c) => c.id === tab);
  });

  setTab(tab: SkillTab): void {
    this.activeTab.set(tab);
  }
}
