import { TestBed } from '@angular/core/testing';
import { ActionsSubject } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { CustomersFacade } from './customers.facade';
import * as CustomersActions from './customers.actions';
import { initialCustomersState } from './customers.reducer';

import { mockCustomer } from '@bba/testing';

describe('CustomersFacade', () => {
  let facade: CustomersFacade;
  let actionSubject;
  const mockActionsSubject = new ActionsSubject();
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomersFacade,
        provideMockStore({ initialState: initialCustomersState }),
        { provide: ActionsSubject, useValue: mockActionsSubject },
      ],
    });

    facade = TestBed.inject(CustomersFacade);
    actionSubject = TestBed.inject(ActionsSubject);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should have mutations', (done) => {
    const action = CustomersActions.createCustomer({ customer: mockCustomer });
    actionSubject.next(action);

    facade.mutations$.subscribe((result) => {
      expect(result).toBe(action);
      done();
    });
  });

  describe('should dispatch', () => {
    it('select on select(customer.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.selectCustomer(mockCustomer.id);

      const action = CustomersActions.selectCustomer({
        selectedId: mockCustomer.id,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('loadCustomers on loadCustomers()', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadCustomers();

      const action = CustomersActions.loadCustomers();

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('loadCustomer on loadCustomer(customer.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadCustomer(mockCustomer.id);

      const action = CustomersActions.loadCustomer({
        customerId: mockCustomer.id,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('createCustomer on createCustomer(customer)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.createCustomer(mockCustomer);

      const action = CustomersActions.createCustomer({
        customer: mockCustomer,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('updateCustomer on updateCustomer(customer)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.updateCustomer(mockCustomer);

      const action = CustomersActions.updateCustomer({
        customer: mockCustomer,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('delete on delete(model)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.deleteCustomer(mockCustomer);

      const action = CustomersActions.deleteCustomer({
        customer: mockCustomer,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });
  });
});
