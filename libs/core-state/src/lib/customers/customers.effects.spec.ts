import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot, cold } from '@nrwl/angular/testing';

import { Observable } from 'rxjs';

import { CustomersEffects } from './customers.effects';
import * as CustomersActions from './customers.actions';
import { CustomersService } from '@bba/core-data';

import { mockCustomersService, mockCustomer } from '@bba/testing';
import { Customer } from '@bba/api-interfaces';

describe('CustomersEffects', () => {
  let actions: Observable<any>;
  let effects: CustomersEffects;
  let service: CustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CustomersEffects,
        DataPersistence,
        provideMockActions(() => actions),
        { provide: CustomersService, useValue: mockCustomersService },
      ],
    });

    effects = TestBed.inject(CustomersEffects);
    service = TestBed.inject(CustomersService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadCustomers$', () => {
    it('should return loadCustomersSuccess, on success', () => {
      const customers: Customer[] = [];
      const action = CustomersActions.loadCustomers();
      const outcome = CustomersActions.loadCustomersSuccess({ customers });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: customers });
      const expected = cold('--b', { b: outcome });
      service.all = jest.fn(() => response);

      expect(effects.loadCustomers$).toBeObservable(expected);
    });

    it('should return loadCustomersFailure, on failure', () => {
      const action = CustomersActions.loadCustomers();
      const error = new Error();
      const outcome = CustomersActions.loadCustomersFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.all = jest.fn(() => response);

      expect(effects.loadCustomers$).toBeObservable(expected);
    });
  });

  describe('loadCustomer$', () => {
    it('should return success with customer', () => {
      const customer = { ...mockCustomer };
      const action = CustomersActions.loadCustomer({ customerId: customer.id });
      const outcome = CustomersActions.loadCustomerSuccess({ customer });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: customer });
      const expected = cold('--b', { b: outcome });
      service.find = jest.fn(() => response);

      expect(effects.loadCustomer$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const customer = { ...mockCustomer };
      const action = CustomersActions.loadCustomer({ customerId: customer.id });
      const error = new Error();
      const outcome = CustomersActions.loadCustomerFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.find = jest.fn(() => response);

      expect(effects.loadCustomer$).toBeObservable(expected);
    });
  });

  describe('createCustomer$', () => {
    it('should return success with customer', () => {
      const customer = { ...mockCustomer };
      const action = CustomersActions.createCustomer({ customer });
      const outcome = CustomersActions.createCustomerSuccess({ customer });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: customer });
      const expected = cold('--b', { b: outcome });
      service.create = jest.fn(() => response);

      expect(effects.createCustomer$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const customer = { ...mockCustomer };
      const action = CustomersActions.createCustomer({ customer });
      const error = new Error();
      const outcome = CustomersActions.createCustomerFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.create = jest.fn(() => response);

      expect(effects.createCustomer$).toBeObservable(expected);
    });
  });

  describe('updateCustomer$', () => {
    it('should return success with customer', () => {
      const customer = { ...mockCustomer };
      const action = CustomersActions.updateCustomer({ customer });
      const outcome = CustomersActions.updateCustomerSuccess({ customer });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: customer });
      const expected = cold('--b', { b: outcome });
      service.update = jest.fn(() => response);

      expect(effects.updateCustomer$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const customer = { ...mockCustomer };
      const action = CustomersActions.updateCustomer({ customer });
      const error = new Error();
      const outcome = CustomersActions.updateCustomerFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.update = jest.fn(() => response);

      expect(effects.updateCustomer$).toBeObservable(expected);
    });
  });

  describe('deleteCustomer$', () => {
    it('should return success with customer', () => {
      const customer = { ...mockCustomer };
      const action = CustomersActions.deleteCustomer({ customer });
      const outcome = CustomersActions.deleteCustomerSuccess({ customer });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: customer });
      const expected = cold('--b', { b: outcome });
      service.delete = jest.fn(() => response);

      expect(effects.deleteCustomer$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const customer = { ...mockCustomer };
      const action = CustomersActions.deleteCustomer({ customer });
      const error = new Error();
      const outcome = CustomersActions.deleteCustomerFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.delete = jest.fn(() => response);

      expect(effects.deleteCustomer$).toBeObservable(expected);
    });
  });
});
