import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../model/invoice.model';
import { InvoiceService } from '../../services/invoice.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, RouterLink } from '@angular/router';
import { TextChangePipe } from '../../shared/text-change.pipe';
import { NewInvoiceFormComponent } from '../new-invoice-form/new-invoice-form.component';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
  imports: [CommonModule, RouterModule, TextChangePipe, RouterLink],
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];
  selectedStatuses: string[] = [];
  dropdownOpen: boolean = false;

  //text change values based on screen sizes for the filter dropdown
  filterTextConfig = {
    mobile: 'Filter',
    tablet: 'Filter by status',
    desktop: 'Filter by status',
  };

  newInvoiceTextConfig = {
    mobile: 'New',
    tablet: 'New invoice',
    desktop: 'New invoice',
  };

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.invoices = this.invoiceService.getInvoices();
    this.invoiceTotal.mobile =
      this.invoiceService.getInvoices().length + ' invoices';
    this.invoiceTotal.tablet =
      'There are ' +
      this.invoiceService.getInvoices().length +
      ' total invoices';
    this.invoiceTotal.desktop =
      'There are ' +
      this.invoiceService.getInvoices().length +
      ' total invoices';

    this.loadInvoicesData();
  }

  //invoices text change
  invoiceTotal: { mobile: string; tablet: string; desktop: string } = {
    mobile: '',
    tablet: '',
    desktop: '',
  };

  onStatusChange(status: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedStatuses.push(status);
    } else {
      this.selectedStatuses = this.selectedStatuses.filter((s) => s !== status);
    }
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.invoices = this.invoiceService.getInvoicesByStatus(
      this.selectedStatuses
    );
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  private loadInvoicesData() {
    this.invoices = this.invoiceService.getInvoices();
    this.updateInvoiceTotal();
  }

  private updateInvoiceTotal() {
    const count = this.invoices.length;
    this.invoiceTotal.mobile = count + ' invoices';
    this.invoiceTotal.tablet = 'There are ' + count + ' total invoices';
    this.invoiceTotal.desktop = 'There are ' + count + ' total invoices';
  }
}
