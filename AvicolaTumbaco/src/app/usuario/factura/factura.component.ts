import { Component, OnInit } from '@angular/core';
import { AvicolaService } from './../../servicios/avicola.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
})
export class FacturaComponent implements OnInit {
  idfactura;
  factura;
  array;
  id = 0;
  descripcion;
  peso;
  preciolibra;
  cantidad;
  subtotalpedido;
  iddetalle;
  detallefactura;

  constructor(
    private readonly _router: Router,
    private readonly _AvicolaService: AvicolaService
  ) {}

  ngOnInit(): void {
    this.idfactura = localStorage.getItem('idFactura');

    var texto = this.idfactura.split('');
    var numeroPalabras = texto.length;

    if (numeroPalabras > 1) {
      this.id = this.idfactura.substr(1, 1.5);
    } else {
      this.id = this.idfactura;
    }

    this._AvicolaService
      .metodoGet('http://localhost:1337/factura?id=' + this.id)
      .subscribe((data) => {
        this.factura = data;

        this.iddetalle = data[0].idDetalleFactura.id;
        this._AvicolaService
          .metodoGet(
            'http://localhost:1337/detallefactura?id=' + this.iddetalle
          )
          .subscribe((data) => {
            this.detallefactura = data;
            this.array = data;
            for (let i in this.array) {
              this.descripcion = this.array[i]['descripcionFactura'];
              this.peso = this.array[i]['peso'];
              this.preciolibra = this.array[i]['precioPorLibra'];
              this.cantidad = this.array[i]['cantidad'];
              this.subtotalpedido = this.array[i]['subtotalPorPedido'];
            }
          });
      });
  }
}
