import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../model/invoice.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.scss'
})
export class InvoiceDetailsComponent {
 invoice: Invoice | undefined;
  confirmDelete: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.invoice = this.invoiceService.getInvoiceById(id);
  }

  goBack() {
    this.router.navigate(['/invoices']);
  }

  deleteInvoice() {
    if (this.invoice) {
      this.invoiceService.deleteInvoice(this.invoice.id);
      this.goBack();
    }
  }

  markAsPaid() {
    if (this.invoice && this.invoice.status !== 'paid') {
      this.invoiceService.markAsPaid(this.invoice.id);
    }
  }

  saveChanges(updated: Invoice) {
    this.invoiceService.updateInvoice(updated);
  }

  toggleDeleteConfirm() {
    this.confirmDelete = !this.confirmDelete;
  }
}
