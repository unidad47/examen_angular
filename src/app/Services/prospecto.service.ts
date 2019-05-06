import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Prospecto} from '../interfaces/prospecto.interface';
import { ConnService } from './conn-service';
import 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProspectoService {

  constructor( private http: Http, private httpClient: HttpClient ) { }

  prospectoURL: string = ConnService.servicesURL + 'prospecto';

  _crearProspecto( prospecto ) {

    return this.httpClient.
            post(this.prospectoURL, prospecto);

  }

  crearProspecto( prospecto: Prospecto ) {

    const body = JSON.stringify( prospecto );
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post( this.prospectoURL, body, { headers } ).
                        pipe(
                          map(response => {
                            return response.json();
                          }));

  }

  obtenerProspecto( id: string, token: string ) {

    const  headers = new  HttpHeaders().set('Authorization',
                                            ' Basic ' + token);

    return this.httpClient.get( `${this.prospectoURL}/${id}`,
                        { headers }  );

  }

}
