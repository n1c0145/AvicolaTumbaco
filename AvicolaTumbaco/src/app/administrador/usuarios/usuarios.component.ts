import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { Login } from '../../modelos/login.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  nombre = '';
  apellido = '';
  direccion = '';
  telefono = '';
  estado = '';
  fechaActualizacion = '';
  nombreUsuarioActualizacion = '';
  usuario = '';
  clave = '';
  usuarioA = '';
  claveA = '';
  idTipoPerfil;
  usuarios;
  perfil: Login[];
  editOn = false;
  selectedPerfil: Login;
  fecha = new Date();
  datos;
  id;
  user;
  select;
  constructor(
    private readonly _router: Router,
    private readonly _LoginService: LoginService
  ) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    console.log(this.user);
    this._LoginService
      .metodoGet('http://localhost:1337/registro?estado=activo')
      .subscribe((data) => {
        this.usuarios = data;
      });
  }

  editar(perfil: Login) {
    this.editOn = true;
    this.selectedPerfil = perfil;
    this.id = perfil.id;
    this.datos = perfil.idLogin;
    this.usuario = this.datos.usuario;
    this.clave = this.datos.clave;
  }
  seleccionUsuario() {
    if (this.select == 1) {
      this.idTipoPerfil = 1;
    } else if (this.select == 2) {
      this.idTipoPerfil = 2;
    }
  }

  actualizar() {
    this.seleccionUsuario();
    this._LoginService
      .metodoPut('http://localhost:1337/registro/' + this.id, {
        cedula: this.selectedPerfil.cedula,
        nombre: this.selectedPerfil.nombre,
        apellido: this.selectedPerfil.apellido,
        direccion: this.selectedPerfil.direccion,
        telefono: this.selectedPerfil.telefono,
        fechaActualizacion: this.fecha,
        nombreUsuarioActualizacion: this.user,
      })
      .subscribe(() => {
        this._LoginService
          .metodoPut('http://localhost:1337/login/' + this.id, {
            usuario: this.usuario,
            clave: this.clave,
            fechaActualizacion: this.fecha,
            nombreUsuarioActualizacion: this.user,
            idTipoPerfil: this.idTipoPerfil,
          })
          .subscribe(() => {
            alert('Actualizado');
            this.editOn = false;
            location.reload();
          });
      });
  }

  eliminar(perfil: Login) {
    this.selectedPerfil = perfil;
    this.id = perfil.id;
    this._LoginService
      .metodoPut('http://localhost:1337/registro/' + this.id, {
        estado: 'inactivo',
        nombreUsuarioActualizacion: this.user,
      })
      .subscribe(() => {
        this._LoginService
          .metodoPut('http://localhost:1337/login/' + this.id, {
            estado: 'inactivo',
            nombreUsuarioActualizacion: this.user,
          })
          .subscribe(() => {
            alert('Usuario eliminado');
            location.reload();
          });
      });
  }
}