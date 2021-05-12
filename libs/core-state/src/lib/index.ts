import { Params } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createSelector,
  MetaReducer,
} from '@ngrx/store';

import * as fromCustomers from './customers/customers.reducer';
import * as fromOrders from './orders/orders.reducer';

import * as CustomersSelectors from './customers/customers.selectors';
import * as OrdersSelectors from './orders/orders.selectors';
import { Customer, Order } from '@bba/api-interfaces';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

// ---------------------------------------
// Core State and Reducers
// ---------------------------------------

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  [fromCustomers.CUSTOMERS_FEATURE_KEY]: fromCustomers.CustomersState;
  [fromOrders.ORDERS_FEATURE_KEY]: fromOrders.OrdersState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  [fromCustomers.CUSTOMERS_FEATURE_KEY]: fromCustomers.customersReducer,
  [fromOrders.ORDERS_FEATURE_KEY]: fromOrders.ordersReducer,
};

// -------------------------------------------------------------------
// Common Selectors
// -------------------------------------------------------------------
export const getCustomerOrders = createSelector(
  CustomersSelectors.getAllCustomers,
  OrdersSelectors.getAllOrders,
  (customers: Customer[], orders: Order[]) => {
    return customers.map((customer) => ({
      ...customer,
      orders: orders.filter((orders) => orders.customerId === customer.id),
    }));
  }
);
