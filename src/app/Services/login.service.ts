import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private configUrl = 'https://smart-cart-dda58.firebaseio.com/user.json';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  private users;
  private loggedInUser;
  private isLoggedIn:boolean = false;
  constructor(private http: HttpClient, private router: Router) {
    this.getUsers().subscribe((users) => {
      this.users = users;
    })
  }
  authUser() {
    if (window.localStorage.getItem('user') !== null) {
      return this.isLoggedIn = true;
    } else {
      return this.isLoggedIn = false;
    }
  }
  getUsers() {
    return this.http.get(this.configUrl);
  }
  login(userObj) {
    this.loggedInUser = this.users.find(user => user.guid === userObj.guid);
    console.log(this.loggedInUser);
    if (this.loggedInUser) {
      window.localStorage.setItem('user', JSON.stringify(userObj));
      this.isLoggedIn = true;
      this.router.navigate(['/orders']);
    } else {
      alert('Incorrect User');
    }
  }
  logOut(){
    this.isLoggedIn = false;
    window.localStorage.clear();
    this.router.navigate(['/']);
  }
}
