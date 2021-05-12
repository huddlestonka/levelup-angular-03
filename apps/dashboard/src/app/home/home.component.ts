import { Component, OnInit } from '@angular/core';
import { CustomersFacade, OrdersFacade } from '@bba/core-state';

@Component({
  selector: 'bba-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  customerOrders$ = this.customersFacade.customerOrders$;

  constructor(
    private customersFacade: CustomersFacade,
    private ordersFacade: OrdersFacade
  ) {}

  ngOnInit(): void {
    this.customersFacade.loadCustomers();
    this.ordersFacade.loadOrders();
  }
}
