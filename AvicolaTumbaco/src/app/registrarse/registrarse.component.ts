import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css'],
})
export class RegistrarseComponent implements OnInit {
  band = false;
  cedula = '';
  nombre = '';
  apellido = '';
  direccion = '';
  telefono = '';
  estado = '';
  usuario = '';
  pass = '';
  idLogin = '';
  idTipoPerfil = '';
  fecha = new Date();
  perfil = '';
  a = 3;
  constructor(
    private readonly _router: Router,
    private readonly _loginService: LoginService
  ) {}

  ngOnInit(): void {}

  ingresar() {
    this._loginService
      .metodoGet('http://localhost:1337/login/')
      .subscribe((resultadoParametro) => {
        var rest = JSON.stringify(resultadoParametro);
        for (let key in resultadoParametro) {
          if (this.usuario === resultadoParametro[key]['usuario']) {
            this.band = true;
            alert('incorrecto');
          }
        }

        if (this.band == false) {
          alert('si');
        }
      });
    return (this.band = false);
  }
}

/*

this._loginService
.crearPerfil({
  perfil: 'user',
  estado: 'activo',
  fechaCreacion: this.fecha,
  nombreUsuarioCreacion: this.usuario,
  fechaActualizacion: this.fecha,
  nombreUsuarioActualizacion: this.usuario,
})
.subscribe((registroCreado) => {
  this._loginService
    .crearLogin({
      usuario: this.usuario,
      clave: this.pass,
      estado: 'activo',
      fechaCreacion: this.fecha,
      nombreUsuarioCreacion: this.usuario,
      fechaActualizacion: this.fecha,
      nombreUsuarioActualizacion: this.usuario,
    })
    .subscribe((registroCreado) => {
      this.idLogin = JSON.stringify(registroCreado['id']);
      this.idTipoPerfil = JSON.stringify(registroCreado['id']);
      alert('Usuario Registrado');
      this._loginService
        .crearRegistro({
          
          cedula: this.cedula,
          nombre: this.nombre,
          apellido: this.apellido,
          direccion: this.direccion,
          telefono: this.telefono,
          estado: 'activo',
          fechaCreacion: this.fecha,
          nombreUsuarioCreacion: this.usuario,
          fechaActualizacion: this.fecha,
          nombreUsuarioActualizacion: this.usuario,
          idLogin: this.idLogin + '',
          idTipoPerfil: this.idTipoPerfil + '',
        })
        .subscribe((registroCreado) => {

          // const valorLocal = JSON.parse(localStorage.getItem('idPerfil'));
        });
    });
});
this._router.navigate(['login']);

*/
