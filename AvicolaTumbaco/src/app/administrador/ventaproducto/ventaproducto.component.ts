import { Producto } from './../../modelos/producto.interface';
import { AvicolaService } from './../../servicios/avicola.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventaproducto',
  templateUrl: './ventaproducto.component.html',
  styleUrls: ['./ventaproducto.component.css'],
})
export class VentaproductoComponent implements OnInit {
  descripcion;
  peso;
  precio;
  stock;
  fecha = new Date();
  val;
  id;
  user;
  date: Date;
  selectedProducto: Producto;
  producto:Producto[];
  editOn = false;
productos;
  constructor(
    private readonly _router: Router,
    private readonly _AvicolaService: AvicolaService
  ) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this._AvicolaService
    .metodoGet('http://localhost:1337/producto?estado=activo')
    .subscribe((data) => {
      this.productos = data;
    });
  }
  ingresar() {
    if (this.stock === undefined) {
      alert('Coloque un numero de stock');
    } else {
      if (this.date === undefined) {
        alert('Escoja una fecha');
      } else {
        this._AvicolaService
          .crearVenta({
            descripcion: 'pollos',
            peso: this.peso,
            precio: this.precio,
            stock: this.stock,
            fecha:this.date,
            estado: 'activo',
            fechaCreacion: this.fecha,
            nombreUsuarioCreacion: this.user,
            fechaActualizacion: this.fecha,
            nombreUsuarioActualizacion: this.user,
   
          })
          .subscribe((registroCreado) => {
            alert('Producto creado');
            location.reload()
          });
      }
    }
  }
  editar(producto:Producto){
    this.editOn = true;
    this.selectedProducto = producto;
    this.id = producto.id;
  }
  eliminar(producto:Producto){
    this.selectedProducto = producto;
    this.id = producto.id;
    this._AvicolaService.metodoPut('http://localhost:1337/producto/' + this.id,{
      estado: 'inactivo',
      nombreUsuarioActualizacion: this.user,
    }).subscribe(()=>{
      alert('Producto eliminado');
      location.reload();
    })
  }
  actualizar(){

    this._AvicolaService.metodoPut('http://localhost:1337/producto/' + this.id,{
      descripcion: this.selectedProducto.descripcion,
      peso: this.peso,
      precio: this.selectedProducto.precio,
      stock:this.stock,
      fecha:this.date,
      fechaActualizacion: this.fecha,
      nombreUsuarioActualizacion: this.user,
    }).subscribe(()=>{
      alert('Proveedor Actualizado')
      location.reload();
    })


  }
}
