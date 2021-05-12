import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as CustomersActions from './customers.actions';
import * as CustomersFeature from './customers.reducer';
import * as CustomersSelectors from './customers.selectors';
import { Customer } from '@bba/api-interfaces';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

const customers: Customer[] = [
  {
    id: '56789f40-b0fb-4aa6-8e88-376b4edfm8he',
    title: 'Shopping',
    description: ':)',
    firstName: 'Michael',
    lastName: 'Scott',
    email: 'tobyhater@yahoo.com',
    orders: [
      {
        id: '56789f40-b0fb-4aa6-4e88-376b4edfm8he',
        title: 'Gift Basket',
        description: 'THE TURTLES!',
        customerId: '56789f40-b0fb-4aa6-8e88-376b4edfm8he',
      },
      {
        id: '567898j0-b0fb-4aa6-4e88-376b4e0lk8he',
        title: 'Best Boss Mug',
        description: "World's Best Boss",
        customerId: '56789f40-b0fb-4aa6-8e88-376b4edfm8he',
      },
    ],
  },
  {
    id: '57789f40-b8hb-4aa6-8e88-376b4ed765he',
    title: 'HR Pizza Party',
    description: 'Pizza for everyone',
    firstName: 'Toby',
    lastName: 'Flenderson',
    email: 'theworst@yahoo.com',
    orders: [
      {
        id: '56783440-b0fb-4aa6-4e88-376b4edfm8he',
        title: 'Large Pepperoni',
        description: 'Extra sauce',
        customerId: '57789f40-b8hb-4336-8e88-376b4ed765he',
      },
      {
        id: '56229f40-b33b-4aa6-4e88-376b4elkj8he',
        title: 'Garlic Breadsticks',
        description: 'Extra garlic :)',
        customerId: '57789f40-b8hb-4aa6-8e88-376b4ed765he',
      },
    ],
  },
];

@Injectable()
export class CustomersFacade {
  private customersSubject: BehaviorSubject<Customer[]> = new BehaviorSubject(
    customers
  );
  currentCustomers$ = this.customersSubject.asObservable();
  private selectedCustomerSubject: BehaviorSubject<Customer> = new BehaviorSubject(
    null
  );
  selectedCustomer$ = this.selectedCustomerSubject.asObservable();
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  // loaded$ = this.store.pipe(select(CustomersSelectors.getCustomersLoaded));
  // allCustomers$ = this.store.pipe(select(CustomersSelectors.getAllCustomers));
  // selectedCustomers$ = this.store.pipe(select(CustomersSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(CustomersActions.init());
  }

  selectCustomer(selectedCustomer: Customer) {
    this.selectedCustomerSubject.next(selectedCustomer);
  }

  createCustomer(customer: Customer) {
    const customers: Customer[] = this.customersSubject.value;
    const newCustomer = Object.assign({}, customer, { id: uuidv4() });
    const updatedCustomers: Customer[] = [...customers, newCustomer];
    this.update(updatedCustomers);
  }

  updateCustomer(customer: Customer) {
    const customers: Customer[] = this.customersSubject.value;
    const updatedCustomers: Customer[] = customers.map((u) => {
      return u.id === customer.id ? Object.assign({}, customer) : u;
    });
    this.update(updatedCustomers);
  }

  deleteCustomer(customer: Customer) {
    const customers: Customer[] = this.customersSubject.value;
    const updatedCustomers: Customer[] = customers.filter(
      (c) => c.id !== customer.id
    );
    this.update(updatedCustomers);
  }

  update(customers: Customer[]) {
    this.customersSubject.next(customers);
  }
}
