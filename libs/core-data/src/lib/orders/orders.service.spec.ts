import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Order } from '@bba/api-interfaces';

import { OrdersService } from './orders.service';

import { mockOrder } from '@bba/testing';

describe('OrdersService', () => {
  const model = 'orders';
  let httpTestingController: HttpTestingController;
  let service: OrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(OrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should call http.', () => {
    it('get() on service.all()', () => {
      service.all().subscribe((res) => {
        expect(res).toEqual(mockOrder);
      });

      const req = httpTestingController.expectOne(service['getUrl']());
      req.flush([mockOrder]);
      httpTestingController.verify();
    });

    it('get(url(model.id)) on service.find(model.id)', () => {
      service.find(mockOrder.id).subscribe((res) => {
        expect(res).toEqual(mockOrder);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockOrder.id)
      );
      req.flush(mockOrder);
      httpTestingController.verify();
    });

    it('post(url, model) on service.create(model)', () => {
      service.create(mockOrder).subscribe((res) => {
        expect(res).toEqual(mockOrder);
      });

      const req = httpTestingController.expectOne(service['getUrl']());
      req.flush(mockOrder);
      httpTestingController.verify();
    });

    it('put(url(model.id), model) on service.create(model)', () => {
      service.update(mockOrder).subscribe((res) => {
        expect(res).toEqual(mockOrder);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockOrder.id)
      );
      req.flush(mockOrder);
      httpTestingController.verify();
    });

    it('delete(url(model.id)) on service.delete(model.id)', () => {
      service.delete(mockOrder).subscribe((res) => {
        expect(res).toEqual(mockOrder);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockOrder.id)
      );
      req.flush(mockOrder);
      httpTestingController.verify();
    });
  });
});
