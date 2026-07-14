// ============================================
// VP SOLUTIONS - Component: Footer
// ============================================

import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  socialLinks = [
    { name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://linkedin.com' },
    { name: 'Twitter', icon: 'fab fa-twitter', url: 'https://twitter.com' },
    { name: 'YouTube', icon: 'fab fa-youtube', url: 'https://youtube.com' }
  ];
}