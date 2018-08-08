import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { storageKeys } from 'src/app/shared/models';
import { ErpApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  redirectUrl = '/customers';  // get it from auth-guard-service
  get isLoggedIn() {
    const userString = sessionStorage.getItem(storageKeys.user);
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
    sessionStorage.setItem(storageKeys.user, JSON.stringify(user));
  }

  // in case
  logout(): void {
    sessionStorage.removeItem(storageKeys.user);
  }

}
