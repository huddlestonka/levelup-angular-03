import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreDataModule } from '@bba/core-data';
import { CoreStateModule } from '@bba/core-state';
import { MaterialModule } from '@bba/material';
import { CustomersListComponent } from '../customers/customers-list/customers-list.component';
import { OrdersListComponent } from '../orders/orders-list/orders-list.component';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        CustomersListComponent,
        OrdersListComponent,
      ],
      imports: [
        CoreDataModule,
        CoreStateModule,
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
