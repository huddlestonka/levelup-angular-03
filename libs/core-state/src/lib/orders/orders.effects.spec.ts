import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot, cold } from '@nrwl/angular/testing';

import { Observable } from 'rxjs';

import { OrdersEffects } from './orders.effects';
import * as OrdersActions from './orders.actions';
import { OrdersService } from '@bba/core-data';

import { mockOrdersService, mockOrder } from '@bba/testing';
import { Order } from '@bba/api-interfaces';

describe('OrdersEffects', () => {
  let actions: Observable<any>;
  let effects: OrdersEffects;
  let service: OrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        OrdersEffects,
        DataPersistence,
        provideMockActions(() => actions),
        { provide: OrdersService, useValue: mockOrdersService },
      ],
    });

    effects = TestBed.inject(OrdersEffects);
    service = TestBed.inject(OrdersService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadOrders$', () => {
    it('should return loadOrdersSuccess, on success', () => {
      const orders: Order[] = [];
      const action = OrdersActions.loadOrders();
      const outcome = OrdersActions.loadOrdersSuccess({ orders });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: orders });
      const expected = cold('--b', { b: outcome });
      service.all = jest.fn(() => response);

      expect(effects.loadOrders$).toBeObservable(expected);
    });

    it('should return loadOrdersFailure, on failure', () => {
      const action = OrdersActions.loadOrders();
      const error = new Error();
      const outcome = OrdersActions.loadOrdersFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.all = jest.fn(() => response);

      expect(effects.loadOrders$).toBeObservable(expected);
    });
  });

  describe('loadOrder$', () => {
    it('should return success with order', () => {
      const order = { ...mockOrder };
      const action = OrdersActions.loadOrder({ orderId: order.id });
      const outcome = OrdersActions.loadOrderSuccess({ order });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: order });
      const expected = cold('--b', { b: outcome });
      service.find = jest.fn(() => response);

      expect(effects.loadOrder$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const order = { ...mockOrder };
      const action = OrdersActions.loadOrder({ orderId: order.id });
      const error = new Error();
      const outcome = OrdersActions.loadOrderFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.find = jest.fn(() => response);

      expect(effects.loadOrder$).toBeObservable(expected);
    });
  });

  describe('createOrder$', () => {
    it('should return success with order', () => {
      const order = { ...mockOrder };
      const action = OrdersActions.createOrder({ order });
      const outcome = OrdersActions.createOrderSuccess({ order });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: order });
      const expected = cold('--b', { b: outcome });
      service.create = jest.fn(() => response);

      expect(effects.createOrder$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const order = { ...mockOrder };
      const action = OrdersActions.createOrder({ order });
      const error = new Error();
      const outcome = OrdersActions.createOrderFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.create = jest.fn(() => response);

      expect(effects.createOrder$).toBeObservable(expected);
    });
  });

  describe('updateOrder$', () => {
    it('should return success with order', () => {
      const order = { ...mockOrder };
      const action = OrdersActions.updateOrder({ order });
      const outcome = OrdersActions.updateOrderSuccess({ order });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: order });
      const expected = cold('--b', { b: outcome });
      service.update = jest.fn(() => response);

      expect(effects.updateOrder$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const order = { ...mockOrder };
      const action = OrdersActions.updateOrder({ order });
      const error = new Error();
      const outcome = OrdersActions.updateOrderFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.update = jest.fn(() => response);

      expect(effects.updateOrder$).toBeObservable(expected);
    });
  });

  describe('deleteOrder$', () => {
    it('should return success with order', () => {
      const order = { ...mockOrder };
      const action = OrdersActions.deleteOrder({ order });
      const outcome = OrdersActions.deleteOrderSuccess({ order });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: order });
      const expected = cold('--b', { b: outcome });
      service.delete = jest.fn(() => response);

      expect(effects.deleteOrder$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const order = { ...mockOrder };
      const action = OrdersActions.deleteOrder({ order });
      const error = new Error();
      const outcome = OrdersActions.deleteOrderFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.delete = jest.fn(() => response);

      expect(effects.deleteOrder$).toBeObservable(expected);
    });
  });
});
