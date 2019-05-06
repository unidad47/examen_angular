import { Injectable } from '@angular/core';
import {ConnService} from './conn-service';
import {Genero} from '../interfaces/genero.interface';
import {Http} from '@angular/http';
import {map} from 'rxjs/operators';
import {EstadoCivil} from '../interfaces/edo-civil.interface';

@Injectable({
  providedIn: 'root'
})
export class EdoCivilService {

  edoCivilURL: string = ConnService.servicesURL + 'estadoCivil';
  estados: Array<EstadoCivil>;

  constructor( private http: Http ) { }

  obtenerEdosCiviles( ) {

    return this.http.get( this.edoCivilURL ).
    pipe(
      map(response => {
        return response.json();
      }));

  }
}
