import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  private activationCount: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.activationCount++;
    // if you dont use "CanActivateChild", CanActivate method is not called when the user is already inside /admin, and moves between its children routes
    console.log('CanActivate has been called ' + this.activationCount + ' times')
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): true|UrlTree {
    if (this.authService.isLoggedIn)
      return true

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url

    // Redirect to the login page
    return this.router.parseUrl('/login')
  }
  
}
