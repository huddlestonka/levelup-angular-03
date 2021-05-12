import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '@bba/api-interfaces';
import { environment } from '@env/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  model = 'orders';

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<Order[]>(this.getUrl());
  }

  find(id: string) {
    return this.http.get<Order>(this.getUrlWithId(id));
  }

  create(order: Order) {
    return this.http.post(this.getUrl(), order, { headers: headers });
  }

  update(order: Order) {
    return this.http.put(this.getUrlWithId(order.id), order, {
      headers: headers,
    });
  }

  delete(order: Order) {
    return this.http.delete(this.getUrlWithId(order.id));
  }

  private getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  private getUrlWithId(id) {
    return `${this.getUrl()}/${id}`;
  }
}
