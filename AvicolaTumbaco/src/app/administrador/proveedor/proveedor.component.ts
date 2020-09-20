import { AvicolaService } from './../../servicios/avicola.service';
import { Proveedor } from './../../modelos/proveedor.interface';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css'],
  providers: [MessageService],
})
export class ProveedorComponent implements OnInit {
  nombre = '';
  descripcion = '';
  telefono = '';
  estado = '';
  fecha = new Date();
  user;
  proveedores;
  editOn = false;
  selectedProveedor: Proveedor;
  proveedor: Proveedor[];
  id;
  band = false;
  filterPost = '';
  displayModal: boolean;
  constructor(
    private readonly _router: Router,
    private readonly _AvicolaService: AvicolaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this._AvicolaService
      .metodoGet('http://localhost:1337/proveedor?estado=activo')
      .subscribe((data) => {
        this.proveedores = data;
      });
  }
  ingresar() {
    this._AvicolaService
      .metodoGet('http://localhost:1337/proveedor?estado=activo')
      .subscribe((resultado) => {
        var rest = resultado;
        for (let key in resultado) {
          if (this.nombre == resultado[key]['nombre']) {
            this.band = true;
          }
        }
this.showInfo()

        if (this.band == false) {
          this._AvicolaService
            .crearProveedor({
              nombre: this.nombre,
              descripcion: this.descripcion,
              telefono: this.telefono,
              estado: 'activo',
              fechaCreacion: this.fecha,
              nombreUsuarioCreacion: this.user,
              fechaActualizacion: this.fecha,
              nombreUsuarioActualizacion: this.user,
            })
            .subscribe((registrocreado) => {
              this.showSuccess()
            });
        }
      });
    return (this.band = false);
  }
  editar(proveedor: Proveedor) {
    this.editOn = true;
    this.selectedProveedor = proveedor;
    this.id = proveedor.id;
    this.displayModal = true;
  }
  actualizar() {
    this._AvicolaService
      .metodoPut('http://localhost:1337/proveedor/' + this.id, {
        nombre: this.selectedProveedor.nombre,
        descripcion: this.selectedProveedor.descripcion,
        telefono: this.selectedProveedor.telefono,
        fechaActualizacion: this.fecha,
        nombreUsuarioActualizacion: this.user,
      })
      .subscribe(() => {
        this.displayModal = false;
        this.showSuccess2();
      });
  }
  eliminar(proveedor: Proveedor) {
    this.selectedProveedor = proveedor;
    this.id = proveedor.id;
    this._AvicolaService
      .metodoPut('http://localhost:1337/proveedor/' + this.id, {
        estado: 'inactivo',
        nombreUsuarioActualizacion: this.user,
      })
      .subscribe(() => {
        this.showError()
      });
  }

  obtenerFormulario(formulario) {}
  cerrarSesion() {
    this._router.navigate(['inicio/']);
    localStorage.clear();
  }
  showSuccess() {
    this.messageService.add({
      
      severity: 'success',
      detail: 'Proveedor ingresado',
    });
    return setTimeout('document.location.reload()', 2200);
  }
  showSuccess2() {
    this.messageService.add({
      severity: 'success',
      detail: 'Proveedor actualizado',
    });
    return setTimeout('document.location.reload()', 2200);
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      detail: 'Proveedor eliminado',
    });
    return setTimeout('document.location.reload()', 2200);
  }

  showInfo() {
    this.messageService.add({
      severity: 'info',
      detail: 'Esta proveedor ya se encuetra registrado',
    });
  }
}
