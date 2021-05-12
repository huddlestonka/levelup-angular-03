import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as OrdersFeature from './orders.reducer';
import * as OrdersActions from './orders.actions';

@Injectable()
export class OrdersEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return OrdersActions.loadOrdersSuccess({ orders: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return OrdersActions.loadOrdersFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
