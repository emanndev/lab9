import { Routes } from '@angular/router';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';

export const routes: Routes = [
      { 
        path: 'invoices', 
        component: InvoiceListComponent 
    },
     { 
      path: 'invoices/:id', 
      component: InvoiceDetailsComponent 

     },
  { 
    path: '', 
    redirectTo: 'invoices', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: 'invoices' 
}
];
