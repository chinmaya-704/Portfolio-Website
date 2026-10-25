import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, IconComponent],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'block py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
  }
})
export class ContactComponent {
  protected readonly contactService = inject(ContactService);

  readonly emailAddress = 'cksahoo704@gmail.com';

  readonly copiedToast = signal<boolean>(false);
  private copyTimeout: ReturnType<typeof setTimeout> | null = null;

  readonly contactForm = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)]
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    subject: new FormControl<string>('', {
      nonNullable: true
    }),
    message: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)]
    })
  });

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid || this.contactService.isSubmitting()) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const value = this.contactForm.getRawValue();
    const success = await this.contactService.submitContactForm(value);

    if (success) {
      this.contactForm.reset();
    }
  }

  async copyEmail(event?: Event): Promise<void> {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(this.emailAddress);
        this.copiedToast.set(true);
        if (this.copyTimeout) clearTimeout(this.copyTimeout);
        this.copyTimeout = setTimeout(() => {
          this.copiedToast.set(false);
        }, 2500);
      }
    } catch (err) {
      console.warn('Clipboard write prevented or unsupported:', err);
    }
  }
}
