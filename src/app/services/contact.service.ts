import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ContactPayload } from '../models/portfolio.models';

export interface SubmitStatus {
  readonly type: 'success' | 'error';
  readonly message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // FormSubmit AJAX endpoint that returns JSON without redirects
  private readonly ENDPOINT = 'https://formsubmit.co/ajax/9f3fc81db86cbb35d4119eea04fe553c';

  readonly isSubmitting = signal<boolean>(false);
  readonly status = signal<SubmitStatus | null>(null);

  async submitContactForm(payload: ContactPayload): Promise<boolean> {
    if (!this.isBrowser) return false;

    this.isSubmitting.set(true);
    this.status.set(null);

    try {
      const response = await fetch(this.ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          _subject: payload.subject || `Portfolio Contact from ${payload.name}`,
          message: payload.message,
          _template: 'table',
          _captcha: 'false'
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      this.status.set({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully. I will get back to you shortly.'
      });
      this.isSubmitting.set(false);
      return true;
    } catch (error) {
      console.error('Contact form submission error:', error);
      this.status.set({
        type: 'error',
        message: 'Unable to send message directly. Please feel free to email me at cksahoo704@gmail.com.'
      });
      this.isSubmitting.set(false);
      return false;
    }
  }

  clearStatus(): void {
    this.status.set(null);
  }
}
