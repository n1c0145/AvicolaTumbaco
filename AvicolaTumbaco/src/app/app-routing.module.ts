import { ContactosComponent } from './contactos/contactos.component';
import { ServiciosempresaComponent } from './serviciosempresa/serviciosempresa.component';
import { VisionComponent } from './vision/vision.component';
import { MisionComponent } from './mision/mision.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from "../app/inicio/inicio.component";
const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registrarse',
    component: RegistrarseComponent,
  },
  {
    path: 'mision',
    component: MisionComponent,
  },
  {
    path: 'vision',
    component: VisionComponent,
  },
  {
    path: 'servicios',
    component: ServiciosempresaComponent,
  },
  {
    path: 'contactos',
    component: ContactosComponent,
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'administrador',
    loadChildren: () =>
      import('./administrador/administrador.module').then(mod => mod.AdministradorModule),
  },
  {
    path: 'usuario',
    loadChildren: () =>
      import('./usuario/usuario.module').then(mod => mod.UsuarioModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
