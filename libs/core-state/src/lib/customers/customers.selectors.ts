import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CUSTOMERS_FEATURE_KEY,
  State,
  CustomersPartialState,
  customersAdapter,
} from './customers.reducer';

// Lookup the 'Customers' feature state managed by NgRx
export const getCustomersState = createFeatureSelector<
  CustomersPartialState,
  State
>(CUSTOMERS_FEATURE_KEY);

const { selectAll, selectEntities } = customersAdapter.getSelectors();

export const getCustomersLoaded = createSelector(
  getCustomersState,
  (state: State) => state.loaded
);

export const getCustomersError = createSelector(
  getCustomersState,
  (state: State) => state.error
);

export const getAllCustomers = createSelector(
  getCustomersState,
  (state: State) => selectAll(state)
);

export const getCustomersEntities = createSelector(
  getCustomersState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCustomersState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getCustomersEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
