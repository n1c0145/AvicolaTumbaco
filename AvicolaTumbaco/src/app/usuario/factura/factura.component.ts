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
  id=0;
  constructor(
    private readonly _router: Router,
    private readonly _AvicolaService: AvicolaService
  ) {}

  ngOnInit(): void {
    this.idfactura = (localStorage.getItem('idFactura'));
    this.id=this.idfactura.substr(1,1.5)
console.log(this.idfactura);

    this._AvicolaService
      .metodoGet(
        'http://localhost:1337/factura?estado=activo&&id='+this.id
      )
      .subscribe((data) => {
        this.factura = data;
        console.log(this.factura);
        
      });
  }
}
