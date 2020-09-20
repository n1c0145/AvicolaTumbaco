import { Producto } from './../../modelos/producto.interface';
import { AvicolaService } from './../../servicios/avicola.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-ventaproducto',
  templateUrl: './ventaproducto.component.html',
  styleUrls: ['./ventaproducto.component.css'],
  providers: [MessageService],
})
export class VentaproductoComponent implements OnInit {
  descripcion;
  peso;
  precio;
  stock = 0;
  fecha = new Date();
  val;
  id;
  user;
  date: Date;
  selectedProducto: Producto;
  producto: Producto[];
  editOn = false;
  productos;
  displayModal: boolean;
  constructor(
    private readonly _router: Router,
    private readonly _AvicolaService: AvicolaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this._AvicolaService
      .metodoGet('http://localhost:1337/producto?estado=activo')
      .subscribe((data) => {
        this.productos = data;
      });
    console.log(this.peso);
  }
  ingresar() {
    console.log(this.peso);

    if (this.peso === undefined) {
      this.showWarn();
    } else {
      if (this.stock === 0) {
        this.showWarn2();
      } else {
        if (this.date === undefined) {
          this.showWarn3();
        } else {
          this._AvicolaService
            .crearVenta({
              descripcion: this.descripcion,
              peso: this.peso,
              precio: this.precio,
              stock: this.stock,
              fecha: this.date,
              estado: 'activo',
              fechaCreacion: this.fecha,
              nombreUsuarioCreacion: this.user,
              fechaActualizacion: this.fecha,
              nombreUsuarioActualizacion: this.user,
            })
            .subscribe((registroCreado) => {
              this.showSuccess();
            });
        }
      }
    }
  }
  editar(producto: Producto) {
    this.displayModal = true;
    this.editOn = true;

    this.selectedProducto = producto;
    this.id = producto.id;
  
  }
  eliminar(producto: Producto) {
    this.selectedProducto = producto;
    this.id = producto.id;
    this._AvicolaService
      .metodoPut('http://localhost:1337/producto/' + this.id, {
        estado: 'inactivo',
        nombreUsuarioActualizacion: this.user,
      })
      .subscribe(() => {
        this.showError();
      });
  }
  actualizar() {
    console.log(this.stock);
    
    this._AvicolaService
      .metodoPut('http://localhost:1337/producto/' + this.id, {
        descripcion: this.selectedProducto.descripcion,
        peso: this.peso,
        precio: this.selectedProducto.precio,
        stock: this.stock,
        fecha: this.date,
        fechaActualizacion: this.fecha,
        nombreUsuarioActualizacion: this.user,
      })
      .subscribe(() => {
        this.showSuccess2();
        this.displayModal = false
      });
  }
  obtenerFormulario(formulario) {}
  showSuccess() {
    this.messageService.add({ severity: 'success', detail: 'Producto Creado' });
    return setTimeout('document.location.reload()', 2200);
  }
  showSuccess2() {
    this.messageService.add({
      severity: 'success',
      detail: 'Producto Actualizado',
    });
    return setTimeout('document.location.reload()', 2200);
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      detail: 'Producto Eliminado',
    });
    return setTimeout('document.location.reload()', 2200);
  }
  showWarn() {
    this.messageService.add({ severity: 'warn', detail: 'Escoja Peso' });
  }
  showWarn2() {
    this.messageService.add({
      severity: 'warn',
      detail: 'Coloque un numero de stock',
    });
  }
  showWarn3() {
    this.messageService.add({ severity: 'warn', detail: 'Escoja una fecha' });
  }
  cerrarSesion(){
    this._router.navigate(['inicio/']);
    localStorage.clear()

  }
}
