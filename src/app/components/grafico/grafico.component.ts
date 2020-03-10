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

  //para la grilla
  public titulos;
  public titulosSaltos;
  public datos;
  public botones;
  public grilla: boolean;
  
  // Programa
   programa: string = "";

  
  constructor(private proy: ProyectosService) { 
     this.grilla = true;
/*     this.options = {
      layout: {
          randomSeed: 120,
          improvedLayout: true,
          hierarchical: {
              enabled: false,
              levelSeparation: 250,
              nodeSpacing: 5,
              treeSpacing: 200,
              blockShifting: true,
              edgeMinimization: true,
              parentCentralization: true,
              direction: 'RL',        // UD, DU, LR, RL
              sortMethod: 'hubsize'   // hubsize, directed
          }
      },
      edges: {
          arrows: {
              to: { enabled: true, scaleFactor: 1, type: 'arrow' },
              middle: { enabled: false, scaleFactor: 1, type: 'arrow' },
              from: { enabled: true, scaleFactor: 25, type: 'arrow' }
          },
          arrowStrikethrough: true,
          physics: false,
          font: {
              color: '#343434',
              size: 8, // px
              face: 'arial',
              background: 'none',
              //strokeWidth: 5, // px
              //strokeColor: '#f44ff',
              align: 'horizontal',
              multi: false,
          },
          scaling: {
              min: 1,
              max: 5,
              label: {
                  enabled: true,
                  min: 1,
                  max: 30,
                  maxVisible: 50,
                  drawThreshold: 8
              },
          }
      } 
  }*/

    
    this.proy.getEstados('1100')
                      .subscribe( (data: any) => {

                                                this.proy.getTareas('1100')
                                                 .subscribe( (data2: any) => {
                                                  const objData = JSON.parse(data2);
                                                  console.log ('Objetos', objData.EtapasResultados);

                                                  // tslint:disable-next-line:max-line-length
                                                  ////
                                                  const x= {pepe:""};

                                                  objData.EtapasResultados.forEach(element => {
                                                    // tslint:disable-next-line:max-line-length
                                                    this.DatosGraficosEstados.push({id: element.Etapa + '.' + element.Resultado, label: element.ResultadoDescripcion, group: element.Etapa });
                                                   // this.DatosGraficosTareas.push(id: , from: , to: , arrows , label);
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

        

                                                  this.container = document.getElementById('mynetwork');
                                                  this.network = new vis.Network(this.container, data3, this.options);
                                                  

                                                  this.network.on("click", function (params) {
                                                    let NodoActual = JSON.stringify(params.nodes, null, 4);
                                                    let TareaSeleccionada =params.edges[0];
                                                    params.event = "[original event]";
                                                    document.getElementById('eventSpan').innerHTML = '<h2>Estado:</h2>' + JSON.stringify(params.nodes, null, 4);
                                                    document.getElementById('eventSpan2').innerHTML = '<h2>Tarea:</h2>' + JSON.stringify(objData.Tareas[0].Validaciones,null,4);
                                                    var pos = objData.Tareas.indexOf("2.1_2.1");  
                                                    console.log ('TareaSeleccionada', params.edges[0]);            
                                                    //objData.Tareas.forEach(element => if (element.CambioEstado = '2.1_2.1') {console.log(element.cambioEstado)}


                                                    //objData.Tareas.forEach(element =>  console.log(element.CambioEstado.keys()));
                                                      
                                                    

                                                    const found = objData.Tareas.find(element => element.CambioEstado === TareaSeleccionada);

                                                    
                                                    document.getElementById('eventSpan2').innerHTML = '<h2>Tarea:</h2>' + JSON.stringify(found,null,4);

                                                    console.log('Tarea:' , found);



                                                    



                                                });

 



});
                    });
    
    

  }
  ngOnInit() {

  }

  obtenerPrograma(programaabuscar: string){
    //  let programaInput = $('#programaInput').val();
    if (programaabuscar != "") {
      
      this.programa = programaabuscar;
    }


    //  alert ( programaabuscar + ' progrma '+ this.programa);
      return;
    
     


  }

}
