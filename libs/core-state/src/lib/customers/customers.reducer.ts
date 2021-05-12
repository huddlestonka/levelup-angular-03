import { Customer } from '@bba/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as CustomersActions from './customers.actions';

export const CUSTOMERS_FEATURE_KEY = 'customers';

export interface CustomersState extends EntityState<Customer> {
  selectedId?: string | number; // which Customers record has been selected
  loaded: boolean; // has the Customers list been loaded
  error?: string | null; // last known error (if any)
}

export interface CustomersPartialState {
  readonly [CUSTOMERS_FEATURE_KEY]: CustomersState;
}

export const customersAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

export const initialCustomersState: CustomersState = customersAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

const onFailure = (state, { error }) => ({ ...state, error });

const _customersReducer = createReducer(
  initialCustomersState,
  on(CustomersActions.selectCustomer, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  on(CustomersActions.resetSelectedCustomer, (state) =>
    Object.assign({}, state, { selectedId: null })
  ),
  on(CustomersActions.resetCustomers, (state) =>
    customersAdapter.removeAll(state)
  ),
  // Load customers
  on(CustomersActions.loadCustomers, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CustomersActions.loadCustomersSuccess, (state, { customers }) =>
    customersAdapter.setAll(customers, { ...state, loaded: true })
  ),
  on(CustomersActions.loadCustomersFailure, onFailure),
  // Load customer
  on(CustomersActions.loadCustomer, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CustomersActions.loadCustomerSuccess, (state, { customer }) =>
    customersAdapter.upsertOne(customer, { ...state, loaded: true })
  ),
  on(CustomersActions.loadCustomerFailure, onFailure),
  // Add customer
  on(CustomersActions.createCustomerSuccess, (state, { customer }) =>
    customersAdapter.addOne(customer, state)
  ),
  on(CustomersActions.createCustomerFailure, onFailure),
  // Update customer
  on(CustomersActions.updateCustomerSuccess, (state, { customer }) =>
    customersAdapter.updateOne({ id: customer.id, changes: customer }, state)
  ),
  on(CustomersActions.updateCustomerFailure, onFailure),
  // Delete customer
  on(CustomersActions.deleteCustomerSuccess, (state, { customer }) =>
    customersAdapter.removeOne(customer.id, state)
  ),
  on(CustomersActions.deleteCustomerFailure, onFailure)
);

export function customersReducer(
  state: CustomersState | undefined,
  action: Action
) {
  return _customersReducer(state, action);
}
