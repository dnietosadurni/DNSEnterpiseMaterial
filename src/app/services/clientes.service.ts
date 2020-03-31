import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteModel } from '../models/cliente.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private url = "https://proyectodani-b2b06.firebaseio.com";
  
  constructor( private _http: HttpClient) { }

  crearCliente( cliente: ClienteModel) {

    return this._http.post(`${ this.url }/clientes.json`, cliente).pipe(
      map( (resp: any) => {
        cliente.codigo = resp.name;
        return cliente;
      })
    );
  }

  actualizarCliente( cliente: ClienteModel) {

    const clienteProvisional = {
      ...cliente
    };

    delete clienteProvisional.codigo;

    return this._http.put(`${ this.url }/clientes/${ cliente.codigo }.json`, clienteProvisional);
  }

  getClientes() {
    return this._http.get(`${ this.url }/clientes.json`).pipe( 
      map( this.crearArregloClientes ),
    );
  }

  private crearArregloClientes( clientesObj: object) {

    const clientes: ClienteModel[] = [];

    if ( clientesObj === null ) { return []; }
    
    Object.keys( clientesObj ).forEach( key => {

      const cliente: ClienteModel = clientesObj[key];
      cliente.codigo = key;

      clientes.push(cliente);
    });
    

    return clientes;
  }

  getCliente( codigo: string ) {
    return this._http.get(`${ this.url }/clientes/${ codigo }.json`);
  }

  eliminarCliente( codigo: string ) {

    return this._http.delete(`${ this.url }/clientes/${ codigo }.json`);
  }

}
