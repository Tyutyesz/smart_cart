import { Component, OnInit } from '@angular/core';
import {LoginService} from '../Services/login.service';
import {User} from '../Models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private users;
  private user:User;
  myForm: FormGroup;
  constructor(private loginService: LoginService, private fb: FormBuilder ) {

  }

  ngOnInit() {
    this.setUser();
    this.initForm();

    this.loginService.getUsers().subscribe(
      (users: Array<User>) => {
        this.users = users;
      }
    );
  }
  setUser() {
    let savedUser = JSON.parse(window.localStorage.getItem('user'));
    if (savedUser !== null) {
      this.user = savedUser;
    } else {
      this.user = {
        guid:'',
        name:'',
        email: '',
        orders: ''
      }
    }
  }
  initForm() {
    this.myForm = this.fb.group({
      name: [this.user.name, [
        Validators.required
      ]],
      password: [this.user.guid, [
        Validators.required,
        Validators.minLength(2)
      ]]
    })
  }
  loginAs(selectedUser) {
    this.user = selectedUser;
    this.myForm.setValue({
      name: this.user.name,
      password: this.user.guid
    });
    console.log(this.myForm);
  }
  login() {
    console.log(this.myForm.value);
    console.log(JSON.stringify(this.user));
  //  window.localStorage.setItem('user', JSON.stringify(this.user));
    this.loginService.login(this.user);
    console.log(this.users);
  }

  get password() {
    return this.myForm.get('password');
  }
  get name() {
    return this.myForm.get('name');
  }
}
