// ============================================
// CODETEC - Component: Navbar
// ============================================

import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMenuOpen = false;
  isScrolled = false;
  isMobile = false;

  navItems = [
    { label: 'Inicio', route: '/' },
    { label: 'Aplicaciones', route: '/applications' },
    { label: 'Contacto', route: '/contact' }
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 992;
    if (!this.isMobile) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }
}