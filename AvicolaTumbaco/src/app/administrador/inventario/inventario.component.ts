import { AvicolaService } from './../../servicios/avicola.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Inventario } from '../../modelos/inventario.interface';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  providers: [MessageService]
})
export class InventarioComponent implements OnInit {
  val;
  editOn = false;
  fecha = new Date();
  stock;
  cantidad;
  user;
  cat1;
  cat2;
  cat3;
  cat4;
  cat5;
  id;
  desabastecimiento;
  unidad;
  selectedProducto: Inventario;
  operativo;
  filterPost ='';
  selectoperacional;
  operacion;
  constructor(
    private readonly _router: Router,
    private readonly _AvicolaService: AvicolaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this._AvicolaService
      .metodoGet(
        'http://localhost:1337/inventario?estado=activo&&idCategoria=1'
      )
      .subscribe((data) => {
        this.cat1 = data;
      });
    this._AvicolaService
      .metodoGet(
        'http://localhost:1337/inventario?estado=activo&&idCategoria=2'
      )
      .subscribe((data) => {
        this.cat2 = data;
      });
    this._AvicolaService
      .metodoGet(
        'http://localhost:1337/inventario?estado=activo&&idCategoria=3'
      )
      .subscribe((data) => {
        this.cat3 = data;
      });
    this._AvicolaService
      .metodoGet(
        'http://localhost:1337/inventario?estado=activo&&idCategoria=4'
      )
      .subscribe((data) => {
        this.cat4 = data;
      });
    this._AvicolaService
      .metodoGet(
        'http://localhost:1337/inventario?estado=activo&&idCategoria=5'
      )
      .subscribe((data) => {
        this.cat5 = data;
      });
  }
  editar(cat1: Inventario) {
    this.editOn = true;
    this.selectedProducto = cat1;
    this.id = cat1.id;
    this.operativo = cat1.operativo;
  }
  editar2(cat2: Inventario) {
    this.editOn = true;
    this.selectedProducto = cat2;
    this.id = cat2.id;
    this.stock = cat2.stock;
    this.desabastecimiento = cat2.desabastecimiento
  }
  editar3(cat3: Inventario) {
    this.editOn = true;
    this.selectedProducto = cat3;
    this.id = cat3.id;
    this.stock = cat3.stock;
    this.desabastecimiento = cat3.desabastecimiento

  }
  editar4(cat4: Inventario) {
    this.editOn = true;
    this.selectedProducto = cat4;
    this.id = cat4.id;
    this.stock = cat4.stock;
    this.desabastecimiento = cat4.desabastecimiento

  }
  editar5(cat5: Inventario) {
    this.editOn = true;
    this.selectedProducto = cat5;
    this.id = cat5.id;
    this.stock = cat5.stock;
    this.desabastecimiento = cat5.desabastecimiento

  }
  ingreso() {
    if (this.val === undefined) {
      alert('Escoja un valor a cambiar');
    } else {
      this.cantidad = this.stock + this.val;
if(this.cantidad<=this.desabastecimiento){
  alert('Hay un desabastecimiento')
}
      this._AvicolaService
        .metodoPut('http://localhost:1337/inventario/' + this.id, {
          stock: this.cantidad,
          fechaActualizacion: this.fecha,
          nombreUsuarioActualizacion: this.user,
        })
        .subscribe((producto) => {
          alert('Stock Actualizado');
          location.reload();
        });
    }
  }

  ingreso2() {
    if (this.unidad == 'val1') {
      if (this.val === undefined) {
        alert('Escoja un valor a cambiar');
      } else {
        this.cantidad = this.stock + this.val;
       
        if(this.cantidad<=this.desabastecimiento){
          alert('Hay un desabastecimiento')
        }
        this._AvicolaService
          .metodoPut('http://localhost:1337/inventario/' + this.id, {
            stock: this.cantidad,
            fechaActualizacion: this.fecha,
            nombreUsuarioActualizacion: this.user,
          })
          .subscribe((producto) => {
            alert('Stock Actualizado');
            location.reload();
          });
      }
    } else if (this.unidad == 'val2') {
      if (this.val === undefined) {
        alert('Escoja un valor a cambiar');
      } else {
        this.cantidad = this.stock + this.val / 100;
        if(this.cantidad<=this.desabastecimiento){
          alert('Hay un desabastecimiento')
        }
        this._AvicolaService
          .metodoPut('http://localhost:1337/inventario/' + this.id, {
            stock: this.cantidad,
            fechaActualizacion: this.fecha,
            nombreUsuarioActualizacion: this.user,
          })
          .subscribe((producto) => {
            alert('Stock Actualizado');
            location.reload();
          });
      }
    } else {
      alert('escoja una unidad');
    }
  }
  ingresoactivo(){
    if (this.selectoperacional === undefined) {
      alert('escoja un estado');
    } else {
      if (this.selectoperacional == 1) {
        this.operacion = 'operativo';
      } else if (this.selectoperacional == 2) {
        this.operacion = 'no operativo';
      }
      this._AvicolaService
      .metodoPut('http://localhost:1337/inventario/' + this.id, {
        operativo: this.operacion,
        fechaActualizacion: this.fecha,
        nombreUsuarioActualizacion: this.user,
      })
      .subscribe((producto) => {
        alert('Actualizado');
        location.reload();
      });

    }
  }
}
