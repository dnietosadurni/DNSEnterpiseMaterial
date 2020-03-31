import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ArticuloComponent } from './components/articulo/articulo.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'proveedores', component: ProveedoresComponent, canActivate: [ AuthGuard ] },
  { path: 'proveedor/:codigo', component: ProveedorComponent, canActivate: [ AuthGuard ] },
  { path: 'articulos', component: ArticulosComponent, canActivate: [ AuthGuard ] },
  { path: 'articulo/:codigo', component: ArticuloComponent, canActivate: [ AuthGuard ] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'clientes', component: ClientesComponent,  canActivate: [ AuthGuard ]},
  { path: 'cliente/:codigo', component: ClienteComponent, canActivate: [ AuthGuard ] },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
