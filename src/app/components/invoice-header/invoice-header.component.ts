import { Component, Input } from '@angular/core';
import { Invoice } from '../../model/invoice.model'

@Component({
  selector: 'app-invoice-header',
  templateUrl: './invoice-header.component.html',
  styleUrl: './invoice-header.component.scss'
})
export class InvoiceHeaderComponent {
  @Input() invoices: Invoice[] = [];

  // get invoiceText(): string {
  //   if (!this.invoices.length) return 'No invoices';
  //   const pendingCount = this.invoices.filter(i => i.status === 'pending').length;
  //   return pendingCount > 0
  //     ? `There are ${pendingCount} pending invoices`
  //     : `There are ${this.invoices.length} total invoices`;
  // }
}
