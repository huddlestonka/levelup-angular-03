import {
  OrdersState,
  ordersAdapter,
  initialOrdersState,
} from './orders.reducer';
import * as OrdersSelectors from './orders.selectors';

import { Order } from '@bba/api-interfaces';
import { mockOrder } from '@bba/testing';

describe('Orders Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getOrdersId = (it) => it['id'];
  const createOrder = (id: string, name = '') =>
    ({ ...mockOrder, id: id } as Order);

  let state;

  beforeEach(() => {
    state = {
      orders: ordersAdapter.setAll(
        [
          createOrder('PRODUCT-AAA'),
          createOrder('PRODUCT-BBB'),
          createOrder('PRODUCT-CCC'),
        ],
        {
          ...initialOrdersState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Orders Selectors', () => {
    it('getAllOrders() should return the list of Orders', () => {
      const results = OrdersSelectors.getAllOrders(state);
      const selId = getOrdersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = OrdersSelectors.getSelectedOrder(state);
      const selId = getOrdersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getOrdersLoaded() should return the current 'loaded' status", () => {
      const result = OrdersSelectors.getOrdersLoaded(state);

      expect(result).toBe(true);
    });

    it("getOrdersError() should return the current 'error' state", () => {
      const result = OrdersSelectors.getOrdersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
