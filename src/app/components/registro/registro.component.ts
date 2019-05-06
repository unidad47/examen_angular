import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProspectoService } from '../../Services/prospecto.service';
import { GeneroService } from '../../Services/genero.service';
import { EdoCivilService } from '../../Services/edo-civil.service';
import { NivelInteresService } from '../../Services/nivel-interes.service';
import { ProgramaService } from '../../Services/programa.service';
import { AuthService } from '../../Services/auth.service';

import { Prospecto } from '../../interfaces/prospecto.interface';
import { Genero } from '../../interfaces/genero.interface';
import { EstadoCivil } from '../../interfaces/edo-civil.interface';
import { NivelInteres } from '../../interfaces/nivel-interes.interface';
import { Programa } from '../../interfaces/programa.interface';

import { Observable } from 'rxjs';
import {Utils} from '../../utils/utils';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  form: FormGroup;
  mostrarProgramas: boolean = false;
  mostrarLic: boolean = false;
  mostrarPos: boolean = false;

  controlProgramas: object = [{}];

  prospecto: Prospecto = {
    id: 0,
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    edad: null,
    email: '',
    password: '',
    generoId: 0,
    estadoCivilId: 0,
    nivelId: 0,
    programaId: 0,
    licenciaturaId: 0,
    postgraduateId: 0,
    confirmarPassword: ''
  };

  generos: Array<Genero> = [{
    id: 1,
    etiquetaGenero: 'Masculino'
  }];

  estadosCiviles: Array<EstadoCivil> = [{
    id: 1,
    etiquetaEdoCivil: 'Soltero'
  }];

  nivelesInteres: Array<NivelInteres> = [{
    id: 1,
    etiquetaNivelInt: 'Licenciatura'
  }];

  programasLic: Array<Programa> = [{
    id: 1,
    etiquetaPrograma: 'Lic. en admón',
    nivelId: 1
  }];

  programasPos: Array<Programa> = [{
    id: 1,
    etiquetaPrograma: 'Pos. en admón',
    nivelId: 2
  }];

  constructor( private _prospectoService: ProspectoService,
               private _generoService: GeneroService,
               private _edoCivilService: EdoCivilService,
               private _nivelesInteresService: NivelInteresService,
               private _programaService: ProgramaService,
               private router: Router,
               private auth: AuthService ) {

    this.form = new FormGroup({
      nombre: new FormControl('',
          [Validators.required,
                          Validators.minLength(2),
                          Validators.maxLength( 60 )] ),
      apellidoPaterno: new FormControl('',
          [Validators.required,
                          Validators.minLength(2),
                          Validators.maxLength( 60 )] ),
      apellidoMaterno: new FormControl('',
          [Validators.required,
                          Validators.minLength(2),
                          Validators.maxLength( 60 )] ),
      generoId: new FormControl('',
          [Validators.pattern('[1-9]+')] ),
      edad: new FormControl('',
          [Validators.required,
                          Validators.pattern( '[0-9]{2,3}' ),
                          Validators.min( 10 ),
                          Validators.max( 150 )] ),
      estadoCivilId: new FormControl('',
          [Validators.pattern('[1-9]+')] ),
      email: new FormControl('',
          [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')],
            [this.existeEmail]),
      password: new FormControl('',
          [Validators.required,
                          Validators.minLength(10),
                          Validators.maxLength( 25 )] ),
      confirmarPassword: new FormControl('',
          [ ] ),
      nivelId: new FormControl('',
          [Validators.pattern('[1-9]+')] ),
      licenciaturaId: new FormControl('',
          [Validators.required] ),
      postgraduateId: new FormControl('',
          [Validators.required] ),
      id: new FormControl( ),
      programaId: new FormControl( '',[])
    });

    this.form.controls.confirmarPassword.
          setValidators([ Validators.required, this.noIgual ]);

    this.form.setValue( this.prospecto );

    const licenciaturaId = this.form.get('licenciaturaId');
    const postgraduateId = this.form.get('postgraduateId');

    this.form.controls.nivelId.valueChanges.subscribe( data => {

      this.mostrarProgramas = true;

      switch ( data ) {
        case '0':
        case '1':
          this.mostrarLic = false;
          this.mostrarPos = false;
          licenciaturaId.setValidators(null);
          postgraduateId.setValidators(null);
          break;
        case '2':
          this.mostrarLic = true;
          this.mostrarPos = false;
          licenciaturaId.setValidators([Validators.pattern('[1-9]+')]);
          postgraduateId.setValidators(null);
          break;
        case '3':
          this.mostrarLic = false;
          this.mostrarPos = true;
          licenciaturaId.setValidators(null);
          postgraduateId.setValidators([Validators.pattern('[1-9]+')]);
          break;
      }
    } );

    this.form.valueChanges.subscribe(() => {

      this.prospecto = this.form.value;
      this.mostrarProgramas = true;

      switch ( this.prospecto.nivelId.toString() ) {
        case '0':
        case '1':
          this.prospecto.programaId = 5;
          break;
        case '2':
          this.prospecto.programaId = this.prospecto.licenciaturaId;
          break;
        case '3':
          this.prospecto.programaId = this.prospecto.postgraduateId;
          break;
      }
    });

    this.cargarCombos();

  }

  ngOnInit() {
  }



  guardar( ) {

    this.form.setValue( this.prospecto );
    this.prospecto = this.form.value;
    this.enviarProspecto( this.form.value );

  }


  noIgual = ( control: FormControl ) => {

                if ( control.value !==  this.form.controls.password.value ) {

                      return {
                        noiguales: true
                      };
                  }

                return null;

            }

  existeEmail = ( control: FormControl ): Promise<any>|Observable<any> => {

      const promesa = new Promise(
        ( resolve, reject ) => {
          setTimeout( () => {
            if ( control.value === 'osornio@live.com' ) {
              resolve( { existe: true } );
            } else {
              resolve( null );
            }
          }, 1000 );
        }
      );

      return promesa;

  }

  cargarCombos() {

    this.cargarGeneros();
    this.cargarEdosCiviles();
    this.cargarNivelesInteres();
    this.cargarLicenciaturas();
    this.cargarPosgrados();

  }

  cargarGeneros() {

    this._generoService.obtenerGeneros().subscribe(

      data => {

        this.generos = Utils.convertirACamelCase( data );

      }

    );

  }

  cargarEdosCiviles() {

    this._edoCivilService.obtenerEdosCiviles().subscribe(

      data => {

        this.estadosCiviles = Utils.convertirACamelCase( data );

      }

    );

  }

  cargarNivelesInteres() {

    this._nivelesInteresService.obtenerNivelesInteres().subscribe(

      data => {

        this.nivelesInteres = Utils.convertirACamelCase( data );

      }

    );

  }

  cargarLicenciaturas( ) {

    this._programaService.obtenerLicenciaturas(
                    ( licenciaturas ) => {
                              this.programasLic =
                                    Utils.convertirACamelCase( licenciaturas );
                            } );

  }

  cargarPosgrados( ) {

    this._programaService.obtenerProsgrados(
      ( posgrados ) => {
        this.programasPos =
          Utils.convertirACamelCase( posgrados );
      } );

  }

  enviarProspecto( prospecto ) {
    this._prospectoService.
          _crearProspecto( prospecto ).
          subscribe( data => {
            this.auth.login( prospecto.email, prospecto.password );
            this.router.navigate(['home'] );

        },
          error => console.error( error ));
  }

}
