import { PedidosComponent } from './../../administrador/pedidos/pedidos.component';
import { Producto } from './../../modelos/producto.interface';
import { Component, OnInit } from '@angular/core';
import { AvicolaService } from './../../servicios/avicola.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nuevopedido',
  templateUrl: './nuevopedido.component.html',
  styleUrls: ['./nuevopedido.component.css']
})
export class NuevopedidoComponent implements OnInit {
user;
productos;
pedido=[];
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
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    console.log(this.user);
    this._AvicolaService
      .metodoGet('http://localhost:1337/producto?estado=activo')
      .subscribe((data) => {
        this.productos = data;
      });
  }

  agregar(dato:Producto){
    this.editOn=true
    this.datos=dato
    this.descripcion=this.datos.descripcion
    this.peso=this.datos.peso 
    this.precio=this.datos.precio
    this.stock=this.datos.stock
    this.fecha=this.datos.fecha
  }

}
