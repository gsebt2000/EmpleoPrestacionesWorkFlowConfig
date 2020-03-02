
import {RouterModule, Routes} from '@angular/router';
import { AltaComponent } from './components/proyectos/alta/alta.component';

const APP_ROUTES: Routes = [

    { path: 'home', component: AltaComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
