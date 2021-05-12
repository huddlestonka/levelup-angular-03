import * as CustomersActions from './customers.actions';
import {
  CustomersState,
  initialCustomersState,
  customersReducer,
} from './customers.reducer';
import { mockCustomer, mockEmptyCustomer } from '@bba/testing';

describe('Customers Reducer', () => {
  let customers;

  beforeEach(() => {
    customers = [
      { ...mockCustomer, id: '0' },
      { ...mockCustomer, id: '1' },
      { ...mockCustomer, id: '2' },
    ];
  });

  describe('valid Customers actions', () => {
    it('loadCustomers should set loaded to false', () => {
      const action = CustomersActions.loadCustomers();
      const expectedState = {
        ...initialCustomersState,
        error: null,
      };

      const result: CustomersState = customersReducer(
        initialCustomersState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadCustomersSuccess should set the list of known Customers', () => {
      const action = CustomersActions.loadCustomersSuccess({ customers });
      const expectedState = {
        ...initialCustomersState,
        loaded: true,
        entities: {
          0: customers[0],
          1: customers[1],
          2: customers[2],
        },
        ids: customers.map((customer) => customer.id),
      };

      const result: CustomersState = customersReducer(
        initialCustomersState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadCustomersFailure should set error to error', () => {
      const error = new Error();
      const action = CustomersActions.loadCustomersFailure({ error });
      const expectedState = {
        ...initialCustomersState,
        error,
      };

      const result: CustomersState = customersReducer(
        initialCustomersState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadCustomer should set loaded to false', () => {
      const action = CustomersActions.loadCustomer({
        customerId: mockCustomer.id,
      });
      const expectedState = {
        ...initialCustomersState,
        loaded: false,
        error: null,
      };

      const result: CustomersState = customersReducer(
        initialCustomersState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadCustomerSuccess should set loaded to true', () => {
      const action = CustomersActions.loadCustomerSuccess({
        customer: mockCustomer,
      });
      const expectedState = {
        ...initialCustomersState,
        loaded: true,
        entities: {
          0: mockCustomer,
        },
        ids: [mockCustomer.id],
      };

      const result: CustomersState = customersReducer(
        initialCustomersState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadCustomerFailure should set error to error', () => {
      const error = new Error();
      const action = CustomersActions.loadCustomerFailure({ error });
      const expectedState = {
        ...initialCustomersState,
        error,
      };

      const result: CustomersState = customersReducer(
        initialCustomersState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('updateCustomerSuccess should modify customer', () => {
      const prepAction = CustomersActions.loadCustomerSuccess({
        customer: { ...mockEmptyCustomer, id: mockCustomer.id },
      });
      const prepState: CustomersState = customersReducer(
        initialCustomersState,
        prepAction
      );

      const expectedState = {
        ...initialCustomersState,
        loaded: true,
        entities: {
          0: mockCustomer,
        },
        ids: [mockCustomer.id],
      };

      const action = CustomersActions.updateCustomerSuccess({
        customer: mockCustomer,
      });
      const result: CustomersState = customersReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('updateCustomerFailure should set error to error', () => {
      const error = new Error();
      const action = CustomersActions.updateCustomerFailure({ error });
      const expectedState = {
        ...initialCustomersState,
        error,
      };

      const result: CustomersState = customersReducer(
        initialCustomersState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('createCustomerSuccess should add customer', () => {
      const action = CustomersActions.createCustomerSuccess({
        customer: mockCustomer,
      });
      const expectedState = {
        ...initialCustomersState,
        loaded: false,
        entities: {
          0: mockCustomer,
        },
        ids: [mockCustomer.id],
      };

      const result: CustomersState = customersReducer(
        initialCustomersState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('createCustomerFailure should set error to error', () => {
      const error = new Error();
      const action = CustomersActions.createCustomerFailure({ error });
      const expectedState = {
        ...initialCustomersState,
        error,
      };

      const result: CustomersState = customersReducer(
        initialCustomersState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('deleteCustomerSuccess should add customer', () => {
      const prepAction = CustomersActions.loadCustomerSuccess({
        customer: mockCustomer,
      });
      const prepState: CustomersState = customersReducer(
        initialCustomersState,
        prepAction
      );

      const expectedState = {
        ...initialCustomersState,
        loaded: true,
      };

      const action = CustomersActions.deleteCustomerSuccess({
        customer: mockCustomer,
      });
      const result: CustomersState = customersReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('deleteCustomerFailure should set error to error', () => {
      const error = new Error();
      const action = CustomersActions.deleteCustomerFailure({ error });
      const expectedState = {
        ...initialCustomersState,
        error,
      };

      const result: CustomersState = customersReducer(
        initialCustomersState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('selectCustomer should set selectedId', () => {
      const action = CustomersActions.selectCustomer({
        selectedId: mockCustomer.id,
      });
      const expectedState = {
        ...initialCustomersState,
        selectedId: mockCustomer.id,
      };

      const result: CustomersState = customersReducer(
        initialCustomersState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('resetSelectedCustomer should reset selectedId', () => {
      const prepAction = CustomersActions.selectCustomer({
        selectedId: mockCustomer.id,
      });
      const prepState = customersReducer(initialCustomersState, prepAction);

      const action = CustomersActions.resetSelectedCustomer();
      const expectedState = {
        ...initialCustomersState,
        selectedId: null,
      };

      const result: CustomersState = customersReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('resetCustomers should reset customers', () => {
      const prepAction = CustomersActions.loadCustomersSuccess({ customers });
      const prepState: CustomersState = customersReducer(
        initialCustomersState,
        prepAction
      );

      const expectedState = {
        ...initialCustomersState,
        loaded: true,
      };

      const action = CustomersActions.resetCustomers();
      const result: CustomersState = customersReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result: CustomersState = customersReducer(
        initialCustomersState,
        action
      );

      expect(result).toBe(initialCustomersState);
    });
  });
});
