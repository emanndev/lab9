import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../model/invoice.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import {
  ReactiveFormsModule,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new-invoice-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-invoice-form.component.html',
  styleUrl: './new-invoice-form.component.scss',
})
export class NewInvoiceFormComponent implements OnInit {
  invoiceForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private invoiceService: InvoiceService
  ) {
    this.invoiceForm = this.fb.group({
      senderStreet: ['', Validators.required],
      senderCity: ['', Validators.required],
      senderPostCode: ['', Validators.required],
      senderCountry: ['', Validators.required],
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientStreet: ['', Validators.required],
      clientCity: ['', Validators.required],
      clientPostCode: ['', Validators.required],
      clientCountry: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      paymentTerms: ['30', Validators.required],
      projectDescription: ['', Validators.required],
      items: this.fb.array([this.createItemFormGroup()]),
    });
  }

  ngOnInit() {
    const today = new Date().toISOString().split('T')[0];
    this.invoiceForm.patchValue({ invoiceDate: today });
  }

  get itemsFormArray(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: ['1', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  addItem() {
    this.itemsFormArray.push(this.createItemFormGroup());
  }

  removeItem(index: number) {
    if (this.itemsFormArray.length > 1) {
      this.itemsFormArray.removeAt(index);
    }
  }

  getItemTotal(index: number): number {
    const item = this.itemsFormArray.at(index);
    const quantity = item.get('quantity')?.value || 0;
    const price = item.get('price')?.value || 0;
    return quantity * price;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.invoiceForm.get(fieldName);
    return !!(
      field &&
      field.invalid &&
      (field.dirty || field.touched || this.submitted)
    );
  }

  isItemFieldInvalid(index: number, fieldName: string): boolean {
    const item = this.itemsFormArray.at(index);
    const field = item.get(fieldName);
    return !!(
      field &&
      field.invalid &&
      (field.dirty || field.touched || this.submitted)
    );
  }

  getEmailErrorMessage(): string {
    const emailField = this.invoiceForm.get('clientEmail');
    if (emailField?.hasError('required')) {
      return "can't be empty";
    }
    if (emailField?.hasError('email')) {
      return 'invalid email format';
    }
    return '';
  }

  goBack() {
    this.router.navigate(['/invoices']);
  }

  discardForm() {
    this.router.navigate(['/invoices']);
  }

  updateItemTotal(index: number): void {
    const item = this.itemsFormArray.at(index);
    const qty = item.get('quantity')?.value || 0;
    const price = item.get('price')?.value || 0;
    const total = qty * price;
    item.get('total')?.setValue(total, { emitEvent: false });

    const totalSum = this.itemsFormArray.controls.reduce((acc, curr) => {
      return acc + (curr.get('total')?.value || 0);
    }, 0);
    this.invoiceForm.get('total')?.setValue(totalSum, { emitEvent: false });
  }

  saveAsDraft() {
    if (this.validateMinimumFields()) {
      const formData = this.invoiceForm.value;
      const newInvoice: Invoice = this.invoiceService.convertToInvoice(
        formData,
        true
      );
      this.invoiceService.addInvoice(newInvoice);
      this.router.navigate(['/invoices']);
    }
  }

  saveAndSend() {
    this.submitted = true;
    if (this.invoiceForm.valid) {
      const formData = this.invoiceForm.value;
      const newInvoice: Invoice = this.invoiceService.convertToInvoice(
        formData,
        false
      );
      this.invoiceService.addInvoice(newInvoice);
      this.router.navigate(['/invoices']);
    }
  }

  private validateMinimumFields(): boolean {
    // For draft, we only need basic info
    const requiredForDraft = ['clientName', 'projectDescription'];
    return (
      requiredForDraft.every((field) =>
        this.invoiceForm.get(field)?.value?.trim()
      ) && this.itemsFormArray.length > 0
    );
  }
}
