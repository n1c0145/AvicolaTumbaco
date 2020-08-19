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
  categoria: '';
  stock: '';
  idproveedor;
  prueba;
  fecha = new Date();
  user;
  select;
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
  }

  ingresar() {
   
if(this.select===undefined){
  alert('escoja un proveedor')
}else{

  this._AvicolaService
  .metodoGet(
    'http://localhost:1337/proveedor?estado=activo&&nombre=' + this.select
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
          idProveedor: this.idproveedor,
        })
        .subscribe((registroCreado) => {
           alert('Producto creado');
         });
    
  });
}

  }

  editar() {}

  eliminar() {}
}
