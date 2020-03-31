import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../services/proveedores.service';
import { Router } from '@angular/router';
import { ProveedorModel } from '../../models/proveedor.model';

export interface Proveedores {
  codigo: string;
  nombre: string;
  pais: string;
  correo: string;
}

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  proveedor;

  proveedores: ProveedorModel [] = [];

  displayedColumns: string[] = ['codigo', 'nombre', 'correo', 'pais'];
  dataSource: ProveedorModel [] = [];

  constructor( private _proveedoresServicio: ProveedoresService, 
               private _route: Router) {}

  ngOnInit() {
    this._proveedoresServicio.getProveedores().subscribe( resp => {
      this.proveedores = resp;
      this.dataSource = resp;
      this.ordenarProveedores( this.proveedores );
    });
  
    }

escogerProveedorMaterial( element ) {
    this.proveedor = element;
    this._route.navigate(['/proveedor', this.proveedor.id]);
}
ordenarProveedores( r) {
  r.sort( function(a, b) {
    return a.codigo - b.codigo;
  });
}

}
