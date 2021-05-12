import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Customer } from '@bba/api-interfaces';

import { CustomersService } from './customers.service';

import { mockCustomer } from '@bba/testing';

describe('CustomersService', () => {
  const model = 'customers';
  let httpTestingController: HttpTestingController;
  let service: CustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should call http.', () => {
    it('get() on service.all()', () => {
      service.all().subscribe((res) => {
        expect(res).toEqual(mockCustomer);
      });

      const req = httpTestingController.expectOne(service['getUrl']());
      req.flush([mockCustomer]);
      httpTestingController.verify();
    });

    it('get(url(model.id)) on service.find(model.id)', () => {
      service.find(mockCustomer.id).subscribe((res) => {
        expect(res).toEqual(mockCustomer);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockCustomer.id)
      );
      req.flush(mockCustomer);
      httpTestingController.verify();
    });

    it('post(url, model) on service.create(model)', () => {
      service.create(mockCustomer).subscribe((res) => {
        expect(res).toEqual(mockCustomer);
      });

      const req = httpTestingController.expectOne(service['getUrl']());
      req.flush(mockCustomer);
      httpTestingController.verify();
    });

    it('put(url(model.id), model) on service.create(model)', () => {
      service.update(mockCustomer).subscribe((res) => {
        expect(res).toEqual(mockCustomer);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockCustomer.id)
      );
      req.flush(mockCustomer);
      httpTestingController.verify();
    });

    it('delete(url(model.id)) on service.delete(model.id)', () => {
      service.delete(mockCustomer).subscribe((res) => {
        expect(res).toEqual(mockCustomer);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockCustomer.id)
      );
      req.flush(mockCustomer);
      httpTestingController.verify();
    });
  });
});
