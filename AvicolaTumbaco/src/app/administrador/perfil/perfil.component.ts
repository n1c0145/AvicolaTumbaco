import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { Login } from '../../modelos/login.interface';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  nombre = '';
  apellido= '';
  direccion = '';
  telefono= '';
  estado= '';
  fechaCreacion= '';
  nombreUsuarioCreacion= '';
  fechaActualizacion= '';
  nombreUsuarioActualizacion= '';
  usuario= '';
  clave= '';
  idTipoPerfil= '';
  usuarios;
  id;
  user;
  perfil: Login[];
  editOn = false;
  selectedPerfil: Login;
  constructor(
    private readonly _router: Router,
    private readonly _loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
   this.user= localStorage.getItem('user')
    this._loginService.metodoGet('http://localhost:1337/registro?estado=activo&&id='+this.id).subscribe((data) => (this.usuarios=data));
    console.log(this.usuarios);
    
  }


  editar(perfil:Login){
    this.editOn = true;
    this.selectedPerfil = perfil;
   // this.selectedPerfil = perfil2
  }

actualizar(perfil:Login){
this._loginService.metodoPatch(perfil).subscribe((perfil)=>{
  alert('Actualizado')
  this.editOn=false
})
}

}
