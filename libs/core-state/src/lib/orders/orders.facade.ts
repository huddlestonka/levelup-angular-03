import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as OrdersActions from './orders.actions';
import * as OrdersFeature from './orders.reducer';
import * as OrdersSelectors from './orders.selectors';
import { Order } from '@bba/api-interfaces';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

const orders: Order[] = [
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
];

@Injectable()
export class OrdersFacade {
  private ordersSubject: BehaviorSubject<Order[]> = new BehaviorSubject(orders);
  currentOrders$ = this.ordersSubject.asObservable();
  private selectedOrderSubject: BehaviorSubject<Order> = new BehaviorSubject(
    null
  );
  selectedOrder$ = this.selectedOrderSubject.asObservable();
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(OrdersSelectors.getOrdersLoaded));
  allOrders$ = this.store.pipe(select(OrdersSelectors.getAllOrders));
  selectedOrders$ = this.store.pipe(select(OrdersSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(OrdersActions.init());
  }

  selectOrder(selectedOrder: Order) {
    this.selectedOrderSubject.next(selectedOrder);
  }

  createOrder(order: Order) {
    const orders: Order[] = this.ordersSubject.value;
    const newOrder = Object.assign({}, order, { id: uuidv4() });
    const updatedOrders: Order[] = [...orders, newOrder];
    this.update(updatedOrders);
  }

  updateOrder(order: Order) {
    const orders: Order[] = this.ordersSubject.value;
    const updatedOrders: Order[] = orders.map((u) => {
      return u.id === order.id ? Object.assign({}, order) : u;
    });
    this.update(updatedOrders);
  }

  deleteOrder(order: Order) {
    const orders: Order[] = this.ordersSubject.value;
    const updatedOrders: Order[] = orders.filter((c) => c.id !== order.id);
    this.update(updatedOrders);
  }

  update(orders: Order[]) {
    this.ordersSubject.next(orders);
  }
}
