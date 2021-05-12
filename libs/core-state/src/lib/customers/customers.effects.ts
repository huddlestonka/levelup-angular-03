import { Injectable } from '@angular/core';
import { Customer } from '@bba/api-interfaces';
import { CustomersService } from '@bba/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import * as CustomersActions from './customers.actions';

@Injectable()
export class CustomersEffects {
  @Effect() loadCustomers$ = this.actions$.pipe(
    ofType(CustomersActions.loadCustomers),
    fetch({
      run: (action) =>
        this.customersService
          .all()
          .pipe(
            map((customers: Customer[]) =>
              CustomersActions.loadCustomersSuccess({ customers })
            )
          ),
      onError: (action, error) =>
        CustomersActions.loadCustomersFailure({ error }),
    })
  );

  @Effect() loadCustomer$ = this.actions$.pipe(
    ofType(CustomersActions.loadCustomer),
    fetch({
      run: (action) =>
        this.customersService
          .find(action.customerId)
          .pipe(
            map((customer: Customer) =>
              CustomersActions.loadCustomerSuccess({ customer })
            )
          ),
      onError: (action, error) =>
        CustomersActions.loadCustomerFailure({ error }),
    })
  );

  @Effect() createCustomer$ = this.actions$.pipe(
    ofType(CustomersActions.createCustomer),
    pessimisticUpdate({
      run: (action) =>
        this.customersService
          .create(action.customer)
          .pipe(
            map((customer: Customer) =>
              CustomersActions.createCustomerSuccess({ customer })
            )
          ),
      onError: (action, error) =>
        CustomersActions.createCustomerFailure({ error }),
    })
  );

  @Effect() updateCustomer$ = this.actions$.pipe(
    ofType(CustomersActions.updateCustomer),
    pessimisticUpdate({
      run: (action) =>
        this.customersService
          .update(action.customer)
          .pipe(
            map((customer: Customer) =>
              CustomersActions.updateCustomerSuccess({ customer })
            )
          ),
      onError: (action, error) =>
        CustomersActions.updateCustomerFailure({ error }),
    })
  );

  @Effect() deleteCustomer$ = this.actions$.pipe(
    ofType(CustomersActions.deleteCustomer),
    pessimisticUpdate({
      run: (action) =>
        this.customersService
          .delete(action.customer)
          .pipe(
            map((customer: Customer) =>
              CustomersActions.deleteCustomerSuccess({ customer })
            )
          ),
      onError: (action, error) =>
        CustomersActions.deleteCustomerFailure({ error }),
    })
  );

  constructor(
    private actions$: Actions,
    private customersService: CustomersService
  ) {}
}
