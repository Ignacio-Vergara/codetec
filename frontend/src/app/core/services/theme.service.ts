// ============================================
// VP SOLUTIONS - Service: Theme
// ============================================

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDarkModeSubject = new BehaviorSubject<boolean>(true);
  public isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  constructor() { }

  /**
   * Obtiene el estado actual del tema
   */
  get isDarkMode(): boolean {
    return this.isDarkModeSubject.value;
  }

  /**
   * Cambia entre tema claro y oscuro
   */
  toggleTheme(): void {
    this.isDarkModeSubject.next(!this.isDarkModeSubject.value);
    this.applyTheme();
  }

  /**
   * Establece el tema
   */
  setTheme(darkMode: boolean): void {
    this.isDarkModeSubject.next(darkMode);
    this.applyTheme();
  }

  /**
   * Aplica el tema al DOM
   */
  private applyTheme(): void {
    const body = document.body;
    if (this.isDarkMode) {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
  }

  /**
   * Inicializa el tema desde localStorage
   */
  initTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.setTheme(savedTheme === 'dark');
    } else {
      // Por defecto: dark mode
      this.setTheme(true);
    }
  }
}