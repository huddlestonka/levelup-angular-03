import { Injectable } from '@angular/core';
import { Order } from '@bba/api-interfaces';
import { OrdersService } from '@bba/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import * as OrdersActions from './orders.actions';

@Injectable()
export class OrdersEffects {
  @Effect() loadOrders$ = this.actions$.pipe(
    ofType(OrdersActions.loadOrders),
    fetch({
      run: (action) =>
        this.ordersService
          .all()
          .pipe(
            map((orders: Order[]) =>
              OrdersActions.loadOrdersSuccess({ orders })
            )
          ),
      onError: (action, error) => OrdersActions.loadOrdersFailure({ error }),
    })
  );

  @Effect() loadOrder$ = this.actions$.pipe(
    ofType(OrdersActions.loadOrder),
    fetch({
      run: (action) =>
        this.ordersService
          .find(action.orderId)
          .pipe(
            map((order: Order) => OrdersActions.loadOrderSuccess({ order }))
          ),
      onError: (action, error) => OrdersActions.loadOrderFailure({ error }),
    })
  );

  @Effect() createOrder$ = this.actions$.pipe(
    ofType(OrdersActions.createOrder),
    pessimisticUpdate({
      run: (action) =>
        this.ordersService
          .create(action.order)
          .pipe(
            map((order: Order) => OrdersActions.createOrderSuccess({ order }))
          ),
      onError: (action, error) => OrdersActions.createOrderFailure({ error }),
    })
  );

  @Effect() updateOrder$ = this.actions$.pipe(
    ofType(OrdersActions.updateOrder),
    pessimisticUpdate({
      run: (action) =>
        this.ordersService
          .update(action.order)
          .pipe(
            map((order: Order) => OrdersActions.updateOrderSuccess({ order }))
          ),
      onError: (action, error) => OrdersActions.updateOrderFailure({ error }),
    })
  );

  @Effect() deleteOrder$ = this.actions$.pipe(
    ofType(OrdersActions.deleteOrder),
    pessimisticUpdate({
      run: (action) =>
        this.ordersService
          .delete(action.order)
          .pipe(
            map((order: Order) => OrdersActions.deleteOrderSuccess({ order }))
          ),
      onError: (action, error) => OrdersActions.deleteOrderFailure({ error }),
    })
  );

  constructor(
    private actions$: Actions,
    private ordersService: OrdersService
  ) {}
}
