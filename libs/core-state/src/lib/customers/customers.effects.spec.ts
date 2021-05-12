import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { CustomersEffects } from './customers.effects';
import * as CustomersActions from './customers.actions';

describe('CustomersEffects', () => {
  let actions: Observable<any>;
  let effects: CustomersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CustomersEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CustomersEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CustomersActions.init() });

      const expected = hot('-a-|', {
        a: CustomersActions.loadCustomersSuccess({ customers: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
