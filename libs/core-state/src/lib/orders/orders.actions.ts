import { Order } from '@bba/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedOrder = createAction('[Orders] Reset Selected Order');
export const resetOrders = createAction('[Orders] Reset Orders');

// Select Order
export const selectOrder = createAction(
  '[Orders] Select Order',
  props<{ selectedId: string }>()
);

// Load Orders
export const loadOrders = createAction('[Orders] Load Orders');

export const loadOrdersSuccess = createAction(
  '[Orders] Load Orders Success',
  props<{ orders: Order[] }>()
);

export const loadOrdersFailure = createAction(
  '[Orders] Load Orders Failure',
  props<{ error: any }>()
);

// Load Order
export const loadOrder = createAction(
  '[Orders] Load Order',
  props<{ orderId: string }>()
);

export const loadOrderSuccess = createAction(
  '[Orders] Load Order Success',
  props<{ order: Order }>()
);

export const loadOrderFailure = createAction(
  '[Orders] Load Order Failure',
  props<{ error: any }>()
);

// Create Order
export const createOrder = createAction(
  '[Orders] Create Order',
  props<{ order: Order }>()
);

export const createOrderSuccess = createAction(
  '[Orders] Create Order Success',
  props<{ order: Order }>()
);

export const createOrderFailure = createAction(
  '[Orders] Create Order Failure',
  props<{ error: any }>()
);

// Update Order
export const updateOrder = createAction(
  '[Orders] Update Order',
  props<{ order: Order }>()
);

export const updateOrderSuccess = createAction(
  '[Orders] Update Order Success',
  props<{ order: Order }>()
);

export const updateOrderFailure = createAction(
  '[Orders] Update Order Failure',
  props<{ error: any }>()
);

// Delete Order
export const deleteOrder = createAction(
  '[Orders] Delete Order',
  props<{ order: Order }>()
);

export const deleteOrderCancelled = createAction(
  '[Orders] Delete Order Cancelled'
);

export const deleteOrderSuccess = createAction(
  '[Orders] Delete Order Success',
  props<{ order: Order }>()
);

export const deleteOrderFailure = createAction(
  '[Orders] Delete Order Failure',
  props<{ error: any }>()
);
