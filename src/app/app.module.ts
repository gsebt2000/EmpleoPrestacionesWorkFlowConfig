import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { NgxPaginationModule} from 'ngx-pagination';
import * as $ from 'jquery';
import * as jQuery from 'jquery';


import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AltaComponent } from './components/proyectos/alta/alta.component';
import {GrillaComponent} from './components/grilla/grilla.component';
import {GrillaImpresionComponent} from './components/grilla/grilla-impresion/grilla-impresion.component';

// Rutas
import {APP_ROUTING} from './app.routes';

// Componentes
import { MenuComponent } from './components/menu/menu.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { GraficoComponent } from './components/grafico/grafico.component';
import { ExcelService } from './services/excel.service';
import { ImpresionService } from './services/impresion.service';
import { BsModalService } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
  //  NgxPaginationModule,
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AltaComponent,
    MenuComponent,
    TarjetasComponent,
    GraficoComponent,
    GrillaImpresionComponent,
    GrillaComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  
    APP_ROUTING
  ],
  providers: [  BsModalService,ExcelService,ImpresionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
