import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPageClientComponent } from './order-page-client.component';

describe('OrderPageClientComponent', () => {
  let component: OrderPageClientComponent;
  let fixture: ComponentFixture<OrderPageClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPageClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderPageClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
