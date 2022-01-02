import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderComponent } from './order.component';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  fit('should update total', () => {
    component.company = {
      deliveryPrice: 10
    }
    component.updateTotal();
    expect(component.total).toBe(10);
  });

  it('should update order with 4 items', () => {
    component.cart['Coca'].quantity = 1;
    component.cart['Coca'].price = 3;
    component.comments = 'Hello World';
    component.updateOrder();
    expect(component.order).toBe('%60%60%60Ol%C3%A1%2C%20gostaria%20de%20pedir%3A%20%0A---------------' +
      '%0ADog%20no%20Molho%3A%201%20unidades.%20%0ADog%20no%20Molho%20Especial%3A%202%20unidades.%20%0ABombom%20de' +
      '%20Uva%20140ml%3A%201%20unidades.%20%0ABombom%20de%20Uva%20220ml%3A%201%20unidades.%20%0A---------------%0' +
      'AAs%20bebidas%20ser%C3%A3o%3A%0A%20%0A---------------%0AOs%20extras%20ser%C3%A3o%3A%0A%20%0A---------------%0AObserva%C' +
      '3%A7%C3%B5es%3A%20%0A%20Hello%20World%60%60%60');
  });

  it('should update order with no items', () => {

    component.updateOrder();
    expect(component.order).toBe('%60%60%60Ol%C3%A1%2C%20gostaria%20de%20pedir%3A%20%0A---------------' +
      '%0A---------------%0AAs%20bebidas%20ser%C3%A3o%3A%0A%20%0A---------------%0AOs%20extras%20ser%C3%A3o%3A%0A%20%0A' +
      '---------------%0A%60%60%60');
  });
});
