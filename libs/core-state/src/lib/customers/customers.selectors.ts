import { Customer } from '@bba/api-interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CUSTOMERS_FEATURE_KEY,
  CustomersState,
  customersAdapter,
} from './customers.reducer';

// Lookup the 'Customers' feature state managed by NgRx
export const getCustomersState = createFeatureSelector<CustomersState>(
  CUSTOMERS_FEATURE_KEY
);

const { selectAll, selectEntities } = customersAdapter.getSelectors();

export const getCustomersLoaded = createSelector(
  getCustomersState,
  (state: CustomersState) => state.loaded
);

export const getCustomersError = createSelector(
  getCustomersState,
  (state: CustomersState) => state.error
);

export const getAllCustomers = createSelector(
  getCustomersState,
  (state: CustomersState) => selectAll(state)
);

export const getCustomersEntities = createSelector(
  getCustomersState,
  (state: CustomersState) => selectEntities(state)
);

export const getSelectedCustomerId = createSelector(
  getCustomersState,
  (state: CustomersState) => state.selectedId
);

export const getSelectedCustomer = createSelector(
  getCustomersEntities,
  getSelectedCustomerId,
  (entities, selectedId) => {
    const emptyCustomer: Customer = {
      id: '',
      title: '',
      description: '',
      firstName: '',
      lastName: '',
      email: '',
      orders: [],
    };

    return selectedId ? entities[selectedId] : emptyCustomer;
  }
);
