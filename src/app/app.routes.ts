import { Routes } from '@angular/router';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { EditInvoiceFormComponentComponent } from './components/edit-invoice-form-component/edit-invoice-form-component.component';
import { NewInvoiceFormComponent } from './components/new-invoice-form/new-invoice-form.component';

export const routes: Routes = [
  {
    path: 'invoices',
    component: InvoiceListComponent,
  },
  {
    path: 'invoices/:id',
    component: InvoiceDetailsComponent,
  },
  {
    path: 'invoices/:id/edit',
    component: EditInvoiceFormComponentComponent,
  },
  {
    path: 'invoices/new',
    component: NewInvoiceFormComponent,
  },
  {
    path: '',
    redirectTo: 'invoices',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'invoices',
  },
];
