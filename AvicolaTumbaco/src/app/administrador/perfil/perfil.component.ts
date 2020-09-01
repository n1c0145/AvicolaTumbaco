import { AvicolaService } from './../../servicios/avicola.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../modelos/login.interface';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [MessageService]
})
export class PerfilComponent implements OnInit {
  nombre = '';
  apellido = '';
  direccion = '';
  telefono = '';
  estado = '';
  fechaActualizacion = '';
  nombreUsuarioActualizacion = '';
  usuario = '';
  clave = '';
  usuarios;
  id;
  user;
  editOn = false;
  selectedPerfil: Login;
  datos;
  fecha = new Date();
  constructor(
    private readonly _router: Router,
    private readonly _AvicolaService: AvicolaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.user = localStorage.getItem('user');
    this._AvicolaService
      .metodoGet('http://localhost:1337/registro?estado=activo&&id=' + this.id)
      .subscribe((data) => (this.usuarios = data));
    console.log(this.usuarios);
  }

  editar(perfil: Login) {
    this.editOn = true;
    this.selectedPerfil = perfil;
    this.datos = perfil.idLogin;
    this.usuario = this.datos.usuario;
    this.clave = this.datos.clave;
  }

  actualizar(perfil: Login) {
    this._AvicolaService
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
        this._AvicolaService
          .metodoPut('http://localhost:1337/login/' + this.id, {
            usuario: this.usuario,
            clave: this.clave,
            fechaActualizacion: this.fecha,
            nombreUsuarioActualizacion: this.user,
          })
          .subscribe(() => {
            this.showSuccess()
            this.editOn = false;
 
          });
      });
  }
  obtenerFormulario(formulario) {}
  showSuccess() {
    this.messageService.add({severity:'success', detail: 'Registro Actualizado'});
    return setTimeout('document.location.reload()',2200);
  
  }
}
