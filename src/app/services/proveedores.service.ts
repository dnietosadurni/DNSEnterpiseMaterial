import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProveedorModel } from '../models/proveedor.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProveedoresService {

  private url = 'https://proyectodani-b2b06.firebaseio.com/proveedores';

  constructor(private _http: HttpClient) { }

  altaProveedor(proveedor: ProveedorModel) {
    return this._http.post(`${this.url}.json`, proveedor);
  }

  actualizarProveedor(proveedor: ProveedorModel) {

    const proveedorProvisional = {
      ...proveedor
    };
    delete proveedorProvisional.id;

    return this._http.put(`${this.url}/${proveedor.id}.json`, proveedorProvisional);

  }

  getProveedores() {
    return this._http.get(`${this.url}.json`).pipe(map(this.crearArregloProveedores));
  }

  private crearArregloProveedores(proveedoresObj: object) {

    const proveedores: ProveedorModel[] = [];

    if (proveedoresObj === null) { return []; }

    Object.keys(proveedoresObj).forEach(key => {

      const proveedor: ProveedorModel = proveedoresObj[key];
      proveedor.id = key;

      proveedores.push(proveedor);
    });

    return proveedores;

  }

  getProveedor(codigo: string) {
    return this._http.get(`${this.url}/${codigo}.json`);
  }

  eliminarProveedor(id: string) {
    return this._http.delete(`${this.url}/${id}.json`);
  }

}

