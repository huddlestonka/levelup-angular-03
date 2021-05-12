import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as CustomersActions from './customers.actions';
import * as CustomersFeature from './customers.reducer';
import * as CustomersSelectors from './customers.selectors';

@Injectable()
export class CustomersFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(CustomersSelectors.getCustomersLoaded));
  allCustomers$ = this.store.pipe(select(CustomersSelectors.getAllCustomers));
  selectedCustomers$ = this.store.pipe(select(CustomersSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(CustomersActions.init());
  }
}
