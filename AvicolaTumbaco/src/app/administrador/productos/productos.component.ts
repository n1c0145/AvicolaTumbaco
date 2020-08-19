import { AvicolaService } from './../../servicios/avicola.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Inventario } from '../../modelos/inventario.interface';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  nombre: '';
  descripcion: '';
  imagen: '';
  categoria;
  stock: '';
  idproveedor;
  idcategoria;
  fecha = new Date();
  prueba1;
  prueba2;
  id;
  user;
  select;
  select2;
  productos;
  proveedor;
  editOn = false;
  selectedProducto: Inventario;
  constructor(
    private readonly _router: Router,
    private readonly _AvicolaService: AvicolaService
  ) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this._AvicolaService
      .metodoGet('http://localhost:1337/inventario?estado=activo')
      .subscribe((data) => {
        this.productos = data;
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
    if (this.select2 === undefined) {
      alert('escoja una categoria');
    } else {
      if (this.select === undefined) {
        alert('escoja un proveedor ');
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
                    imagen: this.imagen,
                    stock: this.stock,
                    estado: 'activo',
                    fechaCreacion: this.fecha,
                    nombreUsuarioCreacion: this.user,
                    fechaActualizacion: this.fecha,
                    nombreUsuarioActualizacion: this.user,
                    idCategoria: this.idcategoria,
                    idProveedor: this.idproveedor,
                  })
                  .subscribe((registroCreado) => {
                    alert('Producto creado');
                  });
              });
          });
      }
    }
  }

  editar(producto: Inventario) {
    this.editOn = true;
    this.selectedProducto = producto;
    this.id = producto.id;
  }
  actualizar() {

    if (this.select2 === undefined) {
      alert('escoja una categoria');
    } else {
      if (this.select === undefined) {
        alert('escoja un proveedor ');
      } else {
      }
    }
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
                imagen: this.selectedProducto.imagen,
                fechaActualizacion: this.fecha,
                nombreUsuarioActualizacion: this.user,
                idCategoria: this.idcategoria,
                idProveedor: this.idproveedor,
            })
              .subscribe((producto) => {
                alert('Producto Actualizado');
               location.reload();
              });
     
            });
        });

     
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
        alert('Producto eliminado');
        location.reload();
      });


  }
}
