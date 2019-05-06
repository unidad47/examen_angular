import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../Services/auth.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errorOcurred: boolean;

  constructor( private auth: AuthService ) {

    this.errorOcurred = false;

    this.form = new FormGroup( {
      email: new FormControl( '',
        [Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')],
        ),
      password: new FormControl( '',
        [ Validators.required,
                        Validators.minLength(10),
                        Validators.maxLength( 25 )] )
    } );

  }

  ngOnInit() {
  }

  login() {

    this.auth.login( this.form.value.email,
              this.form.value.password );
    setTimeout( () => {
      this.errorOcurred = ( this.auth.isAuthenticated() ) ? false : true;
    }, 1500 );


  }

}
