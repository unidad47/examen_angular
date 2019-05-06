import { Injectable } from '@angular/core';
import { ConnService } from './conn-service';
import { Http} from '@angular/http';

import {map} from 'rxjs/operators';
import {forEach} from '@angular/router/src/utils/collection';
import {Genero} from '../interfaces/genero.interface';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  generoURL: string = ConnService.servicesURL + 'genero';
  generos: Array<Genero>;

  constructor( private http: Http ) { }

  obtenerGeneros( ) {

    return this.http.get( this.generoURL ).
                  pipe(
                    map(response => {
                      return response.json();
                    }));

  }

}
