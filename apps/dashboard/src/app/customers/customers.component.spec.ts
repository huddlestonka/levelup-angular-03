import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

import { CoreDataModule } from '@bba/core-data';
import { CoreStateModule, CustomersFacade } from '@bba/core-state';
import { MaterialModule } from '@bba/material';

import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersComponent } from './customers.component';

import { mockCustomer, mockEmptyCustomer } from '@bba/testing';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;
  let de: DebugElement;
  let customersFacade: CustomersFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CustomersComponent,
        CustomerDetailsComponent,
        CustomersListComponent,
      ],
      imports: [
        CoreDataModule,
        CoreStateModule,
        FormsModule,
        MaterialModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    customersFacade = TestBed.inject(CustomersFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on select call customersFacade selectCustomer', () => {
    const spy = jest.spyOn(customersFacade, 'selectCustomer');

    component.selectCustomer(mockCustomer);

    expect(spy).toHaveBeenCalledWith(mockCustomer.id);
  });

  describe('should on save call customersFacade', () => {
    it('updateCustomer', () => {
      const spy = jest.spyOn(customersFacade, 'updateCustomer');

      component.saveCustomer(mockCustomer);

      expect(spy).toHaveBeenCalledWith(mockCustomer);
    });

    it('createCustomer', () => {
      const spy = jest.spyOn(customersFacade, 'createCustomer');

      component.saveCustomer(mockEmptyCustomer);

      expect(spy).toHaveBeenCalledWith(mockEmptyCustomer);
    });
  });

  it('should on delete call customersFacade deleteCustomer', () => {
    const spy = jest.spyOn(customersFacade, 'deleteCustomer');

    component.deleteCustomer(mockCustomer);

    expect(spy).toHaveBeenCalledWith(mockCustomer);
  });
});
