import { Injectable, signal, computed } from '@angular/core';
import { Project, ProjectCategory } from '../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  readonly activeFilter = signal<ProjectCategory>('all');
  readonly selectedProject = signal<Project | null>(null);

  private readonly projects: readonly Project[] = [
    {
      id: 'gemini-clone',
      title: 'Gemini AI Assistant Clone',
      description: 'High-fidelity generative AI assistant replicating Google Gemini with real-time streaming, prompt suggestions, and responsive glassmorphism.',
      detailedOverview: 'Built with React and Tailwind CSS, this application integrates Google Gemini AI capabilities via real-time conversational streaming. Features include code syntax highlighting, structured Markdown response parsing, prompt library shortcuts, and light/dark theme adaptation.',
      category: 'frontend',
      techStack: ['React 19', 'Tailwind CSS', 'Gemini API', 'Vite', 'Markdown Parsing'],
      thumbnail: 'projects/gemini.png',
      liveUrl: 'https://gemini-flame-seven.vercel.app/',
      githubUrl: 'https://github.com/chinmaya-704/Gemini',
      featured: true,
      metrics: ['Real-time Streaming', '100% Responsive', 'Zero Delay HMR']
    },
    {
      id: 'brain-tumor-detection',
      title: 'Brain Tumor Detection System',
      description: 'Deep-learning medical diagnosis platform classifying MRI brain scans into tumor classifications with high clinical accuracy.',
      detailedOverview: 'Trained a Convolutional Neural Network (CNN) using TensorFlow/Keras on clinical MRI scan datasets. Encapsulated inference inside a lightweight Python Flask REST API and paired it with an intuitive React user interface for instant image uploads and confidence-score diagnostics.',
      category: 'ai-ml',
      techStack: ['Python', 'Flask', 'TensorFlow', 'React', 'Tailwind CSS'],
      thumbnail: 'projects/Brain_Tumor.png',
      githubUrl: 'https://github.com/chinmaya-704/Brain_Tumor_Detection',
      featured: true,
      metrics: ['98% Model Accuracy', 'REST API Architecture', 'Instant Inference']
    },
  ];

  readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') {
      return this.projects;
    }
    return this.projects.filter(p => p.category === filter);
  });

  setFilter(filter: ProjectCategory): void {
    this.activeFilter.set(filter);
  }

  openProjectModal(project: Project): void {
    this.selectedProject.set(project);
  }

  closeProjectModal(): void {
    this.selectedProject.set(null);
  }
}
