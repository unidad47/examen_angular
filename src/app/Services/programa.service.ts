import { Injectable } from '@angular/core';
import { ConnService } from './conn-service';
import { Programa } from '../interfaces/programa.interface';
import {Http} from '@angular/http';
import {map} from 'rxjs/operators';
import {Utils} from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  get licenciaturas(): Array<Programa> {
    return this._licenciaturas;
  }

  get posgrados(): Array<Programa> {
    return this._posgrados;
  }

  private nivelLic: number = 2;
  private nivelPost: number = 3;

  private _licenciaturas: Array<Programa>;
  private _posgrados: Array<Programa>;

  programaURL: string = ConnService.servicesURL + 'programa';
  private programas: Array<Programa>;

  constructor( private http: Http ) { }

  obtenerProgramas( ) {

    return this.http.get( this.programaURL ).
    pipe(
      map(response => {
        return response.json();
      }));

  }

  obtenerLicenciaturas( callback ) {

    this.obtenerProgramas().subscribe(

      data => {

        const licenciaturas = data.filter(licenciatura =>
                licenciatura.nivel_interes_id == this.nivelLic );
        callback( licenciaturas );
      }

    );

  }

  obtenerProsgrados( callback ) {

    this.obtenerProgramas().subscribe(

      data => {

        const posgrados = data.filter(posgrado =>
          posgrado.nivel_interes_id == this.nivelPost );
        callback( posgrados );

      }

    );

  }


}
