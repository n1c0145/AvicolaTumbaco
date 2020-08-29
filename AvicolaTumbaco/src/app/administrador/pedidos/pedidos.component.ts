import { Component, OnInit } from '@angular/core';
import { AvicolaService } from './../../servicios/avicola.service';
import { Router } from '@angular/router';
import { Factura } from "../../modelos/factura.interface";
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
facturas;
facturasentregadas;
user;
id;
filterPost ='';
filterPost2 ='';
  constructor(
    private readonly _router: Router,
    private readonly _AvicolaService: AvicolaService
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this._AvicolaService
      .metodoGet('http://localhost:1337/factura?estado=activo')
      .subscribe((data) => {
        this.facturas = data;
        
      });
      this.user = localStorage.getItem('user');
      this._AvicolaService
        .metodoGet('http://localhost:1337/factura?estado=entregado')
        .subscribe((data) => {
          this.facturasentregadas = data;
          
        });
  }
cambiar(pedido:Factura){
this.id=pedido.id
this._AvicolaService
.metodoPut('http://localhost:1337/factura/' + this.id, {
  estado: 'entregado',
  nombreUsuarioActualizacion: this.user,
})
.subscribe(() => {
  alert('Pedido entregado');
  location.reload();
});
}
eliminar(pedido:Factura){
  this.id=pedido.id
  this._AvicolaService
  .metodoPut('http://localhost:1337/factura/' + this.id, {
    estado: 'inactivo',
    nombreUsuarioActualizacion: this.user,
  })
  .subscribe(() => {
    alert('Pedido eliminado');
    location.reload();
  });
  }
  facturar(pedido:Factura){
    this.id=pedido.id
    localStorage.removeItem('idFactura');

    localStorage.setItem('idFactura', JSON.stringify(this.id));
    this._router.navigate(['administrador/factura/']);

  }
}
