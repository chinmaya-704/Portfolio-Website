import {
  Component,
  ElementRef,
  viewChild,
  effect,
  inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './project-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectModalComponent {
  protected readonly projectService = inject(ProjectService);

  readonly dialogRef = viewChild<ElementRef<HTMLDialogElement>>('dialogRef');

  constructor() {
    effect(() => {
      const selected = this.projectService.selectedProject();
      const dialog = this.dialogRef()?.nativeElement;
      if (!dialog) return;

      if (selected && !dialog.open) {
        dialog.showModal();
        document.body.classList.add('overflow-hidden');
      } else if (!selected && dialog.open) {
        dialog.close();
        document.body.classList.remove('overflow-hidden');
      }
    });
  }

  close(): void {
    this.projectService.closeProjectModal();
  }

  onBackdropClick(event: MouseEvent): void {
    const dialog = this.dialogRef()?.nativeElement;
    if (dialog && event.target === dialog) {
      this.close();
    }
  }

  onCancel(event: Event): void {
    event.preventDefault();
    this.close();
  }
}
