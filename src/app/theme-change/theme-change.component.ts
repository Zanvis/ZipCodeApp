import { Component } from '@angular/core';
import { ThemeChangeService } from './theme-change.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'theme-change',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-change.component.html',
  styleUrl: './theme-change.component.css'
})
export class ThemeChangeComponent {
  constructor(private themeService: ThemeChangeService) {}
  dark: boolean = this.themeService.isDarkMode;
  toggleTheme() {
    this.themeService.setDarkTheme(!this.themeService.isDarkMode);
    this.dark = this.themeService.isDarkMode;
  }
}
