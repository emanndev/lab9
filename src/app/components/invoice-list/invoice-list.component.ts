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
     selectedStatuses: string[] = [];
     dropdownOpen: boolean = false;


  constructor(private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.invoices = this.invoiceService.getInvoices();
  }
   onStatusChange(status: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedStatuses.push(status);
    } else {
      this.selectedStatuses = this.selectedStatuses.filter(s => s !== status);
    }
    this.loadInvoices();
  }

   loadInvoices(): void {
    this.invoices = this.invoiceService.getInvoicesByStatus(this.selectedStatuses);
  }

  toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}

}