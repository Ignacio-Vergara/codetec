// ============================================
// VP SOLUTIONS - Component: Contact
// ============================================

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;
  submitSuccess = false;
  submitError = false;

  contactInfo = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      details: ['contact@vpsolutions.com'],
      action: 'mailto:contact@vpsolutions.com'
    },
    {
      icon: 'fas fa-phone',
      title: 'Teléfono',
      details: ['+34 900 123 456'],
      action: 'tel:+34900123456'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Ubicación',
      details: ['Madrid, España'],
      action: 'https://maps.google.com'
    },
    {
      icon: 'fas fa-clock',
      title: 'Horario',
      details: ['Lun - Vie: 9:00 - 18:00'],
      action: null
    }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[0-9]{9,15}$')]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      acceptTerms: [false, [Validators.requiredTrue]]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.markFormTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    // Simulación de envío
    setTimeout(() => {
      this.isSubmitting = false;
      this.isSubmitted = true;
      this.submitSuccess = true;
      this.contactForm.reset({
        acceptTerms: false
      });
      
      // Resetear el formulario después de 5 segundos
      setTimeout(() => {
        this.submitSuccess = false;
        this.isSubmitted = false;
      }, 5000);
    }, 2000);

    // TODO: Integrar con backend real
    console.log('Formulario enviado:', this.contactForm.value);
  }

  private markFormTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)?.markAsTouched();
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);
    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;
    if (errors['required']) return 'Este campo es obligatorio';
    if (errors['email']) return 'Email inválido';
    if (errors['minlength']) {
      const minLength = errors['minlength'].requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    if (errors['pattern']) return 'Formato inválido';
    return 'Campo inválido';
  }

  hasError(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }
}