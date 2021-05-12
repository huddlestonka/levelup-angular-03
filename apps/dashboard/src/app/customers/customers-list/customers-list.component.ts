import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from '@bba/api-interfaces';

@Component({
  selector: 'bba-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent {
  @Input() customers: Customer[];
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
