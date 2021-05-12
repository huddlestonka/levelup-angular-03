import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { CustomersEntity } from './customers.models';
import { CustomersEffects } from './customers.effects';
import { CustomersFacade } from './customers.facade';

import * as CustomersSelectors from './customers.selectors';
import * as CustomersActions from './customers.actions';
import {
  CUSTOMERS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './customers.reducer';

interface TestSchema {
  customers: State;
}

describe('CustomersFacade', () => {
  let facade: CustomersFacade;
  let store: Store<TestSchema>;
  const createCustomersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CustomersEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CUSTOMERS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CustomersEffects]),
        ],
        providers: [CustomersFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(CustomersFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allCustomers$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allCustomers$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadCustomersSuccess` to manually update list
     */
    it('allCustomers$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allCustomers$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          CustomersActions.loadCustomersSuccess({
            customers: [
              createCustomersEntity('AAA'),
              createCustomersEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allCustomers$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
