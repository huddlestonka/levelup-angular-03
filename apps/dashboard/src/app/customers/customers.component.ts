import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '@bba/api-interfaces';
import { CustomersFacade } from '@bba/core-state';

@Component({
  selector: 'bba-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers$: Observable<Customer[]> = this.customersFacade.allCustomers$;
  selectedCustomer$: Observable<Customer> = this.customersFacade
    .selectedCustomer$;

  constructor(private customersFacade: CustomersFacade) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.customersFacade.mutations$.subscribe((_) => this.reset());
  }

  reset() {
    this.loadCustomers();
    this.customersFacade.selectCustomer(null);
  }

  resetForm() {
    this.customersFacade.selectCustomer(null);
  }

  loadCustomers() {
    this.customersFacade.loadCustomers();
  }

  selectCustomer(customer: Customer) {
    this.customersFacade.selectCustomer(customer.id);
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
