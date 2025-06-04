import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../model/invoice.model';
import data from '../../assets/data.json'; 

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  getInvoices(): Invoice[] {
    return data.map(invoice => ({
      ...invoice,
      status: invoice.status as 'paid' | 'pending' | 'draft'
    }));
  }
}