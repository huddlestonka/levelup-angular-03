import {
  CustomersState,
  customersAdapter,
  initialCustomersState,
} from './customers.reducer';
import * as CustomersSelectors from './customers.selectors';

import { Customer } from '@bba/api-interfaces';
import { mockCustomer } from '@bba/testing';

describe('Customers Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCustomersId = (it) => it['id'];
  const createCustomer = (id: string, name = '') =>
    ({ ...mockCustomer, id: id } as Customer);

  let state;

  beforeEach(() => {
    state = {
      customers: customersAdapter.setAll(
        [
          createCustomer('PRODUCT-AAA'),
          createCustomer('PRODUCT-BBB'),
          createCustomer('PRODUCT-CCC'),
        ],
        {
          ...initialCustomersState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Customers Selectors', () => {
    it('getAllCustomers() should return the list of Customers', () => {
      const results = CustomersSelectors.getAllCustomers(state);
      const selId = getCustomersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = CustomersSelectors.getSelectedCustomer(state);
      const selId = getCustomersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getCustomersLoaded() should return the current 'loaded' status", () => {
      const result = CustomersSelectors.getCustomersLoaded(state);

      expect(result).toBe(true);
    });

    it("getCustomersError() should return the current 'error' state", () => {
      const result = CustomersSelectors.getCustomersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
