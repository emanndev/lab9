import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../model/invoice.model';
import data from './../../assets/data.json';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private invoices: Invoice[] = data.map((invoice) => ({
    ...invoice,
    status: invoice.status as 'paid' | 'pending' | 'draft',
  }));
  getInvoices(): Invoice[] {
    return data.map((invoice) => ({
      ...invoice,
      status: invoice.status as 'paid' | 'pending' | 'draft',
    }));
  }

  getInvoiceById(id: string): Invoice | undefined {
    return this.invoices.find((inv) => inv.id === id);
  }

  getInvoicesByStatus(statusFilters: string[]): Invoice[] {
    if (statusFilters.length === 0) return this.invoices;
    return this.invoices.filter((invoice) =>
      statusFilters.includes(invoice.status)
    );
  }
  deleteInvoice(id: string): void {
    this.invoices = this.invoices.filter((inv) => inv.id !== id);
  }

  markAsPaid(id: string): void {
    const invoice = this.getInvoiceById(id);
    if (invoice) invoice.status = 'paid';
  }

  updateInvoice(updated: Invoice): void {
    const index = this.invoices.findIndex((i) => i.id === updated.id);
    if (index !== -1) this.invoices[index] = updated;
  }

  // addInvoice(invoice: Invoice): void {
  //   this.invoices.push(invoice);
  // }

  addInvoice(invoiceData: any, isDraft: boolean = false): Invoice {
    const newInvoice: Invoice = {
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      paymentDue: this.calculatePaymentDue(
        invoiceData.invoiceDate,
        invoiceData.paymentTerms
      ),
      description: invoiceData.projectDescription,
      paymentTerms: parseInt(invoiceData.paymentTerms),
      clientName: invoiceData.clientName,
      clientEmail: invoiceData.clientEmail,
      status: isDraft ? 'draft' : 'pending',
      senderAddress: {
        street: invoiceData.senderStreet,
        city: invoiceData.senderCity,
        postCode: invoiceData.senderPostCode,
        country: invoiceData.senderCountry,
      },
      clientAddress: {
        street: invoiceData.clientStreet,
        city: invoiceData.clientCity,
        postCode: invoiceData.clientPostCode,
        country: invoiceData.clientCountry,
      },
      items: invoiceData.items.map((item: any) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.quantity * item.price,
      })),
      total: this.calculateTotal(invoiceData.items),
    };

    this.invoices.unshift(newInvoice);
    return newInvoice;
  }

  private generateId(): string {
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

  private calculatePaymentDue(
    invoiceDate: string,
    paymentTerms: number
  ): string {
    const date = new Date(invoiceDate);
    date.setDate(date.getDate() + paymentTerms);
    return date.toISOString();
  }

  private calculateTotal(items: any[]): number {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Invoice } from '../model/invoice.model';
// import data from './../../assets/data.json'

// @Injectable({
//   providedIn: 'root'
// })
// export class InvoiceService {
//   private localStorageKey = 'invoices';
//   private invoices: Invoice[] = [];
//   // private invoices: Invoice[] = data.map(invoice => ({
//   //   ...invoice,
//   //   status: invoice.status as 'paid' | 'pending' | 'draft'
//   // }));

//   constructor(){
//     const stored = localStorage.getItem(this.localStorageKey);
//     this.invoices = stored ? JSON.parse(stored) : [];
//   }

//   private updateLocalStorage(): void {
//     localStorage.setItem(this.localStorageKey, JSON.stringify(this.invoices));
//   }
//   // getInvoices(): Invoice[] {
//   //   return data.map(invoice => ({
//   //     ...invoice,
//   //     status: invoice.status as 'paid' | 'pending' | 'draft'
//   //   }));
//   // }

//   getInvoices(): Invoice[] {
//     return this.invoices;
//   }

//    getInvoiceById(id: string): Invoice | undefined {
//     return this.invoices.find(inv => inv.id === id);
//   }

//   deleteInvoice(id: string): void {
//     this.invoices = this.invoices.filter(inv => inv.id !== id);
//      this.updateLocalStorage();
//   }

//   markAsPaid(id: string): void {
//      const invoice = this.getInvoiceById(id);
//     if (invoice) {
//       invoice.status = 'paid';
//       this.updateLocalStorage();
//     }
//   }

//   updateInvoice(updated: Invoice): void {
//    const index = this.invoices.findIndex(i => i.id === updated.id);
//     if (index !== -1) {
//       this.invoices[index] = updated;
//       this.updateLocalStorage();
//     }
//   }

//     addInvoice(newInvoice: Invoice): void {
//     this.invoices.push(newInvoice);
//     this.updateLocalStorage();
//   }

// }
