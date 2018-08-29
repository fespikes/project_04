import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';

import { LoginService } from './components/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    // if (this.loginService.isLoggedIn) {
      return true;
    // } else {
    //   // Store the attempted URL for redirecting
    //   this.loginService.redirectUrl = url;

    //   // Navigate to the login page with extras
    //   this.router.navigate(['/login']);
    //   return false;
    // }
  }

}

