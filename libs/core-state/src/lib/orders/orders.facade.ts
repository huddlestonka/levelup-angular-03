import { Injectable } from '@angular/core';
import { Order } from '@bba/api-interfaces';
import { Action, ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import * as OrdersActions from './orders.actions';
import * as fromOrders from './orders.reducer';
import * as OrdersSelectors from './orders.selectors';

@Injectable({
  providedIn: 'root',
})
export class OrdersFacade {
  loaded$ = this.store.pipe(select(OrdersSelectors.getOrdersLoaded));
  allOrders$ = this.store.pipe(select(OrdersSelectors.getAllOrders));
  selectedOrder$ = this.store.pipe(select(OrdersSelectors.getSelectedOrder));

  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type === OrdersActions.createOrder({} as any).type ||
        action.type === OrdersActions.updateOrder({} as any).type ||
        action.type === OrdersActions.deleteOrder({} as any).type
    )
  );

  constructor(
    private store: Store<fromOrders.OrdersPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectOrder(selectedId: string) {
    this.dispatch(OrdersActions.selectOrder({ selectedId }));
  }

  loadOrders() {
    this.dispatch(OrdersActions.loadOrders());
  }

  loadOrder(orderId: string) {
    this.dispatch(OrdersActions.loadOrder({ orderId }));
  }

  createOrder(order: Order) {
    this.dispatch(
      OrdersActions.createOrder({
        order: Object.assign({}, order, { id: uuidv4() }),
      })
    );
  }

  updateOrder(order: Order) {
    this.dispatch(OrdersActions.updateOrder({ order }));
  }

  deleteOrder(order: Order) {
    this.dispatch(OrdersActions.deleteOrder({ order }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
