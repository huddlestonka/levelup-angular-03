import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as OrdersActions from './orders.actions';
import { OrdersEntity } from './orders.models';

export const ORDERS_FEATURE_KEY = 'orders';

export interface State extends EntityState<OrdersEntity> {
  selectedId?: string | number; // which Orders record has been selected
  loaded: boolean; // has the Orders list been loaded
  error?: string | null; // last known error (if any)
}

export interface OrdersPartialState {
  readonly [ORDERS_FEATURE_KEY]: State;
}

export const ordersAdapter: EntityAdapter<OrdersEntity> = createEntityAdapter<OrdersEntity>();

export const initialState: State = ordersAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const ordersReducer = createReducer(
  initialState,
  on(OrdersActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(OrdersActions.loadOrdersSuccess, (state, { orders }) =>
    ordersAdapter.setAll(orders, { ...state, loaded: true })
  ),
  on(OrdersActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return ordersReducer(state, action);
}
