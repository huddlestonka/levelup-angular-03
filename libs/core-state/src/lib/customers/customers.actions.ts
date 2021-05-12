import { Customer } from '@bba/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedCustomer = createAction(
  '[Customers] Reset Selected Customer'
);
export const resetCustomers = createAction('[Customers] Reset Customers');

// Select Customer
export const selectCustomer = createAction(
  '[Customers] Select Customer',
  props<{ selectedId: string }>()
);

// Load Customers
export const loadCustomers = createAction('[Customers] Load Customers');

export const loadCustomersSuccess = createAction(
  '[Customers] Load Customers Success',
  props<{ customers: Customer[] }>()
);

export const loadCustomersFailure = createAction(
  '[Customers] Load Customers Failure',
  props<{ error: any }>()
);

// Load Customer
export const loadCustomer = createAction(
  '[Customers] Load Customer',
  props<{ customerId: string }>()
);

export const loadCustomerSuccess = createAction(
  '[Customers] Load Customer Success',
  props<{ customer: Customer }>()
);

export const loadCustomerFailure = createAction(
  '[Customers] Load Customer Failure',
  props<{ error: any }>()
);

// Create Customer
export const createCustomer = createAction(
  '[Customers] Create Customer',
  props<{ customer: Customer }>()
);

export const createCustomerSuccess = createAction(
  '[Customers] Create Customer Success',
  props<{ customer: Customer }>()
);

export const createCustomerFailure = createAction(
  '[Customers] Create Customer Failure',
  props<{ error: any }>()
);

// Update Customer
export const updateCustomer = createAction(
  '[Customers] Update Customer',
  props<{ customer: Customer }>()
);

export const updateCustomerSuccess = createAction(
  '[Customers] Update Customer Success',
  props<{ customer: Customer }>()
);

export const updateCustomerFailure = createAction(
  '[Customers] Update Customer Failure',
  props<{ error: any }>()
);

// Delete Customer
export const deleteCustomer = createAction(
  '[Customers] Delete Customer',
  props<{ customer: Customer }>()
);

export const deleteCustomerCancelled = createAction(
  '[Customers] Delete Customer Cancelled'
);

export const deleteCustomerSuccess = createAction(
  '[Customers] Delete Customer Success',
  props<{ customer: Customer }>()
);

export const deleteCustomerFailure = createAction(
  '[Customers] Delete Customer Failure',
  props<{ error: any }>()
);
