import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor( public auth: AuthService ,
               private router: Router) {

  }

  logout() {

    this.auth.logout();

  }

}
