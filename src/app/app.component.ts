import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, ThemeToggleComponent],
})
export class AppComponent {
  title = 'invoice-app';
}
