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
  fecha = new Date();
  user;
  id;
  productos;
  editOn = false;
  selectedProducto: Inventario;
  constructor(
    private readonly _router: Router,
    private readonly _AvicolaService: AvicolaService
  ) {}
  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this._AvicolaService.metodoGet('http://localhost:1337/inventario?estado=activo')
      .subscribe((data) => (this.productos = data));
  }
  ingresar() {
    this._AvicolaService.crearProducto({
        nombre: this.nombre,
        descripcion: this.descripcion,
        imagen: this.imagen,
        categoria: this.categoria,
        stock: this.stock,
        estado: 'activo',
        fechaCreacion: this.fecha,
        nombreUsuarioCreacion: this.user,
        fechaActualizacion: this.fecha,
        nombreUsuarioActualizacion: this.user,
      })
      .subscribe((registroCreado) => {
        alert('Producto creado');
      });
  }

  editar(producto:Inventario){
    this.editOn = true;
    this.selectedProducto = producto;
    this.id=producto.id
  }

actualizar(){
this._AvicolaService.metodoPut('http://localhost:1337/inventario/' + this.id,{
  nombre: this.selectedProducto.nombre,
  descripcion: this.selectedProducto.descripcion,
  imagen: this.selectedProducto.imagen,
  categoria: this.selectedProducto.categoria,
  fechaActualizacion: this.fecha,
  nombreUsuarioActualizacion: this.user,
}).subscribe((producto)=>{
  alert('Producto Actualizado')
  location.reload();
})

}
eliminar(producto: Inventario) {
  this.selectedProducto = producto;
  this.id = producto.id;
  this._AvicolaService.metodoPut('http://localhost:1337/inventario/' + this.id,{
    estado: 'inactivo',
    nombreUsuarioActualizacion: this.user,
  }).subscribe(()=>{
    alert('Producto eliminado');
    location.reload();
  })
}
}