import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyBiPVBrZwCsALleaNmnPUxS2S4b5JNB6wQ';
  userToken: string;

  // Crear nuevos usuarios
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private _http: HttpClient ) {
    this.leerToken();
   }

  logout() {

    localStorage.removeItem('token');
    this.leerToken();
    this.estaAutentucado();
  }

  login( usuario: UsuarioModel) {

    const authData = {

      ...usuario,
      returnSecureToken: true
  
    };

    return this._http.post(
      `${ this.url }signInWithPassword?key=${ this.apikey }`,
      authData).pipe(
        map( resp => {
          this.guardarToken( resp['idToken']);
          return resp;
        })
      );

  }

  nuevoUsuario( usuario: UsuarioModel) {

    const authData = {

      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
  
    };

    return this._http.post(
      `${ this.url }signUp?key=${ this.apikey }`,
      authData
    ).pipe(
      map( resp => {
        console.log('entro en el map del rxjs');
        this.guardarToken( resp['idToken']);
        return resp;
      })
    );
  }

  private guardarToken( idToken: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken() {
    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutentucado(): boolean {
    if ( this.userToken.length > 2 ) {
      return true;
    } else {
      return false;
    }
  }

}
