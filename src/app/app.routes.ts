
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AltaComponent } from './components/proyectos/alta/alta.component';
import { GraficoComponent } from './components/grafico/grafico.component';


const APP_ROUTES: Routes = [

    { path: 'home', component: HomeComponent },
    { path: 'grafico', component: GraficoComponent },

    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
