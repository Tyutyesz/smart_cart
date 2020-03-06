import {Component} from '@angular/core';
import {LoginService} from './Services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly loggedIn: boolean;
  constructor(private loginService: LoginService, router: Router) {
    this.loggedIn = this.loginService.authUser();
    if (!this.loggedIn) {
      router.navigate(['/']);
    }
  }
}
