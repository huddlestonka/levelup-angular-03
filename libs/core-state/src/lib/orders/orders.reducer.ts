import { Order } from '@bba/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as OrdersActions from './orders.actions';

export const ORDERS_FEATURE_KEY = 'orders';

export interface OrdersState extends EntityState<Order> {
  selectedId?: string | number; // which Orders record has been selected
  loaded: boolean; // has the Orders list been loaded
  error?: string | null; // last known error (if any)
}

export interface OrdersPartialState {
  readonly [ORDERS_FEATURE_KEY]: OrdersState;
}

export const ordersAdapter: EntityAdapter<Order> = createEntityAdapter<Order>();

export const initialOrdersState: OrdersState = ordersAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const onFailure = (state, { error }) => ({ ...state, error });

const _ordersReducer = createReducer(
  initialOrdersState,
  on(OrdersActions.selectOrder, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  on(OrdersActions.resetSelectedOrder, (state) =>
    Object.assign({}, state, { selectedId: null })
  ),
  on(OrdersActions.resetOrders, (state) => ordersAdapter.removeAll(state)),
  // Load orders
  on(OrdersActions.loadOrders, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(OrdersActions.loadOrdersSuccess, (state, { orders }) =>
    ordersAdapter.setAll(orders, { ...state, loaded: true })
  ),
  on(OrdersActions.loadOrdersFailure, onFailure),
  // Load order
  on(OrdersActions.loadOrder, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(OrdersActions.loadOrderSuccess, (state, { order }) =>
    ordersAdapter.upsertOne(order, { ...state, loaded: true })
  ),
  on(OrdersActions.loadOrderFailure, onFailure),
  // Add order
  on(OrdersActions.createOrderSuccess, (state, { order }) =>
    ordersAdapter.addOne(order, state)
  ),
  on(OrdersActions.createOrderFailure, onFailure),
  // Update order
  on(OrdersActions.updateOrderSuccess, (state, { order }) =>
    ordersAdapter.updateOne({ id: order.id, changes: order }, state)
  ),
  on(OrdersActions.updateOrderFailure, onFailure),
  // Delete order
  on(OrdersActions.deleteOrderSuccess, (state, { order }) =>
    ordersAdapter.removeOne(order.id, state)
  ),
  on(OrdersActions.deleteOrderFailure, onFailure)
);

export function ordersReducer(state: OrdersState | undefined, action: Action) {
  return _ordersReducer(state, action);
}
