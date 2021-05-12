import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from '@bba/api-interfaces';

@Component({
  selector: 'bba-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent {
  @Input() orders: Order[];
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
