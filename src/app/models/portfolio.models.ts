export type ProjectCategory = 'all' | 'fullstack' | 'frontend' | 'ai-ml' | 'mini';

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly detailedOverview?: string;
  readonly category: ProjectCategory;
  readonly techStack: readonly string[];
  readonly thumbnail: string;
  readonly liveUrl?: string;
  readonly githubUrl: string;
  readonly featured: boolean;
  readonly metrics?: readonly string[];
}

export interface Experience {
  readonly id: string;
  readonly role: string;
  readonly organization: string;
  readonly period: string;
  readonly location: string;
  readonly type: 'Work' | 'Leadership' | 'Mentorship';
  readonly highlights: readonly string[];
  readonly skills: readonly string[];
}

export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface SkillCategory {
  readonly title: string;
  readonly skills: readonly {
    readonly name: string;
    readonly icon: string;
    readonly proficiency: ProficiencyLevel;
  }[];
}

export interface QuickStat {
  readonly value: string;
  readonly label: string;
  readonly icon: string;
}

export interface ContactPayload {
  readonly name: string;
  readonly email: string;
  readonly subject?: string;
  readonly message: string;
}
