import { Component, OnInit } from '@angular/core';
import { CustomersFacade, OrdersFacade } from '@bba/core-state';

@Component({
  selector: 'bba-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [CustomersFacade],
})
export class HomeComponent implements OnInit {
  customers$ = this.customersFacade.currentCustomers$;

  constructor(private customersFacade: CustomersFacade) {}

  ngOnInit(): void {}
}
