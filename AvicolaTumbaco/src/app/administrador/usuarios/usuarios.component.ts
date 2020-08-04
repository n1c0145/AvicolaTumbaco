import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { Login } from '../../modelos/login.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
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

  constructor(
    private readonly _router: Router,
    private readonly _loginService: LoginService
  ) { }

  ngOnInit(): void {
    this._loginService.metodoGet('http://localhost:1337/registro?estado=activo').subscribe((data) => (this.usuarios=data));
    console.log(this.usuarios);
    
  }

}


