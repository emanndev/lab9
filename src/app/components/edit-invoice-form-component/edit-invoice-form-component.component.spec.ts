import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInvoiceFormComponentComponent } from './edit-invoice-form-component.component';

describe('EditInvoiceFormComponentComponent', () => {
  let component: EditInvoiceFormComponentComponent;
  let fixture: ComponentFixture<EditInvoiceFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditInvoiceFormComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInvoiceFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
