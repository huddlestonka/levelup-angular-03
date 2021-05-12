import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '@bba/api-interfaces';
import { CustomersFacade } from '@bba/core-state';

@Component({
  selector: 'bba-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [CustomersFacade],
})
export class CustomersComponent implements OnInit {
  customers$: Observable<Customer[]> = this.customersFacade.currentCustomers$;
  selectedCustomer$: Observable<Customer> = this.customersFacade
    .selectedCustomer$;

  constructor(private customersFacade: CustomersFacade) {}

  ngOnInit(): void {}

  resetForm() {
    this.customersFacade.selectCustomer(null);
  }

  selectCustomer(customer: Customer) {
    this.customersFacade.selectCustomer(customer);
  }

  saveCustomer(customer: Customer) {
    if (customer.id) {
      this.customersFacade.updateCustomer(customer);
    } else {
      this.customersFacade.createCustomer(customer);
    }
  }

  deleteCustomer(customer: Customer) {
    this.customersFacade.deleteCustomer(customer);
  }
}
