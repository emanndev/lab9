import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../model/invoice.model';
import data from './../../assets/data.json'

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private invoices: Invoice[] = data.map(invoice => ({
    ...invoice,
    status: invoice.status as 'paid' | 'pending' | 'draft'
  }));
  getInvoices(): Invoice[] {
    return data.map(invoice => ({
      ...invoice,
      status: invoice.status as 'paid' | 'pending' | 'draft'
    }));
  }

   getInvoiceById(id: string): Invoice | undefined {
    return this.invoices.find(inv => inv.id === id);
  }

  deleteInvoice(id: string): void {
    this.invoices = this.invoices.filter(inv => inv.id !== id);
  }

  markAsPaid(id: string): void {
    const invoice = this.getInvoiceById(id);
    if (invoice) invoice.status = 'paid';
  }

  updateInvoice(updated: Invoice): void {
    const index = this.invoices.findIndex(i => i.id === updated.id);
    if (index !== -1) this.invoices[index] = updated;
  }
}