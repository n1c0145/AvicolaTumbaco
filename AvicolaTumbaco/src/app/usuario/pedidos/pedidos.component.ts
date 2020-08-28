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
  user;
  id;
    constructor(
      private readonly _router: Router,
      private readonly _AvicolaService: AvicolaService
    ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.id = localStorage.getItem('id');

    this._AvicolaService
      .metodoGet('http://localhost:1337/factura?idRegistro=' + this.id)
      .subscribe((data) => {
        this.facturas = data;
        
      });
  }
  facturar(pedido:Factura){
    this.id=pedido.id
    localStorage.removeItem('idFactura');

    localStorage.setItem('idFactura', JSON.stringify(this.id));
    this._router.navigate(['usuario/factura/']);

  }
}
