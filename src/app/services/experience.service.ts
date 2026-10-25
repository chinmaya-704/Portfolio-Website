import { Injectable, signal, computed } from '@angular/core';
import { Experience } from '../models/portfolio.models';

export type ExperienceTrack = 'all' | 'work' | 'leadership';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  readonly activeTrack = signal<ExperienceTrack>('all');

  private readonly experiences: readonly Experience[] = [
    // 1. Professional Work Experience
    {
      id: 'paltech-2026',
      role: 'Associate Software Engineer',
      organization: 'PalTech',
      period: 'Apr 2026 – Present',
      location: 'Hyderabad, India',
      type: 'Work',
      highlights: [
        'Develop full-stack applications with Angular on the frontend and .NET and Node.js technologies across backend services.',
        'Work with Next.js for application development and server-side functionality.'
      ],
      skills: [
        'Angular',
        '.NET',
        'Node.js',
        'Next.js',
        'Full-Stack Development'
      ]
    },


    // 2. Leadership & Community Impact
    {
      id: 'advaita-2025',
      role: 'Decor & Design Lead | Art Lead | Event Coordinator',
      organization: 'Advaita Core Team (Official Cultural Fest of IIIT Bhubaneswar)',
      period: 'Feb 2025 – Mar 2025',
      location: 'IIIT Bhubaneswar',
      type: 'Leadership',
      highlights: [
        'Led a 30+ member team to plan and execute creative installations for flagship events within budget.',
        'Coordinated 20+ volunteers and organized three flagship events, overseeing logistics and stage coordination.'
      ],
      skills: [
        'Team Leadership',
        'Budgeting & Logistics',
        'Creative Direction',
        'Cross-Functional Coordination'
      ]
    },
    {
      id: 'paracosm-2024',
      role: 'Joint Secretary & Treasurer',
      organization: 'Paracosm — Art & Design Society',
      period: 'Sep 2024 – Aug 2025',
      location: 'IIIT Bhubaneswar',
      type: 'Leadership',
      highlights: [
        'Coordinated society operations, creative workshops, and inter-college competitions.',
        'Managed financial accounting and resource allocation for society activities.'
      ],
      skills: [
        'Financial Planning',
        'Event Management',
        'Operations',
        'Team Mentorship'
      ]
    },
    {
      id: 'odiapreneur-2023',
      role: 'State Hackathon Mentor',
      organization: 'Odiapreneur',
      period: 'Jan 2023 – Apr 2023',
      location: 'Odisha, India',
      type: 'Mentorship',
      highlights: [
        'Mentored three finalist student teams from Nuapada district in a state-sponsored innovation hackathon.',
        'Guided teams on technical feasibility, prototype development, presentations, and iterative problem-solving.'
      ],
      skills: [
        'Technical Mentoring',
        'Product Ideation',
        'Pitch Coaching',
        'Agile Prototyping'
      ]
    }
  ];

  readonly workExperiences = computed(() =>
    this.experiences.filter((exp) => exp.type === 'Work')
  );

  readonly leadershipExperiences = computed(() =>
    this.experiences.filter((exp) => exp.type === 'Leadership' || exp.type === 'Mentorship')
  );

  readonly totalCount = computed(() => this.experiences.length);
  readonly workCount = computed(() => this.workExperiences().length);
  readonly leadershipCount = computed(() => this.leadershipExperiences().length);

  setTrack(track: ExperienceTrack): void {
    this.activeTrack.set(track);
  }
}
