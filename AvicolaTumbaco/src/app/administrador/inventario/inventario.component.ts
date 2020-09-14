import { Categoria } from './../../modelos/categoria.interface';
import { AvicolaService } from './../../servicios/avicola.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Inventario } from '../../modelos/inventario.interface';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  providers: [MessageService],
})
export class InventarioComponent implements OnInit {
  val;
  editOn = false;
  fecha = new Date();
  stock;
  cantidad;
  descripcion;
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
  selectedCategoria: Categoria;
  operativo;
  filterPost = '';
  selectoperacional;
  operacion;
  displayModal: boolean;
  displayModal2: boolean;
  displayModal3: boolean;
  displayModal4: boolean;
  displayModal5: boolean;
  displayModal6: boolean;
  displayBasic: boolean;
  categorias;
  categoria:Categoria[];
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
    this._AvicolaService
      .metodoGet('http://localhost:1337/categoria')
      .subscribe((data) => {
        this.categorias = data;
      });
  }
  editar(cat1: Inventario) {
    this.editOn = true;
    this.displayModal = true;
    this.selectedProducto = cat1;
    this.id = cat1.id;
    this.operativo = cat1.operativo;
  }
  editar2(cat2: Inventario) {
    this.editOn = true;
    this.displayModal2 = true;
    this.selectedProducto = cat2;
    this.id = cat2.id;
    this.stock = cat2.stock;
    this.desabastecimiento = cat2.desabastecimiento;
  }
  editar3(cat3: Inventario) {
    this.editOn = true;
    this.displayModal3 = true;
    this.selectedProducto = cat3;
    this.id = cat3.id;
    this.stock = cat3.stock;
    this.desabastecimiento = cat3.desabastecimiento;
  }
  editar4(cat4: Inventario) {
    this.editOn = true;
    this.displayModal4 = true;
    this.selectedProducto = cat4;
    this.id = cat4.id;
    this.stock = cat4.stock;
    this.desabastecimiento = cat4.desabastecimiento;
  }
  editar5(cat5: Inventario) {
    this.editOn = true;
    this.displayModal5 = true;
    this.selectedProducto = cat5;
    this.id = cat5.id;
    this.stock = cat5.stock;
    this.desabastecimiento = cat5.desabastecimiento;
  }
  editarcategoria(categoria:Categoria) {
    this.editOn = true;
    this.selectedCategoria=categoria
    this.id = categoria.id
    this.displayModal6 = true;

  }
  actualizarcategoria(){
    this._AvicolaService
    .metodoPut('http://localhost:1337/categoria/' + this.id, {
     categoria:this.selectedCategoria.categoria,
     descripcion:this.selectedCategoria.descripcion,
      fechaActualizacion: this.fecha,
      nombreUsuarioActualizacion: this.user,
   
    })
    .subscribe(() => {
   
 this.showSuccess()
    });
  }
  obtenerFormulario(formulario) {}
  ingreso() {
    if (this.val === undefined) {
      this.showWarn();
    } else {
      this.cantidad = this.stock + this.val;

      if (this.cantidad < 0) {
        this.showWarn4();
      } else {
        if (this.cantidad <= this.desabastecimiento) {
          this.displayBasic = true;
        }
        this._AvicolaService
          .metodoPut('http://localhost:1337/inventario/' + this.id, {
            stock: this.cantidad,
            fechaActualizacion: this.fecha,
            nombreUsuarioActualizacion: this.user,
          })
          .subscribe((producto) => {
            this.showSuccess();
            this.displayModal2 = false;
            this.displayModal4 = false;
            this.displayModal5 = false;
          });
      }
    }
  }

  ingreso2() {
    if (this.unidad == 'val1') {
      if (this.val === undefined) {
        this.showWarn();
      } else {
        this.cantidad = this.stock + this.val;
        if (this.cantidad < 0) {
          this.showWarn4();
        } else {
          if (this.cantidad <= this.desabastecimiento) {
            this.displayBasic = true;
          }
          this._AvicolaService
            .metodoPut('http://localhost:1337/inventario/' + this.id, {
              stock: this.cantidad,
              fechaActualizacion: this.fecha,
              nombreUsuarioActualizacion: this.user,
            })
            .subscribe((producto) => {
              this.showSuccess();
            });
        }
      }
    } else if (this.unidad == 'val2') {
      if (this.val === undefined) {
        this.showWarn();
      } else {
        this.cantidad = this.stock + this.val / 100;
        if (this.cantidad < 0) {
          this.showWarn4();
        } else {
          if (this.cantidad <= this.desabastecimiento) {
            this.displayBasic = true;
          }
          this._AvicolaService
            .metodoPut('http://localhost:1337/inventario/' + this.id, {
              stock: this.cantidad,
              fechaActualizacion: this.fecha,
              nombreUsuarioActualizacion: this.user,
            })
            .subscribe((producto) => {
              this.showSuccess();
              this.displayModal3 = false;
            });
        }
      }
    } else {
      this.showWarn2();
    }
  }
  ingresoactivo() {
    if (this.selectoperacional === undefined) {
      this.showWarn3();
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
          this.displayModal = false;
          this.showSuccess();
        });
    }
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', detail: 'Actualizado' });
    return setTimeout('document.location.reload()', 2500);
  }
  showWarn() {
    this.messageService.add({
      severity: 'warn',
      detail: 'Escoja un valor a cambiar',
    });
  }
  showWarn2() {
    this.messageService.add({ severity: 'warn', detail: 'Escoja una unidad' });
  }
  showWarn3() {
    this.messageService.add({ severity: 'warn', detail: 'Escoja un estado' });
  }
  showWarn4() {
    this.messageService.add({
      severity: 'warn',
      detail: 'No se puede sacar esa catidad del inventario',
    });
  }
  cerrarSesion() {
    this._router.navigate(['inicio/']);
    localStorage.clear();
  }
}
