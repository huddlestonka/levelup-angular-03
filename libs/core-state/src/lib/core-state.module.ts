import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCustomers from './customers/customers.reducer';
import { CustomersEffects } from './customers/customers.effects';
import { CustomersFacade } from './customers/customers.facade';
import * as fromOrders from './orders/orders.reducer';
import { OrdersEffects } from './orders/orders.effects';
import { OrdersFacade } from './orders/orders.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromCustomers.CUSTOMERS_FEATURE_KEY,
      fromCustomers.reducer
    ),
    EffectsModule.forFeature([CustomersEffects]),
    StoreModule.forFeature(fromOrders.ORDERS_FEATURE_KEY, fromOrders.reducer),
    EffectsModule.forFeature([OrdersEffects]),
  ],
  providers: [CustomersFacade, OrdersFacade],
})
export class CoreStateModule {}
