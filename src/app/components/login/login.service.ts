import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { ErpApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginKey = 'erp:user';
  redirectUrl = '/customers';  // get it from auth-guard-service
  get isLoggedIn() {
    const userString = sessionStorage.getItem(this.loginKey);
    if (userString === 'undefined') {
      return false;
    }
    const user = JSON.parse(userString);
    return !!(userString && user);
  }
  constructor(
    private api: ErpApiService,
  ) { }

  login(params) {
    return this.api.post(
      '/free-authentication/authentication',
      { ...params}
    );
  }

  storeLoggedIn(user: any) {
    sessionStorage.setItem(this.loginKey, JSON.stringify(user));
  }

  // in case
  logout(): void {
    sessionStorage.removeItem(this.loginKey);
  }

}
