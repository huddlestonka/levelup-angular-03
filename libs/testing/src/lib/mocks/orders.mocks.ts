import { Order } from '@bba/api-interfaces';
import { of } from 'rxjs';

export const mockOrdersFacade = {
  loadOrders: () => {},
  selectOrder: () => {},
  deleteOrder: () => {},
  updateOrder: () => {},
  createOrder: () => {},
  mutations$: of(true),
};

export const mockOrdersService = {
  all: () => of([]),
  find: () => of({ ...mockOrder }),
  create: () => of({ ...mockOrder }),
  update: () => of({ ...mockOrder }),
  delete: () => of({ ...mockOrder }),
};

export const mockOrder = {
  id: '0',
  title: 'mock',
  description: 'mock',
  customerId: 'mock',
};

export const mockEmptyOrder = {
  id: null,
  title: 'mockEmpty',
  description: 'mockEmpty',
  customerId: 'mockEmpty',
};
