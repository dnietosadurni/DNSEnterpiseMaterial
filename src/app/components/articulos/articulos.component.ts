import { Component, OnInit, Input } from '@angular/core';
import { ArticulosService } from '../../services/articulos.service';
import { Router } from '@angular/router';
import { ArticuloModel } from '../../models/articulo.model';

export interface Articulos {
  codigo: string;
  modelo: string;
  tipo: string;
  anio: number;
  marca: string;
}


@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})


export class ArticulosComponent implements OnInit {


  articulo;

  articulos: ArticuloModel[] = [];

  displayedColumns: string[] = ['codigo', 'modelo', 'tipo', 'anio', 'marca'];
  dataSource: ArticuloModel [] = [];


  constructor( private _articulosService: ArticulosService,
               private _route: Router ){
   }

  ngOnInit() {
    this._articulosService.getArticulos().subscribe( resp => {
      this.articulos = resp;
      this.dataSource = resp;
      this.ordenarArticulos( this.articulos );
    });
  }

  escogerArticuloMaterial( element: {} ) {
    this.articulo = element;
    this._route.navigate(['/articulo', this.articulo.id]);
  }

  ordenarArticulos( r) {
    r.sort( function(a, b) {
      return a.codigo - b.codigo;
    });
  }

}
