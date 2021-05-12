import { TestBed } from '@angular/core/testing';
import { ActionsSubject } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { OrdersFacade } from './orders.facade';
import * as OrdersActions from './orders.actions';
import { initialOrdersState } from './orders.reducer';

import { mockOrder } from '@bba/testing';

describe('OrdersFacade', () => {
  let facade: OrdersFacade;
  let actionSubject;
  const mockActionsSubject = new ActionsSubject();
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrdersFacade,
        provideMockStore({ initialState: initialOrdersState }),
        { provide: ActionsSubject, useValue: mockActionsSubject },
      ],
    });

    facade = TestBed.inject(OrdersFacade);
    actionSubject = TestBed.inject(ActionsSubject);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should have mutations', (done) => {
    const action = OrdersActions.createOrder({ order: mockOrder });
    actionSubject.next(action);

    facade.mutations$.subscribe((result) => {
      expect(result).toBe(action);
      done();
    });
  });

  describe('should dispatch', () => {
    it('select on select(order.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.selectOrder(mockOrder.id);

      const action = OrdersActions.selectOrder({ selectedId: mockOrder.id });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('loadOrders on loadOrders()', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadOrders();

      const action = OrdersActions.loadOrders();

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('loadOrder on loadOrder(order.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadOrder(mockOrder.id);

      const action = OrdersActions.loadOrder({ orderId: mockOrder.id });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('createOrder on createOrder(order)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.createOrder(mockOrder);

      const action = OrdersActions.createOrder({ order: mockOrder });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('updateOrder on updateOrder(order)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.updateOrder(mockOrder);

      const action = OrdersActions.updateOrder({ order: mockOrder });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('delete on delete(model)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.deleteOrder(mockOrder);

      const action = OrdersActions.deleteOrder({ order: mockOrder });

      expect(spy).toHaveBeenCalledWith(action);
    });
  });
});
