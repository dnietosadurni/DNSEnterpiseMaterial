import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProveedorModel } from '../../models/proveedor.model';
import { ProveedoresService } from '../../services/proveedores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  proveedor = new ProveedorModel();

  constructor(private _proveedoresService: ProveedoresService,
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private _snackbar: MatSnackBar) { }

  ngOnInit() {

    const codigo = this._activatedRoute.snapshot.params.codigo;

    if (codigo !== 'nuevo') {
      this._proveedoresService.getProveedor(codigo).subscribe((resp: ProveedorModel) => {
        this.proveedor = resp;
        this.proveedor.id = codigo;
      });
    }
  }

  guardarProveedor(form: NgForm) {

    if (form.invalid) { return; }
    let peticion: Observable<any>;

    if (this.proveedor.id) {
      peticion = this._proveedoresService.actualizarProveedor(this.proveedor);
    } else {

      peticion = this._proveedoresService.altaProveedor(this.proveedor);
    }

    peticion.subscribe(resp => {
      this._snackbar.open('Proveedor guardado correctamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['red-snackbar']
      });
      this._route.navigate(['/proveedores']);
    });

  }

  eliminarProveedor(proveedor) {
    this._proveedoresService.eliminarProveedor(proveedor.id).subscribe(resp => {
      this._snackbar.open('Proveedor eliminado', 'Cerrar', {
        duration: 3000,
        panelClass: ['red-snackbar']
      });
      this._route.navigate(['/proveedores']);
    });
  }

}
