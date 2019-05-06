import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  anio: String;

  constructor() {

    this.anio = new Date().getFullYear().toString();

  }

  ngOnInit() {
  }

}
