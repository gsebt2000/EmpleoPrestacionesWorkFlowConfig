import { Component, Input } from '@angular/core';
import { ProyectosService } from '../../services/proyectos.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  {

  @Input() menu: any = {};

  submenu: any = {};

  constructor() {
    //private proy: ProyectosService 
    console.log('ver');
    console.log(this.menu);
        //this.proy.getPermisosUsuarios(this.menu)
          //            .subscribe( (data: any) => {console.log(data);
           //           this.submenu = data;
           //         });
                  }


}

