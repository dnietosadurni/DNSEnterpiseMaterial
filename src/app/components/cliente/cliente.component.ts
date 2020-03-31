import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClienteModel } from '../../models/cliente.model';
import { ClientesService } from '../../services/clientes.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente = new ClienteModel();

  constructor(private _router: Router,
    private _clientesService: ClientesService,
    private _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    const codigo = this._activatedRoute.snapshot.params.codigo;

    if (codigo !== 'nuevo') {
      this._clientesService.getCliente(codigo).subscribe((resp: ClienteModel) => {
        this.cliente = resp;
        this.cliente.codigo = codigo;
      });
    }
  }

  guardarCliente(form: NgForm) {

    if (form.invalid) {
    //  console.log('Formulario no valido');
      return;
    }
    let peticion: Observable<any>;

    if (this.cliente.codigo) {

      peticion = this._clientesService.actualizarCliente(this.cliente);
    } else {

      peticion = this._clientesService.crearCliente(this.cliente);
    }

    peticion.subscribe(resp => {
      this._snackBar.open('Cliente guardado correctamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['red-snackbar']
      });

      this._router.navigate(['/clientes']);

    });


  }

  eliminarCliente(cliente: ClienteModel) {

    this._clientesService.eliminarCliente(cliente.codigo).subscribe(resp => {
      this._snackBar.open('Cliente eliminado', 'Cerrar', {
        duration: 3000,
        panelClass: ['red-snackbar']
      });

      this._router.navigate(['/clientes']);

    });


  }

}
