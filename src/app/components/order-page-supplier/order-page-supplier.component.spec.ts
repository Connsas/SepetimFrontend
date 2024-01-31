import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPageSupplierComponent } from './order-page-supplier.component';

describe('OrderPageSupplierComponent', () => {
  let component: OrderPageSupplierComponent;
  let fixture: ComponentFixture<OrderPageSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPageSupplierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderPageSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
