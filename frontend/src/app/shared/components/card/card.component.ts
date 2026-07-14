// ============================================
// VP SOLUTIONS - Component: Card (para aplicaciones)
// ============================================

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Application } from '../../../models/application';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() application!: Application;
  @Input() isFeatured: boolean = false;
  
  @Output() view = new EventEmitter<Application>();

  // Imagen por defecto (placeholder)
  defaultImage: string = 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="360">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0A0E17;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#111826;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill="url(#grad)"/>
      <rect x="220" y="130" width="200" height="100" rx="12" fill="#0038FF" opacity="0.15"/>
      <text x="320" y="180" font-family="Arial" font-size="48" fill="#0038FF" text-anchor="middle">VP</text>
      <text x="320" y="230" font-family="Arial" font-size="16" fill="#8A93A3" text-anchor="middle">Demo</text>
    </svg>
  `);

  onView(): void {
    this.view.emit(this.application);
  }

  getImageUrl(): string {
    return this.application.imagePreview || this.defaultImage;
  }
}