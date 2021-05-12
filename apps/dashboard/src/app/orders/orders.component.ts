import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, Order } from '@bba/api-interfaces';
import { OrdersFacade, CustomersFacade } from '@bba/core-state';

@Component({
  selector: 'bba-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrdersFacade, CustomersFacade],
})
export class OrdersComponent implements OnInit {
  orders$: Observable<Order[]> = this.ordersFacade.currentOrders$;
  customers$: Observable<Customer[]> = this.customersFacade.currentCustomers$;
  selectedOrder$: Observable<Order> = this.ordersFacade.selectedOrder$;

  constructor(
    private ordersFacade: OrdersFacade,
    private customersFacade: CustomersFacade
  ) {}

  ngOnInit(): void {}

  resetForm() {
    this.ordersFacade.selectOrder(null);
  }

  selectOrder(order: Order) {
    this.ordersFacade.selectOrder(order);
  }

  saveOrder(order: Order) {
    if (order.id) {
      this.ordersFacade.updateOrder(order);
    } else {
      this.ordersFacade.createOrder(order);
    }
  }

  deleteOrder(order: Order) {
    this.ordersFacade.deleteOrder(order);
  }
}
