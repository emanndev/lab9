import { Routes } from '@angular/router';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';

export const routes: Routes = [
      { 
        path: 'invoices', 
        component: InvoiceListComponent 
    },
  { 
    path: '', 
    redirectTo: 'invoices', 
    pathMatch: 'full' },
  { 
    path: '**', 
    redirectTo: 'invoices' 
}
];
