import { Injectable } from '@angular/core';
import { Invoice } from '../model/invoice.model';
import data from './../../assets/data.json';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private localStorageKey = 'invoices';
  private invoices: Invoice[] = [];

  constructor() {
    const stored = localStorage.getItem(this.localStorageKey);
    if (stored) {
      this.invoices = JSON.parse(stored);
    } else {
      this.invoices = data.map((invoice) => ({
        ...invoice,
        status: invoice.status as 'paid' | 'pending' | 'draft',
      }));
      this.updateLocalStorage();
    }
  }

  private updateLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.invoices));
  }

  getInvoices(): Invoice[] {
    return [...this.invoices];
  }

  getInvoicesByStatus(statusFilters: string[]): Invoice[] {
    if (statusFilters.length === 0) return [...this.invoices];
    return this.invoices.filter((invoice) =>
      statusFilters.includes(invoice.status)
    );
  }

  getInvoiceById(id: string): Invoice | undefined {
    return this.invoices.find((inv) => inv.id === id);
  }

  deleteInvoice(id: string): void {
    this.invoices = this.invoices.filter((inv) => inv.id !== id);
    this.updateLocalStorage();
  }

  markAsPaid(id: string): void {
    const invoice = this.getInvoiceById(id);
    if (invoice) {
      invoice.status = 'paid';
      this.updateLocalStorage();
    }
  }

  updateInvoice(updated: Invoice): void {
    const index = this.invoices.findIndex((i) => i.id === updated.id);
    if (index !== -1) {
      this.invoices[index] = updated;
      this.updateLocalStorage();
    }
  }

  addInvoice(newInvoice: Invoice): void {
    this.invoices.unshift(newInvoice);
    this.updateLocalStorage();
  }

  generateId(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let result = '';
    for (let i = 0; i < 2; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 4; i++) {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return result;
  }

  calculatePaymentDue(invoiceDate: string, paymentTerms: number): string {
    const date = new Date(invoiceDate);
    date.setDate(date.getDate() + paymentTerms);
    return date.toISOString();
  }

  calculateTotal(items: any[]): number {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  convertToInvoice(formData: any, isDraft: boolean): Invoice {
    return {
      id: this.generateId(),
      createdAt: formData.invoiceDate,
      paymentDue: this.calculatePaymentDue(
        formData.invoiceDate,
        parseInt(formData.paymentTerms)
      ),
      description: formData.projectDescription,
      paymentTerms: parseInt(formData.paymentTerms),
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      status: isDraft ? 'draft' : 'pending',
      senderAddress: {
        street: formData.senderStreet,
        city: formData.senderCity,
        postCode: formData.senderPostCode,
        country: formData.senderCountry,
      },
      clientAddress: {
        street: formData.clientStreet,
        city: formData.clientCity,
        postCode: formData.clientPostCode,
        country: formData.clientCountry,
      },
      items: formData.items.map((item: any) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.quantity * item.price,
      })),
      total: formData.items.reduce(
        (acc: number, item: any) => acc + item.quantity * item.price,
        0
      ),
    };
  }
}
