import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

import { CoreDataModule } from '@bba/core-data';
import { CoreStateModule, OrdersFacade } from '@bba/core-state';
import { MaterialModule } from '@bba/material';

import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersComponent } from './orders.component';

import { mockOrder, mockEmptyOrder } from '@bba/testing';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let de: DebugElement;
  let ordersFacade: OrdersFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrdersComponent,
        OrderDetailsComponent,
        OrdersListComponent,
      ],
      imports: [
        CoreDataModule,
        CoreStateModule,
        FormsModule,
        MaterialModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    ordersFacade = TestBed.inject(OrdersFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on select call ordersFacade selectOrder', () => {
    const spy = jest.spyOn(ordersFacade, 'selectOrder');

    component.selectOrder(mockOrder);

    expect(spy).toHaveBeenCalledWith(mockOrder.id);
  });

  describe('should on save call ordersFacade', () => {
    it('updateOrder', () => {
      const spy = jest.spyOn(ordersFacade, 'updateOrder');

      component.saveOrder(mockOrder);

      expect(spy).toHaveBeenCalledWith(mockOrder);
    });

    it('createOrder', () => {
      const spy = jest.spyOn(ordersFacade, 'createOrder');

      component.saveOrder(mockEmptyOrder);

      expect(spy).toHaveBeenCalledWith(mockEmptyOrder);
    });
  });

  it('should on delete call ordersFacade deleteOrder', () => {
    const spy = jest.spyOn(ordersFacade, 'deleteOrder');

    component.deleteOrder(mockOrder);

    expect(spy).toHaveBeenCalledWith(mockOrder);
  });
});
