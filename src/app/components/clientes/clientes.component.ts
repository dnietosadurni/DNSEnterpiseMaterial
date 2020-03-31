import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { ClienteModel } from '../../models/cliente.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export interface Clientes {
  codigo: string;
  nombre: string;
  pais: string;
  email: number;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  cliente;

  clientes: ClienteModel[] = [];

  displayedColumns: string[] = ['nombre', 'pais', 'email'];
  dataSource: ClienteModel [] = [];

  constructor( private _clientesService: ClientesService,
               private _route: Router,
               private _snackbar: MatSnackBar) { }

  ngOnInit() {
//    this._snackbar.open('CARGANDO IFORMACION', 'Cerrar', {
//      verticalPosition: 'top',
//     panelClass: 'red-snackbar'
//   });
  this._clientesService.getClientes().subscribe( resp => {
      this.clientes = resp;
      this.dataSource = resp;
//      this._snackbar.dismiss();
    }  );
  }

  escogerClienteMaterial( element: {} ) {
    this.cliente = element;
    this._route.navigate(['/cliente', this.cliente.codigo]);
  }

}
