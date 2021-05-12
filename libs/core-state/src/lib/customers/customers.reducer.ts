import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as CustomersActions from './customers.actions';
import { CustomersEntity } from './customers.models';

export const CUSTOMERS_FEATURE_KEY = 'customers';

export interface State extends EntityState<CustomersEntity> {
  selectedId?: string | number; // which Customers record has been selected
  loaded: boolean; // has the Customers list been loaded
  error?: string | null; // last known error (if any)
}

export interface CustomersPartialState {
  readonly [CUSTOMERS_FEATURE_KEY]: State;
}

export const customersAdapter: EntityAdapter<CustomersEntity> = createEntityAdapter<CustomersEntity>();

export const initialState: State = customersAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const customersReducer = createReducer(
  initialState,
  on(CustomersActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CustomersActions.loadCustomersSuccess, (state, { customers }) =>
    customersAdapter.setAll(customers, { ...state, loaded: true })
  ),
  on(CustomersActions.loadCustomersFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return customersReducer(state, action);
}
