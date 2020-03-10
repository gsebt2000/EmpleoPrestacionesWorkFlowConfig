import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../services/proyectos.service';
import * as vis from 'vis';
import * as jQuery from 'jquery';

// para usar jquery
declare var $: any;
@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']


})


export class GraficoComponent implements OnInit {
  
  estados: any[] = [];
  tareas: any[] = [];
  nodes;
  edges;
  data: any[] = [{}];
  options = {};
  network;
  container;
  DatosGraficosEstados = [];
  DatosGraficosTareas = [];
  datos;
  public found: any;
  //para la grilla
  public titulos = [];
  public titulosSaltos = [];

  public botones;
  public grilla: boolean;
  public xx:any;
  
  constructor(private proy: ProyectosService) { 
     this.grilla = true;
     this.titulos = ['CambioEstado','Descripcion'];
     this.datos = [{CambioEstado:"dfasdfasf",descripcion:"fdsda"}]
     this.xx = this;
    this.proy.getEstados('1100')
                      .subscribe( (data: any) => this.grafica(data)  );


  }
  ngOnInit() {

  }

  grafica(data){

    this.proy.getTareas('1100')
      .subscribe( (data2: any) => this.traeTareas(data2) );
  }

  traeTareas(data2){
    const objData = JSON.parse(data2);
    console.log ('Objetos', objData.EtapasResultados);


    const x= {pepe:""};

    objData.EtapasResultados.forEach(element => {
      this.DatosGraficosEstados.push({id: element.Etapa + '.' + element.Resultado, label: element.ResultadoDescripcion, group: element.Etapa });
    });
    console.log('datosgraficos', this.DatosGraficosEstados);

    objData.Tareas.forEach(element => {
      // tslint:disable-next-line:max-line-length
      this.DatosGraficosTareas.push({id: element.CambioEstado, from: element.Etapa + '.' + element.Resultado , to: element.ProxEtapa + '.' + element.ProxResultado, arrows:'to' , label: element.CambioEstado});
    });

    this.nodes = new vis.DataSet(this.DatosGraficosEstados); 
    this.edges = new vis.DataSet(this.DatosGraficosTareas);
    const data3 = {
      nodes: this.nodes,
      edges: this.edges
    };
    console.log(data3);

    //creando esquema de grafico


    $("<div>", {
      class: "row p-0",
    id:"grafico"})
      .appendTo("#page-content-wrapper"); 

      

      $("<div>", {
        id: "mynetwork",
        class:"col-lg-7 col-sm-12 "})
        .appendTo("#grafico"); 


    $("<div>", {
        id: "eventSpan",
      class:"col-lg-2 center-block  col-sm-12 "
      })
        .appendTo("#grafico"); 

    $("<div>", {
          id: "eventSpan2",
          class:"col-lg-2  col-sm-12 "})
          .appendTo("#grafico"); 

    this.container = document.getElementById('mynetwork');
    this.network = new vis.Network(this.container, data3, this.options);

  }
  ngOnInit() {

    this.network.on("click", (params:any) => this.muestraTareas (params,objData) );



    //  alert ( programaabuscar + ' progrma '+ this.programa);
      return;
    
     

}

muestraTareas(params,objData){
  let NodoActual = JSON.stringify(params.nodes, null, 4);
  let TareaSeleccionada =params.edges[0];
  params.event = "[original event]";
  document.getElementById('eventSpan').innerHTML = '<h2>Estado:</h2>' + JSON.stringify(params.nodes, null, 4);
  document.getElementById('eventSpan2').innerHTML = '<h2>Tarea:</h2>' + JSON.stringify(objData.Tareas[0].Validaciones,null,4);
  var pos = objData.Tareas.indexOf("2.1_2.1");  
  console.log ('TareaSeleccionada', params.edges[0]);            
  //objData.Tareas.forEach(element => if (element.CambioEstado = '2.1_2.1') {console.log(element.cambioEstado)}


  //objData.Tareas.forEach(element =>  console.log(element.CambioEstado.keys()));
    
  

    this.found = objData.Tareas.find(element => element.CambioEstado === TareaSeleccionada);

  this.datos.push({CambioEstado:"dfasdfasf",descripcion:"fdsda"},{CambioEstado:"dfasdfasf",descripcion:"fdsda"});
  document.getElementById('eventSpan2').innerHTML = '<h2>Tarea:</h2>' + JSON.stringify(this.found,null,4);

  console.log('Tarea:' , this.found);

                  }
}
