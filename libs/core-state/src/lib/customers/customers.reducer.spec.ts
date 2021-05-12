import { CustomersEntity } from './customers.models';
import * as CustomersActions from './customers.actions';
import { State, initialState, reducer } from './customers.reducer';

describe('Customers Reducer', () => {
  const createCustomersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CustomersEntity);

  beforeEach(() => {});

  describe('valid Customers actions', () => {
    it('loadCustomersSuccess should return set the list of known Customers', () => {
      const customers = [
        createCustomersEntity('PRODUCT-AAA'),
        createCustomersEntity('PRODUCT-zzz'),
      ];
      const action = CustomersActions.loadCustomersSuccess({ customers });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
