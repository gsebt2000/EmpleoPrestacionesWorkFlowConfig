import { Component, OnInit, Input, OnChanges, SimpleChanges, TemplateRef} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import {ExcelService} from './../../services/excel.service';
import {ImpresionService} from './../../services/impresion.service';

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
  public detalleMostrar = {datos: [], titulos: [], titulosGlobales: []};

  constructor( private excelService: ExcelService,
               public impService: ImpresionService,
               public modalService: BsModalService) { }

  ngOnInit() {
    if (this.exportaExcell === undefined) { this.exportaExcell = true}
    if (this.imprime === undefined) { this.imprime = true}
  }

  ngOnChanges(changes: SimpleChanges) {}

  getTitulosNivel(nivel, titulos?) {
    if (!titulos) {titulos = this.titulos; }

    nivel.titulos = this.getTitulos(nivel[0], titulos, this.titulosSaltos);
    return nivel.titulos.length > 0;
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
  setNivel2(elemento: any) {
        const xTit = this.getColumnasSaltos(this.titulosSaltos);

       if (!elemento.subnivel) {
        const subnivel = Object.entries(elemento).filter(function(x) {
          return (xTit.indexOf( x[0]) === -1) &&  Array.isArray(x[1]);
         });
         if (subnivel.length > 0) {
            elemento.subnivel = subnivel[0][1];
           for (let i = 0; i >  elemento.subnivel.length; i++) {  elemento.subnivel.detalle = true; }
         }
      }
    return elemento.subnivel;
  }
  setDetalle(elemento: any, subnivel: any) {
    elemento.detalle = !elemento.detalle;
  }
    mostrarDetalle(elemento: any, detalle: any, xTitulo: string, template: TemplateRef<any>) {
      const initialState = {titulo: xTitulo};
      this.modalRef = this.modalService.show( template, Object.assign({}, { class: 'modal-dialog modal-lg', initialState })); 

    }
    cerrarDetalle() {
      this.detalleMostrar = {datos: [], titulos: [], titulosGlobales: []};
      this.modalRef.hide();
    }
  Imprimir(): void {
    this.getTitulosNivel(this.datos);
    this.impService.encabezado = 'Pedido';
    this.impService.printDocument('impresionGrilla', JSON.stringify({datos: this.datos, titulos: this.datos.titulos}));
  }

  ExportarExcel(): void {
    this.excelService.exportAsExcelFile(this.datos, 'Legajo Resumen');
  }
}
