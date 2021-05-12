import { Injectable } from '@angular/core';
import { Customer } from '@bba/api-interfaces';
import { Action, ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { getCustomerOrders } from '..';
import * as CustomersActions from './customers.actions';
import * as fromCustomers from './customers.reducer';
import * as CustomersSelectors from './customers.selectors';

@Injectable({
  providedIn: 'root',
})
export class CustomersFacade {
  loaded$ = this.store.pipe(select(CustomersSelectors.getCustomersLoaded));
  allCustomers$ = this.store.pipe(select(CustomersSelectors.getAllCustomers));
  selectedCustomer$ = this.store.pipe(
    select(CustomersSelectors.getSelectedCustomer)
  );
  customerOrders$ = this.store.pipe(select(getCustomerOrders));

  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type === CustomersActions.createCustomer({} as any).type ||
        action.type === CustomersActions.updateCustomer({} as any).type ||
        action.type === CustomersActions.deleteCustomer({} as any).type
    )
  );

  constructor(
    private store: Store<fromCustomers.CustomersPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectCustomer(selectedId: string) {
    this.dispatch(CustomersActions.selectCustomer({ selectedId }));
  }

  loadCustomers() {
    this.dispatch(CustomersActions.loadCustomers());
  }

  loadCustomer(customerId: string) {
    this.dispatch(CustomersActions.loadCustomer({ customerId }));
  }

  createCustomer(customer: Customer) {
    this.dispatch(
      CustomersActions.createCustomer({
        customer: Object.assign({}, customer, { id: uuidv4() }),
      })
    );
  }

  updateCustomer(customer: Customer) {
    this.dispatch(CustomersActions.updateCustomer({ customer }));
  }

  deleteCustomer(customer: Customer) {
    this.dispatch(CustomersActions.deleteCustomer({ customer }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
