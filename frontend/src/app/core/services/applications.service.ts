// ============================================
// VP SOLUTIONS - Service: Applications
// ============================================

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Application, APPLICATIONS_DATA } from '../../models/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  private applications: Application[] = APPLICATIONS_DATA;

  constructor() { }

  /**
   * Obtiene todas las aplicaciones
   */
  getApplications(): Observable<Application[]> {
    return of(this.applications);
  }

  /**
   * Obtiene una aplicación por su ID
   */
  getApplicationById(id: string): Observable<Application | undefined> {
    const application = this.applications.find(app => app.id === id);
    return of(application);
  }

  /**
   * Obtiene aplicaciones destacadas
   */
  getFeaturedApplications(): Observable<Application[]> {
    const featured = this.applications.filter(app => app.featured === true);
    return of(featured);
  }

  /**
   * Obtiene aplicaciones por categoría
   */
  getApplicationsByCategory(category: string): Observable<Application[]> {
    const filtered = this.applications.filter(app => 
      app.category.toLowerCase() === category.toLowerCase()
    );
    return of(filtered);
  }

  /**
   * Obtiene aplicaciones por estado
   */
  getApplicationsByStatus(status: 'demo' | 'production' | 'development'): Observable<Application[]> {
    const filtered = this.applications.filter(app => app.status === status);
    return of(filtered);
  }

  /**
   * Obtiene todas las categorías únicas
   */
  getCategories(): Observable<string[]> {
    const categories = [...new Set(this.applications.map(app => app.category))];
    return of(categories);
  }

  /**
   * Busca aplicaciones por término
   */
  searchApplications(term: string): Observable<Application[]> {
    const searchTerm = term.toLowerCase().trim();
    const results = this.applications.filter(app =>
      app.name.toLowerCase().includes(searchTerm) ||
      app.description.toLowerCase().includes(searchTerm) ||
      app.category.toLowerCase().includes(searchTerm) ||
      app.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
    );
    return of(results);
  }
}