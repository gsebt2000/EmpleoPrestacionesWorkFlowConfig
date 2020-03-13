import { Component, OnInit, Input, OnChanges, SimpleChanges, TemplateRef} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import {ExcelService} from './../../services/excel.service';
import {ImpresionService} from './../../services/impresion.service';
import {getTitulos,makeid,filtraColumnas} from './funciones';
// import {getTitulos, getColumnasSaltos} from './../../_funciones/funciones';
@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.css']
})
export class GrillaComponent implements OnInit, OnChanges {

  @Input() public datos: any;
  @Input() public titulos: any;
  @Input() public titulosSaltos: any;
  @Input() public botones: any;
  @Input() public objService: any;
  @Input() public exportaExcell: boolean;
  @Input() public imprime: boolean;

  private modalRef: BsModalRef;
  paginaActual: number;
  public pruebaArr:any;
  public detalleMostrar = {datos: [], titulos: [], titulosGlobales: []};
  public tablaId: string;
  public p: number[] = [];
  constructor( private excelService: ExcelService,
               public impService: ImpresionService,
               public modalService: BsModalService) {
                this.tablaId = makeid(5);
                
                }

  ngOnInit() {
    if (this.exportaExcell === undefined) { this.exportaExcell = true}
    if (this.imprime === undefined) { this.imprime = true}

  }

  ngOnChanges(changes: SimpleChanges) {

  }


  getTitulosNivel(nivel, titulos?) {
    nivel.titulos= [];
    nivel.titulos.titulos= [];
    if (nivel.length> 0){
      if (!titulos) {titulos = Object.keys(nivel[0]); }

      nivel.titulos = getTitulos(nivel[0], titulos, []);
    }
    return nivel.titulos.titulos.length > 0;
  }

  clickEvent(funcion ){
    
    funcion()
  }
  getTitulos(Datos: any[], titulos: string[], saltos: string[]){
    return titulos;
  }

  getColumnasSaltos(titulos: string[]): string[]{

      return [];
  }

  setDetalle(elemento: any, subnivel: any) {
    elemento.detalle = !elemento.detalle;
  }
    mostrarDetalle(elemento: any, campo: any, xTitulo: string, template: TemplateRef<any>) {
      const initialState = {titulo: xTitulo};
      this.detalleMostrar.datos = elemento[campo];
      this.detalleMostrar.titulosGlobales = Object.keys(elemento[campo][0]);
      this.modalRef = this.modalService.show( template, Object.assign({}, { class: 'modal-dialog modal-lg', initialState })); 

    }
    cerrarDetalle() {
      this.detalleMostrar = {datos: [], titulos: [], titulosGlobales: []};
      this.modalRef.hide();
    }

    muestraModal(elemento: any, detalle: any, titulo: any){
      let muestra = false;
      if (detalle ){
        if (detalle.length > 0){
          muestra = elemento[detalle[0].Lista].length > 0;
        }

      }
      return muestra;
    }
    isArray(campo:any, elemento:any){
      let result = 0;
      if (Array.isArray(elemento[campo])){result = elemento[campo].length;}
      return  result;
    }
  Imprimir(): void {
    this.getTitulosNivel(this.datos);
    this.impService.encabezado = 'Pedido';
    this.impService.printDocument('impresionGrilla', JSON.stringify({datos: this.datos, titulos: this.datos.titulos}));
  }

  ExportarExcel(datos, titulos, titulo): void {
    titulo = titulo === undefined ? 'Datos' : titulo;
    this.excelService.exportAsExcelFile(filtraColumnas(datos, titulos), titulos);
  }
}
