import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.usuario.email = 'dnietosadurni@gmail.com';
  }

  onSubmit(form: NgForm) {

    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor ...'
    });
    Swal.showLoading();


    this._auth.nuevoUsuario(this.usuario).subscribe(resp => {
      Swal.close();
      if ( this.recordarme ) {
        localStorage.setItem('email', this.usuario.email);
      }

      this._router.navigate(['/home']);
    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message
      });

    });
  }

}
