import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '@bba/api-interfaces';
import { environment } from '@env/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  model = 'customers';

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<Customer[]>(this.getUrl());
  }

  find(id: string) {
    return this.http.get<Customer>(this.getUrlWithId(id));
  }

  create(customer: Customer) {
    return this.http.post(this.getUrl(), customer, { headers: headers });
  }

  update(customer: Customer) {
    return this.http.put(this.getUrlWithId(customer.id), customer, {
      headers: headers,
    });
  }

  delete(customer: Customer) {
    return this.http.delete(this.getUrlWithId(customer.id));
  }

  private getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  private getUrlWithId(id) {
    return `${this.getUrl()}/${id}`;
  }
}
