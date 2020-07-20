import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { InventarioService } from '../../servicios/inventario.service';
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
  productos: Inventario[];
  editOn = false;
  selectedProducto: Inventario;
  constructor(
    private readonly _router: Router,
    private readonly _InventarioService: InventarioService
  ) {}
  ngOnInit(): void {
    this._InventarioService
      .metodoGet()
      .subscribe((data) => (this.productos = data));
  }
  insertar() {
    this._InventarioService
      .crearRegistro({
        nombre: this.nombre,
        descripcion: this.descripcion,
        imagen: this.imagen,
        categoria: this.categoria,
        stock: this.stock,
      })
      .subscribe((registroCreado) => {
        alert('Producto creado');
      });
  }
  eliminar(producto: Inventario) {
    this._InventarioService.metodoDelete(producto.id).subscribe();
    this.productos = this.productos.filter((c) => c.id != producto.id);
    alert('Producto Eliminado')
  }
  editar(producto:Inventario){
    this.editOn = true;
    this.selectedProducto = producto;
  }

actualizar(producto:Inventario){
this._InventarioService.metodoPut(producto).subscribe((producto)=>{
  alert('Producto Actualizado')
  this.editOn=false
})

}

}
