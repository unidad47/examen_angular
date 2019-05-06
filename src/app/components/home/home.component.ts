import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prospecto } from '../../interfaces/prospecto.interface';
import { AuthService } from '../../Services/auth.service';
import { ProspectoService } from '../../Services/prospecto.service';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  prospecto: Prospecto;

  constructor( private router: Router,
               private auth: AuthService,
               private prospectoService: ProspectoService ) {

    const authData = auth.getAuthData();
    this.obtenerProspecto( authData.id, authData.token );
  }

  ngOnInit() {
  }

  obtenerProspecto( id: string, token: string ) {

    this.prospectoService.obtenerProspecto( id, token ).subscribe(

      data => {
        this.prospecto = Utils.convertirACamelCase( [data] ).pop();
      }

    );

  }

}
