import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../model/invoice.model';
@Component({
  selector: 'app-edit-invoice-form-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-invoice-form-component.component.html',
  styleUrl: './edit-invoice-form-component.component.scss',
})
export class EditInvoiceFormComponentComponent implements OnInit {
  invoiceForm!: FormGroup;
  invoiceId: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.paramMap.get('id') || '';
    const invoice = this.invoiceService.getInvoiceById(this.invoiceId);
    if (invoice) this.initForm(invoice);
  }

  initForm(invoice: Invoice) {
    this.invoiceForm = this.fb.group({
      id: [invoice.id],
      createdAt: [invoice.createdAt, Validators.required],
      paymentDue: [invoice.paymentDue],
      description: [invoice.description, Validators.required],
      paymentTerms: [invoice.paymentTerms, Validators.required],
      clientName: [invoice.clientName, Validators.required],
      clientEmail: [invoice.clientEmail, Validators.required],
      status: [invoice.status],
      senderAddress: this.fb.group({
        street: [invoice.senderAddress.street],
        city: [invoice.senderAddress.city],
        postCode: [invoice.senderAddress.postCode],
        country: [invoice.senderAddress.country],
      }),
      clientAddress: this.fb.group({
        street: [invoice.clientAddress.street],
        city: [invoice.clientAddress.city],
        postCode: [invoice.clientAddress.postCode],
        country: [invoice.clientAddress.country],
      }),
      items: this.fb.array(
        invoice.items.map((item) => this.createItemGroup(item))
      ),
      total: [invoice.total],
    });
  }

  createItemGroup(item: any): FormGroup {
    return this.fb.group({
      name: [item.name],
      quantity: [item.quantity],
      price: [item.price],
      total: [item.total],
    });
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(
      this.createItemGroup({ name: '', quantity: 0, price: 0, total: 0 })
    );
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  calculateTotal() {
    const total = this.items.controls.reduce((acc, item) => {
      const qty = item.get('quantity')?.value;
      const price = item.get('price')?.value;
      const itemTotal = qty * price;
      item.get('total')?.setValue(itemTotal);
      return acc + itemTotal;
    }, 0);
    this.invoiceForm.get('total')?.setValue(total);
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      this.calculateTotal();
      this.invoiceService.updateInvoice(this.invoiceForm.value);
      this.router.navigate(['/invoices', this.invoiceId]);
    }
  }

  cancel() {
    this.router.navigate(['/invoices', this.invoiceId]);
  }

  goBack() {
    this.router.navigate(['/invoices/', this.invoiceId]);
  }

  closeOnBackdrop(event: MouseEvent) {
    this.router.navigate(['/invoices', this.invoiceId]);
  }
}
