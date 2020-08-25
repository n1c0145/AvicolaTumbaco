import { PedidosComponent } from './../../administrador/pedidos/pedidos.component';
import { Producto } from './../../modelos/producto.interface';
import { Component, OnInit } from '@angular/core';
import { AvicolaService } from './../../servicios/avicola.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nuevopedido',
  templateUrl: './nuevopedido.component.html',
  styleUrls: ['./nuevopedido.component.css'],
})
export class NuevopedidoComponent implements OnInit {
  user;
  productos;
  arraydescripcion = [];
  arraypeso = [];
  arrayprecio = [];
  arraystock = [];
  arraysubtotal = [];
  arrayfechas = [];
  editOn = false;
  datos;
  descripcion;
  peso;
  precio;
  stock;
  fecha;
  val;
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

  agregar(dato: Producto) {
    this.editOn = true;
    this.datos = dato;
    this.descripcion = this.datos.descripcion;
    this.peso = this.datos.peso;
    this.precio = this.datos.precio;
    this.stock = this.datos.stock;
    this.fecha = this.datos.fecha;
  }
  agregar2() {
    if (this.val === undefined) {
      alert('escoja un valor a comprar');
    } else {
      if (this.val > this.stock) {
        alert('No se puede sobrepasar');
      } else {
        alert('Elemento añadido');
        this.arraydescripcion.push(this.descripcion)
        this.arraypeso.push(this.peso)
        this.arrayprecio.push(this.precio)
        this.arraystock.push(this.val)
        this.arraysubtotal.push((this.peso)*(this.precio)*(this.val))
        this.arrayfechas.push(this.fecha)
        this.editOn = false

      }
    }
  }
  eliminar(i){
this.arraydescripcion.splice(i,1)
this.arraypeso.splice(i,1)
this.arrayprecio.splice(i,1)
this.arraystock.splice(i,1)
this.arraysubtotal.splice(i,1)
this.arrayfechas.splice(i,1)
alert('elemento borrado')

  }
}
