import * as OrdersActions from './orders.actions';
import {
  OrdersState,
  initialOrdersState,
  ordersReducer,
} from './orders.reducer';
import { mockOrder, mockEmptyOrder } from '@bba/testing';

describe('Orders Reducer', () => {
  let orders;

  beforeEach(() => {
    orders = [
      { ...mockOrder, id: '0' },
      { ...mockOrder, id: '1' },
      { ...mockOrder, id: '2' },
    ];
  });

  describe('valid Orders actions', () => {
    it('loadOrders should set loaded to false', () => {
      const action = OrdersActions.loadOrders();
      const expectedState = {
        ...initialOrdersState,
        error: null,
      };

      const result: OrdersState = ordersReducer(initialOrdersState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadOrdersSuccess should set the list of known Orders', () => {
      const action = OrdersActions.loadOrdersSuccess({ orders });
      const expectedState = {
        ...initialOrdersState,
        loaded: true,
        entities: {
          0: orders[0],
          1: orders[1],
          2: orders[2],
        },
        ids: orders.map((order) => order.id),
      };

      const result: OrdersState = ordersReducer(initialOrdersState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadOrdersFailure should set error to error', () => {
      const error = new Error();
      const action = OrdersActions.loadOrdersFailure({ error });
      const expectedState = {
        ...initialOrdersState,
        error,
      };

      const result: OrdersState = ordersReducer(initialOrdersState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadOrder should set loaded to false', () => {
      const action = OrdersActions.loadOrder({ orderId: mockOrder.id });
      const expectedState = {
        ...initialOrdersState,
        loaded: false,
        error: null,
      };

      const result: OrdersState = ordersReducer(initialOrdersState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadOrderSuccess should set loaded to true', () => {
      const action = OrdersActions.loadOrderSuccess({ order: mockOrder });
      const expectedState = {
        ...initialOrdersState,
        loaded: true,
        entities: {
          0: mockOrder,
        },
        ids: [mockOrder.id],
      };

      const result: OrdersState = ordersReducer(initialOrdersState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('loadOrderFailure should set error to error', () => {
      const error = new Error();
      const action = OrdersActions.loadOrderFailure({ error });
      const expectedState = {
        ...initialOrdersState,
        error,
      };

      const result: OrdersState = ordersReducer(initialOrdersState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('updateOrderSuccess should modify order', () => {
      const prepAction = OrdersActions.loadOrderSuccess({
        order: { ...mockEmptyOrder, id: mockOrder.id },
      });
      const prepState: OrdersState = ordersReducer(
        initialOrdersState,
        prepAction
      );

      const expectedState = {
        ...initialOrdersState,
        loaded: true,
        entities: {
          0: mockOrder,
        },
        ids: [mockOrder.id],
      };

      const action = OrdersActions.updateOrderSuccess({ order: mockOrder });
      const result: OrdersState = ordersReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('updateOrderFailure should set error to error', () => {
      const error = new Error();
      const action = OrdersActions.updateOrderFailure({ error });
      const expectedState = {
        ...initialOrdersState,
        error,
      };

      const result: OrdersState = ordersReducer(initialOrdersState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('createOrderSuccess should add order', () => {
      const action = OrdersActions.createOrderSuccess({ order: mockOrder });
      const expectedState = {
        ...initialOrdersState,
        loaded: false,
        entities: {
          0: mockOrder,
        },
        ids: [mockOrder.id],
      };

      const result: OrdersState = ordersReducer(initialOrdersState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('createOrderFailure should set error to error', () => {
      const error = new Error();
      const action = OrdersActions.createOrderFailure({ error });
      const expectedState = {
        ...initialOrdersState,
        error,
      };

      const result: OrdersState = ordersReducer(initialOrdersState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('deleteOrderSuccess should add order', () => {
      const prepAction = OrdersActions.loadOrderSuccess({
        order: mockOrder,
      });
      const prepState: OrdersState = ordersReducer(
        initialOrdersState,
        prepAction
      );

      const expectedState = {
        ...initialOrdersState,
        loaded: true,
      };

      const action = OrdersActions.deleteOrderSuccess({ order: mockOrder });
      const result: OrdersState = ordersReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('deleteOrderFailure should set error to error', () => {
      const error = new Error();
      const action = OrdersActions.deleteOrderFailure({ error });
      const expectedState = {
        ...initialOrdersState,
        error,
      };

      const result: OrdersState = ordersReducer(initialOrdersState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('selectOrder should set selectedId', () => {
      const action = OrdersActions.selectOrder({ selectedId: mockOrder.id });
      const expectedState = {
        ...initialOrdersState,
        selectedId: mockOrder.id,
      };

      const result: OrdersState = ordersReducer(initialOrdersState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('resetSelectedOrder should reset selectedId', () => {
      const prepAction = OrdersActions.selectOrder({
        selectedId: mockOrder.id,
      });
      const prepState = ordersReducer(initialOrdersState, prepAction);

      const action = OrdersActions.resetSelectedOrder();
      const expectedState = {
        ...initialOrdersState,
        selectedId: null,
      };

      const result: OrdersState = ordersReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('resetOrders should reset orders', () => {
      const prepAction = OrdersActions.loadOrdersSuccess({ orders });
      const prepState: OrdersState = ordersReducer(
        initialOrdersState,
        prepAction
      );

      const expectedState = {
        ...initialOrdersState,
        loaded: true,
      };

      const action = OrdersActions.resetOrders();
      const result: OrdersState = ordersReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result: OrdersState = ordersReducer(initialOrdersState, action);

      expect(result).toBe(initialOrdersState);
    });
  });
});
