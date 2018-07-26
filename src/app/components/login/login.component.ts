import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

@Component({
  selector: 'erp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    private service: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(user: string, password: string): void {
    this.service.login({
      name: user,
      password: password
    }).subscribe(
      (res) => {
        if (this.service.isLoggedIn) {
          // Get the redirect URL from our auth service
          const redirect = this.service.redirectUrl;
          this.router.navigate([redirect]);
        }

        this.service.storeLoggedIn(res.user);
        this.router.navigate(['/']);
      },
      _ => _);
  }

  logout() {
    this.service.logout();
  }

}
