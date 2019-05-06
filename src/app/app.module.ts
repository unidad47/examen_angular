import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


import { APP_ROUTING } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';

import { ProspectoService } from './Services/prospecto.service';
import { EdoCivilService } from './Services/edo-civil.service';
import { GeneroService } from './Services/genero.service';
import { NivelInteresService } from './Services/nivel-interes.service';
import { ProgramaService } from './Services/programa.service';
import { AuthService } from './Services/auth.service';
import { AuthGuardService } from './Services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    HomeComponent,
    RegistroComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    APP_ROUTING
  ],
  providers: [
    ProspectoService,
    EdoCivilService,
    GeneroService,
    NivelInteresService,
    ProgramaService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
