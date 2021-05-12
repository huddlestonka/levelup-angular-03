import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from '@bba/api-interfaces';

@Component({
  selector: 'bba-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent {
  currentCustomer: Customer;
  originalTitle = '';
  @Input() set customer(value: Customer) {
    if (value) this.originalTitle = `${value.firstName} ${value.lastName}`;
    this.currentCustomer = { ...value };
  }
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
}
