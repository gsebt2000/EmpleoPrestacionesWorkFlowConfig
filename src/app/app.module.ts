import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AltaComponent } from './components/proyectos/alta/alta.component';

import {APP_ROUTING} from './app.routes';
import { MenuComponent } from './components/menu/menu.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { GraficoComponent } from './components/grafico/grafico.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AltaComponent,
    MenuComponent,
    TarjetasComponent,
    GraficoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
