import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../../services/articulos.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProveedoresService } from '../../services/proveedores.service';
import { NgForm } from '@angular/forms';
import { ArticuloModel } from 'src/app/models/articulo.model';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProveedorModel } from '../../models/proveedor.model';


@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {


  articulo = new ArticuloModel();

  listaProveedores: ProveedorModel[] = [];

  constructor( private _articulosService: ArticulosService,
               private _activatedRoute: ActivatedRoute,
               private _proveedoresService: ProveedoresService,
               private _router: Router,
               private _snackbar: MatSnackBar) {

    this._proveedoresService.getProveedores().subscribe( resp => {
      this.listaProveedores = resp;
    });

   }

   ngOnInit() {
    const codigo = this._activatedRoute.snapshot.params.codigo;
    if( codigo !== 'nuevo') {
      this._articulosService.getArticulo( codigo ).subscribe( (resp: ArticuloModel ) => {
        this.articulo = resp;
        this.articulo.id = codigo;
      });
    }
  }

  guardarArticulo( form: NgForm) {
     
    if( form.invalid) { return; }
    let peticion: Observable<any>;

    if( this.articulo.id ) {
      peticion = this._articulosService.actualizarArticulo( this.articulo );
    }else {
      peticion = this._articulosService.altaArticulo( this. articulo );
    }

    peticion.subscribe( resp => {
      this._snackbar.open('Artículo guardado correctamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['red-snackbar']
      });
      this._router.navigate(['/articulos']);
    });
  }

  eliminarArticulo() {
  }
  
}
