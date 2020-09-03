import { AvicolaService } from './../../servicios/avicola.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../modelos/login.interface';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [MessageService]
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
  filterPost ='';

  constructor(
    private readonly _router: Router,
    private readonly _AvicolaService: AvicolaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    console.log(this.user);
    this._AvicolaService
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
            idTipoPerfil: this.idTipoPerfil,
          })
          .subscribe(() => {
         this.showSuccess()
            this.editOn = false;
            
          });
      });
  }

  eliminar(perfil: Login) {
    this.selectedPerfil = perfil;
    this.id = perfil.id;
    this._AvicolaService
      .metodoPut('http://localhost:1337/registro/' + this.id, {
        estado: 'inactivo',
        nombreUsuarioActualizacion: this.user,
      })
      .subscribe(() => {
        this._AvicolaService
          .metodoPut('http://localhost:1337/login/' + this.id, {
            estado: 'inactivo',
            nombreUsuarioActualizacion: this.user,
          })
          .subscribe(() => {
      this.showSuccess2()
          });
      });
  }
  obtenerFormulario(formulario) {}
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Registro Actualizado'});
    return setTimeout('document.location.reload()',2200);
  
  }
  showSuccess2() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Usuario Eliminado'});
    return setTimeout('document.location.reload()',2200);
  
  }
  cerrarSesion(){
    this._router.navigate(['inicio/']);
    localStorage.clear()

  }
}