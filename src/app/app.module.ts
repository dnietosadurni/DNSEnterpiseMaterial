import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { HomeComponent } from './components/home/home.component';

import { ProveedoresService } from '../app/services/proveedores.service';
import { ArticuloComponent } from './components/articulo/articulo.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ProveedorComponent } from './components/proveedor/proveedor.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProveedoresComponent,
    ArticulosComponent,
    HomeComponent,
    ArticuloComponent,
    LoginComponent,
    RegisterComponent,
    ClientesComponent,
    ClienteComponent,
    ProveedorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    ProveedoresService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
