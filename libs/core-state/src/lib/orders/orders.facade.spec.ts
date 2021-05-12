import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { OrdersEntity } from './orders.models';
import { OrdersEffects } from './orders.effects';
import { OrdersFacade } from './orders.facade';

import * as OrdersSelectors from './orders.selectors';
import * as OrdersActions from './orders.actions';
import {
  ORDERS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './orders.reducer';

interface TestSchema {
  orders: State;
}

describe('OrdersFacade', () => {
  let facade: OrdersFacade;
  let store: Store<TestSchema>;
  const createOrdersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as OrdersEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(ORDERS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([OrdersEffects]),
        ],
        providers: [OrdersFacade],
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
      facade = TestBed.inject(OrdersFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allOrders$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allOrders$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadOrdersSuccess` to manually update list
     */
    it('allOrders$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allOrders$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          OrdersActions.loadOrdersSuccess({
            orders: [createOrdersEntity('AAA'), createOrdersEntity('BBB')],
          })
        );

        list = await readFirst(facade.allOrders$);
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
