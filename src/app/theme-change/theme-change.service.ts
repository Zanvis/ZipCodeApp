import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeChangeService {
  private themeKey = 'darkTheme';
  private isDarkTheme = new BehaviorSubject<boolean>(this.loadTheme());
  private renderer: Renderer2;

  theme$ = this.isDarkTheme.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.applyInitialTheme();
  }

  setDarkTheme(isDark: boolean) {
    this.isDarkTheme.next(isDark);
    this.renderer.setAttribute(this.document.documentElement, 'data-bs-theme', isDark ? 'dark' : 'light');
    this.saveTheme(isDark);
  }

  private loadTheme(): boolean {
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem(this.themeKey);
      return savedTheme ? JSON.parse(savedTheme) : false;
    }
    return false;
  }

  private saveTheme(isDark: boolean) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.themeKey, JSON.stringify(isDark));
    }
  }

  private applyInitialTheme() {
    const initialTheme = this.loadTheme();
    this.renderer.setAttribute(this.document.documentElement, 'data-bs-theme', initialTheme ? 'dark' : 'light');
  }

  get isDarkMode() {
    return this.isDarkTheme.value;
  }
}
