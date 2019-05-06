import { Injectable } from '@angular/core';
import {  Router,
          ActivatedRouteSnapshot,
          RouterStateSnapshot,
          CanActivate } from '@angular/router';

import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( private auth: AuthService,
               private router: Router) { }

  canActivate( next: ActivatedRouteSnapshot,
               state: RouterStateSnapshot ) {

    if ( this.auth.isAuthenticated() ) {

    } else {
      this.router.navigate(['login']);
    }

    return this.auth.isAuthenticated();

  }

}
