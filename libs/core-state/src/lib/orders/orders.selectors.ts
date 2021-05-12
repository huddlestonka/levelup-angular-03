import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ORDERS_FEATURE_KEY,
  State,
  OrdersPartialState,
  ordersAdapter,
} from './orders.reducer';

// Lookup the 'Orders' feature state managed by NgRx
export const getOrdersState = createFeatureSelector<OrdersPartialState, State>(
  ORDERS_FEATURE_KEY
);

const { selectAll, selectEntities } = ordersAdapter.getSelectors();

export const getOrdersLoaded = createSelector(
  getOrdersState,
  (state: State) => state.loaded
);

export const getOrdersError = createSelector(
  getOrdersState,
  (state: State) => state.error
);

export const getAllOrders = createSelector(getOrdersState, (state: State) =>
  selectAll(state)
);

export const getOrdersEntities = createSelector(
  getOrdersState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getOrdersState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getOrdersEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
