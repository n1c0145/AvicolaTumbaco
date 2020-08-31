import { AvicolaService } from './../servicios/avicola.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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
  pass2;
  idLogin = '';
  idTipoPerfil = '';
  fecha = new Date();
  perfil = '';

  constructor(
    private readonly _router: Router,
    private readonly _AvicolaService: AvicolaService
  ) {}

  ngOnInit(): void {}

  ingresar() {




    this._AvicolaService
      .metodoGet('http://localhost:1337/registro?estado=activo')
      .subscribe((resultado) => {
        var rest = resultado;
        for (let key in resultado) {
          if (this.cedula == resultado[key]['cedula']) {
            this.band = true;
            alert('Esta cedula ya se encuetra registrado');
          }
        }
        this._AvicolaService
        .metodoGet('http://localhost:1337/login?estado=activo')
        .subscribe((resultadoParametro) => {
          var rest = JSON.stringify(resultadoParametro);
          for (let key in resultadoParametro) {
            if (this.usuario === resultadoParametro[key]['usuario']) {
              this.band = true;
              alert('Este usuario ya se encuetra registrado');
            }
          }

  
       
            if (this.band == false) {
              if(this.pass===this.pass2){
               this._AvicolaService
                 .crearLogin({
                   usuario: this.usuario,
                   clave: this.pass,
                   estado: 'activo',
                   fechaCreacion: this.fecha,
                   nombreUsuarioCreacion: this.usuario,
                   fechaActualizacion: this.fecha,
                   nombreUsuarioActualizacion: this.usuario,
                   idTipoPerfil: 1,
                 })
                 .subscribe((registroCreado) => {
                   this.idLogin = JSON.stringify(registroCreado['id']);
                   alert('Usuario Registrado');
                   this._AvicolaService
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
                     })
                     .subscribe((registroCreado) => {});
                 });
               this._router.navigate(['login']);
            }else{
              alert('Las contraseñas no coinciden')
            }
            }
          });
        });
    return (this.band = false);
  }
  obtenerFormulario(formulario) {}
}
