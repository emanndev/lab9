import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../model/invoice.model';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from '../../shared/date-format.pipe';

@Component({
  selector: 'app-edit-invoice-form-component',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './edit-invoice-form-component.component.html',
  styleUrl: './edit-invoice-form-component.component.scss',
})
export class EditInvoiceFormComponentComponent implements OnInit {
  invoiceForm!: FormGroup;
  invoiceId: string = '';
  invoice: Invoice = {} as Invoice;

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
    const group = this.fb.group({
      name: [item.name],
      quantity: [item.quantity],
      price: [item.price],
      total: [{ value: item.total, disabled: true }],
    });

    group
      .get('quantity')
      ?.valueChanges.subscribe(() => this.updateItemTotal(group));
    group
      .get('price')
      ?.valueChanges.subscribe(() => this.updateItemTotal(group));

    return group;
  }

  updateItemTotal(group: FormGroup): void {
    const qty = group.get('quantity')?.value || 0;
    const price = group.get('price')?.value || 0;
    const total = qty * price;
    group.get('total')?.setValue(total, { emitEvent: false });

    const totalSum = this.items.controls.reduce((acc, item) => {
      return acc + (item.get('total')?.value || 0);
    }, 0);
    this.invoiceForm.get('total')?.setValue(totalSum, { emitEvent: false });
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

  onSubmit() {
    if (this.invoiceForm.valid) {
      this.invoiceService.updateInvoice(this.invoiceForm.getRawValue());
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
