import { Component, OnInit } from '@angular/core';
import {User} from '../Models/user';
import {DataService} from '../Services/data.service';
import {Order} from '../Models/order';
import {LoginService} from '../Services/login.service';
import {Product} from '../Models/product';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  private user: User;
  private userProducts = [];
  private order: Order;
  private orders: Array<Order>;
  private products: Array<Product>;
  constructor(private dataService:DataService, private loginService:LoginService) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.dataService.getOrdersList().subscribe((orders: Array<Order>) => {
      this.orders = orders;
    });
  }
  formatPrice(product) {
    return product.price.replace(' Ft-tól', '');
  }
  getUserProduct() {
    this.userProducts = [];
    let product;
    this.order.items.forEach((item) => {
      for (let i = 0; i < this.products.length; i +=1 ) {
        if (this.products[i].id === item) {
          product = this.products[i];
          product.price = this.formatPrice(product);
          this.userProducts.push(this.products[i])
        }
      }
    });
  }
  getProducts() {
    this.dataService.getProducts().subscribe((products: Array<Product>) => {
      this.products = products;
      this.getUserProduct()
    })
  }
  getOrder(selectedOrder) {
    this.order = this.orders.find(order => order.id === selectedOrder);
    this.getProducts();
  }
  logOut() {
    this.loginService.logOut();
  }

}
