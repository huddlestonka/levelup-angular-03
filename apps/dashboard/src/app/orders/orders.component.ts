import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, Order } from '@bba/api-interfaces';
import { CustomersFacade, OrdersFacade } from '@bba/core-state';

@Component({
  selector: 'bba-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders$: Observable<Order[]> = this.ordersFacade.allOrders$;
  customers$: Observable<Customer[]> = this.customersFacade.allCustomers$;
  selectedOrder$ = this.ordersFacade.selectedOrder$;

  constructor(
    private ordersFacade: OrdersFacade,
    private customersFacade: CustomersFacade
  ) {}

  ngOnInit(): void {
    this.reset();
    this.ordersFacade.mutations$.subscribe((_) => this.reset());
  }

  reset() {
    this.loadOrders();
    this.loadCustomers();
    this.ordersFacade.selectOrder(null);
  }

  resetForm() {
    this.ordersFacade.selectOrder(null);
  }

  loadOrders() {
    this.ordersFacade.loadOrders();
  }

  loadCustomers() {
    this.customersFacade.loadCustomers();
  }

  selectOrder(order: Order) {
    this.ordersFacade.selectOrder(order.id);
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
