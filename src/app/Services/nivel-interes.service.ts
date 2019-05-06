import { Injectable } from '@angular/core';
import {ConnService} from './conn-service';
import { NivelInteres } from '../interfaces/nivel-interes.interface';
import {Http} from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NivelInteresService {

  nivelInteresURL: string = ConnService.servicesURL + 'nivelInteres';
  nivelesInteres: Array<NivelInteres>;

  constructor( private http: Http ) { }

  obtenerNivelesInteres( ) {

    return this.http.get( this.nivelInteresURL ).
    pipe(
      map(response => {
        return response.json();
      }));

  }

}
