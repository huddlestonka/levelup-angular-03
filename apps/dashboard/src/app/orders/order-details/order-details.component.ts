import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Customer, Order } from '@bba/api-interfaces';

@Component({
  selector: 'bba-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent {
  currentOrder: Order;
  originalTitle = '';
  @Input() customers: Customer[];
  @Input() set order(value: Order) {
    if (value) this.originalTitle = value.title;
    this.currentOrder = { ...value };
  }
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
}
