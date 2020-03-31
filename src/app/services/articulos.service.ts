import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ArticuloModel } from '../models/articulo.model';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  private url = 'https://proyectodani-b2b06.firebaseio.com/articulos';

  constructor( private _http: HttpClient ) {}

  getArticulos () {
    return this._http.get(`${ this.url }.json`).pipe( map(  this.crearArregloArticulos ));
  }

  private crearArregloArticulos( articulosObj: object ) {

    const articulos: ArticuloModel[] = [];

    if( articulosObj === null) { return []; }

    Object.keys( articulosObj).forEach( key => {

      const articulo: ArticuloModel = articulosObj[key];
      articulo.id = key;

      articulos.push(articulo);
    });

    return articulos;
  }

  getArticulo( codigo: string ) {
    return this._http.get(`${ this.url }/${codigo}.json`);
  }

  altaArticulo ( articulo: ArticuloModel ) {
    return this._http.post(`${ this.url}.json`, articulo);
  }

  actualizarArticulo( articulo: ArticuloModel ) {
    const articuloProvisional = {
      ...articulo
    };
    delete articuloProvisional.id;
    return this._http.put(`${ this.url }/${ articulo.id}.json`, articuloProvisional);
  }

}


