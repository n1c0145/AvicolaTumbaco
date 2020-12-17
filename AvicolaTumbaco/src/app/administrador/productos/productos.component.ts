import { AvicolaService } from './../../servicios/avicola.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Inventario } from '../../modelos/inventario.interface';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [MessageService],
})
export class ProductosComponent implements OnInit {
  nombre: '';
  descripcion: '';
  categoria;
  stock: '';
  desabastecimiento;
  idproveedor;
  idcategoria;
  fecha = new Date();
  prueba1;
  prueba2;
  id;
  band = false;
  user;
  select;
  select2;
  select3;
  selectoperacional;
  operacion;
  productos;
  proveedor;
  editOn = false;
  selectedProducto: Inventario;
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
      .metodoGet('http://localhost:1337/inventario?estado=activo')
      .subscribe((data) => {
     
        
        this.productos = data;
        console.log(this.productos);
      });
    this._AvicolaService
      .metodoGet('http://localhost:1337/proveedor?estado=activo')
      .subscribe((data2) => {
        this.proveedor = data2;
      });
    this._AvicolaService
      .metodoGet('http://localhost:1337/categoria')
      .subscribe((data4) => {
        this.categoria = data4;
      });
  }

  ingresar() {
    this._AvicolaService
      .metodoGet('http://localhost:1337/inventario?estado=activo')
      .subscribe((resultado) => {
        var rest = JSON.stringify(resultado);
        for (let key in resultado) {
          if (this.nombre == resultado[key]['nombre']) {
            this.band = true;
            this.showInfo();

          }
        }
        console.log(this.band);
      

    if (this.band == false) {
      if (this.select2 === undefined) {
        this.showWarn();
      } else {
        if (this.select === undefined) {
          this.showWar2();
        } else {
          this._AvicolaService
            .metodoGet(
              'http://localhost:1337/categoria?categoria=' + this.select2
            )
            .subscribe((data5) => {
              this.idcategoria = data5[0].id;
              this._AvicolaService
                .metodoGet(
                  'http://localhost:1337/proveedor?estado=activo&&nombre=' +
                    this.select
                )
                .subscribe((data3) => {
                  this.idproveedor = data3[0].id;

                  this._AvicolaService
                    .crearProducto({
                      nombre: this.nombre,
                      descripcion: this.descripcion,
                      stock: this.stock,
                      desabastecimiento: this.desabastecimiento,
                      estado: 'activo',
                      fechaCreacion: this.fecha,
                      nombreUsuarioCreacion: this.user,
                      fechaActualizacion: this.fecha,
                      nombreUsuarioActualizacion: this.user,
                      idCategoria: this.idcategoria,
                      idProveedor: this.idproveedor,
                    })
                    .subscribe((registroCreado) => {
                      this.showSuccess();
                    });
                });
            });
        }
      }
    }
  });
    return (this.band = false);
  }
  ingresar2() {
    this._AvicolaService
      .metodoGet('http://localhost:1337/inventario?estado=activo')
      .subscribe((resultadoParametro) => {
        var rest = JSON.stringify(resultadoParametro);
        for (let key in resultadoParametro) {
          if (this.nombre == resultadoParametro[key]['nombre']) {
            this.band = true;
            this.showInfo();

          }
        }
     
    console.log(this.band);
    if (this.band == false) {
      if (this.selectoperacional === undefined) {
        this.showWar3();
      } else {
        if (this.select3 === undefined) {
          this.showWar2();
        } else {
          this._AvicolaService
            .metodoGet(
              'http://localhost:1337/proveedor?estado=activo&&nombre=' +
                this.select3
            )
            .subscribe((data3) => {
              this.idproveedor = data3[0].id;

              if (this.selectoperacional == 1) {
                this.operacion = 'operativo';
              } else if (this.selectoperacional == 2) {
                this.operacion = 'no operativo';
              }

               this._AvicolaService
                 .crearProducto({
                   nombre: this.nombre,
                   descripcion: this.descripcion,
                   operativo: this.operacion,
                   desabastecimiento: -1,
                   estado: 'activo',
                   fechaCreacion: this.fecha,
                   nombreUsuarioCreacion: this.user,
                   fechaActualizacion: this.fecha,
                   nombreUsuarioActualizacion: this.user,
                   idCategoria: 1,
                   idProveedor: this.idproveedor,
                 })
                 .subscribe((registroCreado) => {
                   this.showSuccess();
                 });
            });
        }
      }
    }
  });
    return (this.band = false);
  }
  editar(producto: Inventario) {
    this.editOn = true;
    this.selectedProducto = producto;
    this.id = producto.id;
    this.displayModal = true;
  }
  actualizar() {
if(this.select===undefined){
this.showWar2()
}else{
  if(this.select2===undefined){
    this.showWarn()

  }else{

    this._AvicolaService
      .metodoGet('http://localhost:1337/categoria?categoria=' + this.select2)
      .subscribe((data5) => {
        this.idcategoria = data5[0].id;

        this._AvicolaService
          .metodoGet(
            'http://localhost:1337/proveedor?estado=activo&&nombre=' +
              this.select
          )
          .subscribe((data3) => {
            this.idproveedor = data3[0].id;
            this._AvicolaService
              .metodoPut('http://localhost:1337/inventario/' + this.id, {
                 nombre: this.selectedProducto.nombre,
                 descripcion: this.selectedProducto.descripcion,
                 desabastecimiento:this.selectedProducto.desabastecimiento,
                 fechaActualizacion: this.fecha,
                 nombreUsuarioActualizacion: this.user,
                 idCategoria: this.idcategoria,
                 idProveedor: this.idproveedor,
              })
              .subscribe((producto) => {
                this.showSuccess2();
                this.displayModal = false
              });
          });
      });
  }

}


      
      
  }
  eliminar(producto: Inventario) {
    this.selectedProducto = producto;
    this.id = producto.id;
    this._AvicolaService
      .metodoPut('http://localhost:1337/inventario/' + this.id, {
        estado: 'inactivo',
        nombreUsuarioActualizacion: this.user,
      })
      .subscribe(() => {
        this.showSuccess3();
      });
  }
  obtenerFormulario(formulario) {}
  showInfo() {
    this.messageService.add({
      severity: 'info',
      detail: 'Este producto ya se encuentra registrado',
    });
  }
  showWarn() {
    this.messageService.add({
      severity: 'warn',
      detail: 'Escoja una categoria',
    });
  }
  showWar2() {
    this.messageService.add({
      severity: 'warn',
      detail: 'Escoja un proveedor',
    });
  }
  showWar3() {
    this.messageService.add({
      severity: 'warn',
      detail: 'Escoja un estado',
    });
  }
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
  showSuccess3() {
    this.messageService.add({
      severity: 'success',
      detail: 'Producto Eliminado',
    });
    return setTimeout('document.location.reload()', 2200);
  }
  cerrarSesion(){
    this._router.navigate(['inicio/']);
    localStorage.clear()

  }
}
