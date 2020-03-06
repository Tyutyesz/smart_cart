import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from '../Models/order';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private configUrl = 'https://smart-cart-dda58.firebaseio.com';
  private orders: Array<Order>;
  private product;
  constructor(private http: HttpClient) {

  }
  getOrdersList() {
    return this.http.get(`${this.configUrl}/orders.json`);
  }
  getProducts() {
    return this.http.get(`${this.configUrl}/products.json`);
  }
}
