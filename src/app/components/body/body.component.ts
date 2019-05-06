import { Component } from '@angular/core';
import {NgForm, FormGroup, FormControl, Validator} from '@angular/forms';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }
    `]
})
export class BodyComponent {

  forma: FormGroup;

  prospecto = {
    nombre: null,
    apellidoPaterno: null,
    apellidoMaterno: null,
    edad: null,
    email: null,
    password: null,
    generoId: null,
    estadoCivilId: null,
    nivelId: null,
    programaId: null
  };

  constructor() {

  }

  guardar( ) {


  }
}
