import { AvicolaService } from './../../servicios/avicola.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Datosempresa } from '../../modelos/datosempresa.interface';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-datosempresa',
  templateUrl: './datosempresa.component.html',
  styleUrls: ['./datosempresa.component.css'],
  providers: [MessageService],
})
export class DatosempresaComponent implements OnInit {
  nombre;
  direccion;
  ruc;
  telefono;
  telefono2;
  id;
  user;

  dato: Datosempresa[];
  editOn = false;
  selectedDato: Datosempresa;
  fecha = new Date();
  datos;
  displayModal: boolean;
  constructor(
    private readonly _router: Router,
    private readonly _AvicolaService: AvicolaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    console.log(this.user);
    this._AvicolaService
      .metodoGet('http://localhost:1337/datosempresa?estado=activo')
      .subscribe((data) => {
        this.datos = data;
      });
  }
  editar(dato: Datosempresa) {
    this.editOn = true;
    this.selectedDato = dato;
    this.id = dato.id;
    this.displayModal = true
  }

  actualizar() {
    this._AvicolaService
      .metodoPut('http://localhost:1337/datosempresa/' + this.id, {
        ruc: this.selectedDato.ruc,
        nombre: this.selectedDato.nombre,
        direccion: this.selectedDato.direccion,
        telefono: this.selectedDato.telefono,
        telefono2: this.selectedDato.telefono2,
        fechaActualizacion: this.fecha,
        nombreUsuarioActualizacion: this.user,
      })
      .subscribe(() => {
        this.showSuccess();
        this.displayModal = false
      });
  }
  obtenerFormulario(formulario) {}
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      detail: 'Registro Actualizado',
    });
    return setTimeout('document.location.reload()', 2200);
  }
  cerrarSesion() {
    this._router.navigate(['inicio/']);
    localStorage.clear();
  }
}
