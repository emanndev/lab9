import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../model/invoice.model';
import { InvoiceService } from '../../services/invoice.service';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
  imports: [CommonModule] 
})
export class InvoiceListComponent implements OnInit {
  // invoices: Invoice[] = [];

  // ngOnInit() {
  //   this.invoices = data as Invoice[];
  // }
   invoices: Invoice[] = [];

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.invoices = this.invoiceService.getInvoices();
  }
}