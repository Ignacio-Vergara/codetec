// ============================================
// CODETEC - Component: Home
// ============================================

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationsService } from '../../core/services/applications.service';
import { Application } from '../../models/application';
import { Technology, TECHNOLOGIES } from '../../models/technology';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  featuredApplications: Application[] = [];
  technologies: Technology[] = [];
  stats = [
    { value: '10+', label: 'Proyectos' },
    { value: '5+', label: 'Tecnologías' },
    { value: '100%', label: 'Satisfacción' },
    { value: '24/7', label: 'Soporte' }
  ];

  // Slider variables
  currentPosition: number = 0;
  itemsPerView: number = 5;
  totalItems: number = 0;
  animationId: any = null;
  private isPaused: boolean = false;

  constructor(
    private applicationsService: ApplicationsService,
    private router: Router
  ) {
    // Duplicar tecnologías para efecto infinito
    this.technologies = [...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES];
  }

  ngOnInit(): void {
    this.applicationsService.getFeaturedApplications().subscribe(
      applications => {
        this.featuredApplications = applications.slice(0, 3);
      }
    );
    
    this.totalItems = this.technologies.length;
    this.calculateItemsPerView();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  calculateItemsPerView() {
    const width = window.innerWidth;
    
    if (width < 576) {
      this.itemsPerView = 2;
    } else if (width < 768) {
      this.itemsPerView = 3;
    } else if (width < 992) {
      this.itemsPerView = 4;
    } else {
      this.itemsPerView = 5;
    }
  }

  getItemWidth(): number {
    const container = document.querySelector('.tech-slider-container');
    if (!container) return 200;
    
    const containerWidth = container.clientWidth;
    const gap = 24;
    return (containerWidth - (this.itemsPerView - 1) * gap) / this.itemsPerView;
  }

  startAutoSlide(): void {
    this.stopAutoSlide();
    
    const animate = () => {
      if (!this.isPaused) {
        const itemWidth = this.getItemWidth() + 24;
        this.currentPosition -= 0.3;
        
        const singleItemWidth = this.getItemWidth() + 24;
        if (Math.abs(this.currentPosition) >= singleItemWidth * (this.totalItems / 3)) {
          this.currentPosition = 0;
        }
      }
      
      this.animationId = requestAnimationFrame(animate);
    };
    
    this.animationId = requestAnimationFrame(animate);
  }

  stopAutoSlide(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  // Métodos para pausar/reanudar el slider (opcionales)
  onMouseEnter(): void {
    this.isPaused = true;
  }

  onMouseLeave(): void {
    this.isPaused = false;
  }

  getTranslateX(): number {
    return this.currentPosition;
  }

  navigateToApplications(): void {
    this.router.navigate(['/applications']);
  }

  navigateToContact(): void {
    this.router.navigate(['/contact']);
  }
}