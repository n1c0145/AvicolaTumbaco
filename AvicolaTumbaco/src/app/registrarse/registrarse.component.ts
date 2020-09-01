import { LoginComponent } from './../login/login.component';
import { AvicolaService } from './../servicios/avicola.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css'],
  providers: [MessageService],
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
    private readonly _AvicolaService: AvicolaService,
    private messageService: MessageService
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
            this.showInfo2()
          }
        }
        this._AvicolaService
          .metodoGet('http://localhost:1337/login?estado=activo')
          .subscribe((resultadoParametro) => {
            var rest = JSON.stringify(resultadoParametro);
            for (let key in resultadoParametro) {
              if (this.usuario === resultadoParametro[key]['usuario']) {
                this.band = true;
                this.showInfo()
              }
            }

            if (this.band == false) {
              if (this.pass === this.pass2) {
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
               this.showSuccess()
              } else {
                this.showWarn()
              }
            }
          });
      });
    return (this.band = false);
  }
  obtenerFormulario(formulario) {}
  showSuccess() {
    this.messageService.add({severity:'success', detail: 'Usuario Registrado Correctamente , Inicie Sesion'});
return setTimeout(()=>this._router.navigate(['login']),2200);
  }
  showInfo() {
    this.messageService.add({severity:'info',  detail: 'Este usuario ya se encuetra registrado'});
}
showInfo2() {
  this.messageService.add({severity:'info',  detail: 'Esta cedula ya se encuetra registrada'});
}
showWarn() {
  this.messageService.add({severity:'warn',  detail: 'Las contraseñas no coinciden'});
}
}
