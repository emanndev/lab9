import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent {
  invoices = [
    { id: 'RT3080', dueDate: '19 Aug 2021', client: 'Jensen Huang', amount: 1800.90, status: 'Paid' },
    { id: 'XM9141', dueDate: '20 Sep 2021', client: 'Alex Grim', amount: 556.00, status: 'Pending' },
    { id: 'RG0314', dueDate: '30 Oct 2021', client: 'John Morrison', amount: 14002.33, status: 'Paid' }
  ];
}