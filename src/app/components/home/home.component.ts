import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../services/proyectos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {


  constructor(private proy: ProyectosService ) {
  }

 

  ngOnInit() {
  }

}
