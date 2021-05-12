import { Customer } from '@bba/api-interfaces';
import { of } from 'rxjs';

export const mockCustomersFacade = {
  loadCustomers: () => {},
  selectCustomer: () => {},
  deleteCustomer: () => {},
  updateCustomer: () => {},
  createCustomer: () => {},
  mutations$: of(true),
};

export const mockCustomersService = {
  all: () => of([]),
  find: () => of({ ...mockCustomer }),
  create: () => of({ ...mockCustomer }),
  update: () => of({ ...mockCustomer }),
  delete: () => of({ ...mockCustomer }),
};

export const mockCustomer = {
  id: '0',
  title: 'mock',
  description: 'mock',
  firstName: 'mock',
  lastName: 'mock',
  email: 'mock',
};

export const mockEmptyCustomer = {
  id: null,
  title: 'mockEmpty',
  description: 'mockEmpty',
  firstName: 'mockEmpty',
  lastName: 'mockEmpty',
  email: 'mockEmpty',
};
