import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../model/invoice.model';
import { InvoiceService } from '../../services/invoice.service';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
  imports: [CommonModule, RouterModule] 
})
export class InvoiceListComponent implements OnInit {
   invoices: Invoice[] = [];

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.invoices = this.invoiceService.getInvoices();
  }
}