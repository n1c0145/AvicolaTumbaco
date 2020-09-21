import { Categoria } from './../../modelos/categoria.interface';
import { AvicolaService } from './../../servicios/avicola.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Inventario } from '../../modelos/inventario.interface';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
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
  displayDesabastecimiento:boolean;
  categorias;
  categoria: Categoria[];
  constructor(
    private messageService: MessageService,
    private readonly _router: Router,
    private readonly _AvicolaService: AvicolaService
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
  editarcategoria(categoria: Categoria) {
    this.editOn = true;
    this.selectedCategoria = categoria;
    this.id = categoria.id;
    this.displayModal6 = true;

  }
  actualizarcategoria() {
    this._AvicolaService
      .metodoPut('http://localhost:1337/categoria/' + this.id, {
        categoria: this.selectedCategoria.categoria,
        descripcion: this.selectedCategoria.descripcion,
        fechaActualizacion: this.fecha,
        nombreUsuarioActualizacion: this.user,
      })
      .subscribe(() => {
        this.showSucces();
      });
  }
  obtenerFormulario(formulario) {}

  ingreso() {
    if (this.val === undefined) {
      this.showInfo3();
    } else {
      this.cantidad = this.stock + this.val;

      if (this.cantidad < 0) {
        this.showInfo();
      } else {
    
         this._AvicolaService
           .metodoPut('http://localhost:1337/inventario/' + this.id, {
            stock: this.cantidad,
            fechaActualizacion: this.fecha,
            nombreUsuarioActualizacion: this.user,
          })
          .subscribe((producto) => {
            this.displayModal2 = false;
            this.displayModal4 = false;
            this.displayModal5 = false;
          });
      }
      if (this.cantidad <= this.desabastecimiento) {
this.showError()
        }else{
            this.showSucces();

        }
    }
  }

  ingreso2() {
    if (this.unidad == 'val1') {
      if (this.val === undefined) {
        this.showInfo3();
      } else {
        this.cantidad = this.stock + this.val;
        if (this.cantidad < 0) {
          this.showInfo();
        } else {
          if (this.cantidad <= this.desabastecimiento) {
 
          }
          this._AvicolaService
            .metodoPut('http://localhost:1337/inventario/' + this.id, {
              stock: this.cantidad,
              fechaActualizacion: this.fecha,
              nombreUsuarioActualizacion: this.user,
            })
            .subscribe((producto) => {
              if (this.cantidad <= this.desabastecimiento) {
                this.showError()
                        }else{
                            this.showSucces();
                
                        }
            });
        }
      }
    } else if (this.unidad == 'val2') {
      if (this.val === undefined) {
        this.showInfo3();
      } else {
        this.cantidad = this.stock + this.val / 100;
        if (this.cantidad < 0) {
          this.showInfo();
        } else {
          if (this.cantidad <= this.desabastecimiento) {
          }
          this._AvicolaService
            .metodoPut('http://localhost:1337/inventario/' + this.id, {
              stock: this.cantidad,
              fechaActualizacion: this.fecha,
              nombreUsuarioActualizacion: this.user,
            })
            .subscribe((producto) => {
              if (this.cantidad <= this.desabastecimiento) {
                this.showError()
                        }else{
                            this.showSucces();
                
                        }
            });
        }
      }
    } else {
      this.showInfo4();
    }
  }
  ingresoactivo() {
    if (this.selectoperacional === undefined) {
      this.showInfo2();
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
          this.showSucces();

          this.displayModal = false;
        });
    }
  }
  showError(){
    Swal.fire({
      title: 'Desabastecimiento',
      html:'<b>Hay un desabastecimiento del producto , porfavor contacte a su proveedor de manera inmediata.</b>',
      icon: 'error',
      confirmButtonText: `Entendido`,
    }).then((result) => {
      if (result.isConfirmed) {
       location.reload()
      }
    })
    
  }
  showSucces() {
    Swal.fire({
      title: 'Actualizado',
      icon: 'success',
    });
    return setTimeout('document.location.reload()', 2200);
  }
  showInfo() {
    Swal.fire({
      title: 'No se puede sacar esa cantidad del inventario',
      icon: 'error',
    });
  }
  showInfo2() {
    Swal.fire({
      title: 'Escoja un estado',
      icon: 'info',
    });
  }
  showInfo3() {
    Swal.fire({
      title: 'Ingrese un valor',
      icon: 'info',
    });
  }
  showInfo4() {
    Swal.fire({
      title: 'Escoja una unidad',
      icon: 'info',
    });
  }
  cerrarSesion() {
    this._router.navigate(['inicio/']);
    localStorage.clear();
  }
}
