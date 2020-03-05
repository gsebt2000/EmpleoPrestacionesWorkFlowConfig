import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../services/proyectos.service';
import * as vis from 'vis';



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

  
  constructor(private proy: ProyectosService) { 
     
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
    this.proy.getEstados('117')
                      .subscribe( (data: any) => {

                                                this.proy.getTareas('117')
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
                                                    params.event = "[original event]";
                                                    document.getElementById('eventSpan').innerHTML = '<h2>Estado:</h2>' + JSON.stringify(params.nodes, null, 4);
                                                    document.getElementById('eventSpan2').innerHTML = '<h2>Tarea:</h2>' + JSON.stringify(params.edges, null, 4);
                                                });

 



});
                    });
    
    
                          
    
// create an array with nodes





/*   var nodes = new vis.DataSet([
    {id: 1, label: 'Node 1'}, 
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'}
  ]); */

  //console.log('Nodes' + nodes);

  //var edges = new vis.DataSet(this.tareas);
 
  // create an array with edges
   /* var edges = new vis.DataSet([
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 5},
    {from: 3, to: 3}
  ]);  */
 
  // create a network
  //var container = document.getElementById('mynetwork');
  

  console.log('Hola');
  
 /*   var data = {
    nodes: this.nodes,
    edges: edges
  };  */
  //var options = {};
 

  }
  ngOnInit() {
  console.log('Hola');
  }

}
