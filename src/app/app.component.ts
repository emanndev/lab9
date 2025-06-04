import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ RouterOutlet]
})
export class AppComponent {
  title = 'invoice-app';
}
