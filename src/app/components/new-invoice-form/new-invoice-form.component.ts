import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../model/invoice.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EditInvoiceFormComponentComponent } from '../edit-invoice-form-component/edit-invoice-form-component.component';

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
    // Set default invoice date to today
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

  updateItemTotal(index: number) {
    // Total is calculated dynamically in getItemTotal method
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

  saveAsDraft() {
    if (this.validateMinimumFields()) {
      const formData = this.invoiceForm.value;
      this.invoiceService.addInvoice(formData, true);
      this.router.navigate(['/invoices']);
    }
  }

  saveAndSend() {
    this.submitted = true;
    if (this.invoiceForm.valid) {
      const formData = this.invoiceForm.value;
      this.invoiceService.addInvoice(formData, false);
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

// export class NewInvoiceFormComponent {
//   constructor(
//     private invoiceService: InvoiceService,
//     private router: Router,
//     private toastr: ToastrService
//   ) {}

//   onSave(newInvoice: Invoice): void {
//     if (!this.isInvoiceValid(newInvoice)) return;
//     this.invoiceService.addInvoice(newInvoice);
//     this.toastr.success('Invoice saved successfully!', 'Success', {
//       positionClass: 'toast-bottom-right',
//       progressBar: true,
//       timeOut: 3000,
//       easing: 'ease-in',
//       easeTime: 300,
//       toastClass: 'ngx-toastr custom-toast',
//     });
//     this.router.navigate(['/invoices']);
//   }

//   onSaveDraft(draft: Invoice): void {
//     draft.status = 'draft';
//     if (!this.isInvoiceValid(draft, true)) return;
//     this.invoiceService.addInvoice(draft);
//     this.toastr.success('Draft saved successfully!', 'Saved as Draft', {
//       positionClass: 'toast-bottom-right',
//       progressBar: true,
//       timeOut: 3000,
//       easing: 'ease-in',
//       easeTime: 300,
//       toastClass: 'ngx-toastr custom-toast',
//     });
//     this.router.navigate(['/invoices']);
//   }

//   onDiscard(): void {
//     this.router.navigate(['/invoices']);
//   }

//   private isInvoiceValid(invoice: Invoice, allowPartial = false): boolean {
//     if (!invoice.clientName || !invoice.clientEmail || !invoice.items.length)
//       return false;
//     if (
//       !allowPartial &&
//       invoice.items.some((i) => !i.name || !i.price || !i.quantity)
//     )
//       return false;
//     return true;
//   }
// }
//   newInvoiceForm!: FormGroup;
//   invoice: Invoice = {} as Invoice;
//   invoiceId: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private invoiceService: InvoiceService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}
//   ngOnInit(): void {
//     this.invoiceId = this.route.snapshot.paramMap.get('id') || '';
//     const invoice = this.invoiceService.getInvoiceById(this.invoiceId);
//     if (invoice) this.initForm(invoice);
//   }

//   initForm(invoice: Invoice): void {
//     this.newInvoiceForm = this.fb.group({
//       senderAddress: this.fb.group({
//         street: [this.invoice.senderAddress.street, Validators.required],
//         city: [this.invoice.senderAddress.city, Validators.required],
//         postCode: [this.invoice.senderAddress.postCode, Validators.required],
//         country: [this.invoice.senderAddress.country, Validators.required],
//       }),
//       clientAddress: this.fb.group({
//         street: [this.invoice.clientAddress.street, Validators.required],
//         city: [this.invoice.clientAddress.city, Validators.required],
//         postCode: [this.invoice.clientAddress.postCode, Validators.required],
//         country: [this.invoice.clientAddress.country, Validators.required],
//       }),
//       items: this.fb.array(
//         invoice.items.map((item) => this.createItemGroup(item))
//       ),
//       total: [invoice.total],
//     });
//   }

//   get items(): FormArray {
//     return this.newInvoiceForm.get('items') as FormArray;
//   }

//   createItemGroup(item: any): FormGroup {
//     return this.fb.group({
//       name: [item.name],
//       quantity: [item.quantity],
//       price: [item.price],
//       total: [item.total],
//     });
//   }

//   calculateTotal() {
//     const total = this.items.controls.reduce((acc, item) => {
//       const qty = item.get('quantity')?.value;
//       const price = item.get('price')?.value;
//       const itemTotal = qty * price;
//       item.get('total')?.setValue(itemTotal);
//       return acc + itemTotal;
//     }, 0);
//     this.newInvoiceForm.get('total')?.setValue(total);
//   }

//   onSubmit() {
//     if (this.newInvoiceForm.valid) {
//       this.calculateTotal();
//       this.invoiceService.updateInvoice(this.newInvoiceForm.value);
//       this.router.navigate(['/invoices']);
//     }
//   }

//   goBack() {
//     this.router.navigate(['/invoices/']);
//   }

//   cancel() {
//     this.router.navigate(['/invoices']);
//   }

//   addItem(): void {
//     this.items.push(
//       this.createItemGroup({ name: '', quantity: 0, price: 0, total: 0 })
//     );
//   }

//   closeOnBackdrop(event: MouseEvent) {
//     this.router.navigate(['/invoices']);
//   }

//   deleteItem(index: number): void {
//     this.items.removeAt(index);
//   }
// }
