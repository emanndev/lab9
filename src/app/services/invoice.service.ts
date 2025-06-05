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

   getInvoicesByStatus(statusFilters: string[]): Invoice[] {
    if (statusFilters.length === 0) return this.invoices;
    return this.invoices.filter(invoice => statusFilters.includes(invoice.status));
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