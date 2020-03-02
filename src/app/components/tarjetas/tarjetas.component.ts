import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../services/proyectos.service';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent {

  permisos: any[] = [];
  submenues: any[] = [];
  
  constructor(private proy: ProyectosService ) {
/*      this.proy.getPermisosUsuarios('MenuProyecto')
                      .subscribe( (data: any) => {console.log(data);
                      this.permisos = data;
                      console.log(this.permisos);
                    }); */
  }
  submenu(dato) {
/*     console.log(dato.Item);
      this.proy.getPermisosUsuarios(dato.Item)
      .subscribe( (data: any) => {console.log(data.Item);
      this.submenues = data;
    console.log(this.submenues);
  }); */
}

}
