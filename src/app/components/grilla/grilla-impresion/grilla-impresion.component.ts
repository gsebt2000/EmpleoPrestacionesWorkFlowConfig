import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ImpresionService} from './../../../services/impresion.service';
@Component({
  selector: 'app-grilla-impresion',
  templateUrl: './grilla-impresion.component.html',
  styleUrls: ['./grilla-impresion.component.scss']
})
export class GrillaImpresionComponent implements OnInit {
   public datos;
  constructor(route: ActivatedRoute,
    public impService: ImpresionService) {
      this.datos  = JSON.parse(route.snapshot.params['datos']);

    }

  ngOnInit() {
    this.impService.onDataReady();
  }

}
