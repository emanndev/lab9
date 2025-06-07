import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) {}

  private themeLightIcon = document.getElementById('icon-light');
  private themeDarkIcon = document.getElementById('icon-dark');

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  themeIcon() {
    return this.themeService.currentTheme === 'light'
      ? this.themeLightIcon
      : this.themeDarkIcon;
  }
}
