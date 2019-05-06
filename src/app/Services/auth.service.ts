import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import {ConnService} from './conn-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginURL: string = ConnService.servicesURL + 'login';

  constructor( private router: Router, private http: HttpClient ) { }

  isAuthenticated(): boolean {
     const authData = this.getAuthData();
     const now = new Date();
     const isInFuture = authData.expirationDate > now;
     if ( isInFuture ) {
       return true;
     }
     return false;
  }

  logout() {
    this.clearAuthData();
    this.router.navigate(['/'] );
  }

  login( email: string, password: string ) {

    const basic = this.generateBasic( email, password );
    // content-type: application/json
    const  headers = new  HttpHeaders().set('Authorization', ' Basic ' + basic);

    this.http.get( this.loginURL, {headers} ).subscribe( data => {

        // @ts-ignore
        if ( data.found ) {

          const now = new Date();
          const expirationDate = new Date(now.getTime() + 60 * 2 * 1000 );
          // @ts-ignore
          this.saveAuthData( basic, expirationDate, data.id );
          this.router.navigate(['/home'] );

        }

        return data;
        // this.router.navigate(['/home', data.id]);
      },
      error => { console.error( error ); } );



  }

  private saveAuthData( token: string, expeirationDate: Date, id: string ) {

    localStorage.setItem( 'token', token );
    localStorage.setItem( 'expiration', expeirationDate.toISOString() );
    localStorage.setItem( 'id', id );

  }

  private clearAuthData() {

    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'expiration' );
    localStorage.removeItem( 'id' );

  }

  private generateBasic( user: string, password: string ) {

    const basic = window.btoa(
                      unescape(
                        encodeURIComponent( `${user}:${password}` )
                      ));

    return `${basic}`;

  }

  getAuthData() {

    const token = localStorage.getItem( 'token' );
    const expirationDate = localStorage.getItem( 'expiration' );
    const id = localStorage.getItem( 'id' );

    return {
      token: token,
      expirationDate: new Date( expirationDate ),
      id: id
    }

  }
}
