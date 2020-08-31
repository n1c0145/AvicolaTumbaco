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
  cambiostock = [];
  editOn = false;
  editOn2 = false;
  datos;
  descripcion;
  peso;
  precio;
  stock;
  fecha;
  val;
  id;
  idd;
  direccion = '';
  direc = '';
  date: Date;
  finaldate;
  fechavalida = false;
  idFactura;
  fechaactual = new Date();
  subtotal = 0;
  arraysubtotal2 = [];
  total;
  persona;
  prueba;

  constructor(
    private readonly _router: Router,
    private readonly _AvicolaService: AvicolaService
  ) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.id = localStorage.getItem('id');

    this._AvicolaService
      .metodoGet('http://localhost:1337/producto?estado=activo')
      .subscribe((data) => {
        this.productos = data;
      });
  }

  agregar(dato: Producto) {
    this.editOn = true;
    this.datos = dato;
    this.idd = this.datos.id;
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
        this.arraydescripcion.push(this.descripcion);
        this.arraypeso.push(this.peso);
        this.arrayprecio.push(this.precio);
        this.arraystock.push(this.val);
        this.arraysubtotal2.push(
          (this.peso * this.precio * this.val).toFixed(2)
        );
        this.arraysubtotal.push(this.peso * this.precio * this.val);
        this.arrayfechas.push(this.fecha);
        this.cambiostock.push(this.val);
        this.editOn = false;
        this._AvicolaService
          .metodoPut('http://localhost:1337/producto/' + this.idd, {
            stock: this.stock - this.val,
          })
          .subscribe(() => {});
      }
    }
  }
  eliminar(i) {
    this.arraydescripcion.splice(i, 1);
    this.arraypeso.splice(i, 1);
    this.arrayprecio.splice(i, 1);
    this.arraystock.splice(i, 1);
    this.arraysubtotal.splice(i, 1);
    this.arraysubtotal2.splice(i, 1);
    this.arrayfechas.splice(i, 1);

    this._AvicolaService
      .metodoPut('http://localhost:1337/producto/' + this.idd, {
        stock: this.stock,
      })
      .subscribe(() => {
        alert('elemento borrado');
      });
  }
  pedir() {
    if (this.arraydescripcion.length > 0) {
      this.editOn2 = true;
      this._AvicolaService
        .metodoGet(
          'http://localhost:1337/registro?estado=activo&&id=' + this.id
        )
        .subscribe((data) => {
          this.persona = data;
          for (let i in this.persona) {
            this.direc = this.persona[i]['direccion'];
            console.log(this.direc);
          }
        });
    } else {
      alert('Aun no compra nada');
    }
  }
  comprar() {
    if(this.direccion==""){
alert('Direccion no valida')
    }else{

   
    if (this.date === undefined) {
      alert('Escoja una fecha');
    } else {
      this.finaldate = this.date.toISOString().slice(0, 10);

      for (var i = 0; i < this.arrayfechas.length; i++) {
        if (this.finaldate > this.arrayfechas[i]) {
          this.fechavalida = true;
        } else {
          this.fechavalida = false;
        }
      }

      if (this.fechavalida == true) {
        this._AvicolaService
          .metodoPut('http://localhost:1337/registro/' + this.id, {
            direccion: this.direccion,
            fechaActualizacion: this.fechaactual,
            nombreUsuarioActualizacion: this.user,
          })
          .subscribe(() => {
            // --- Creacion factura

            for (var i = 0; i < this.arraysubtotal.length; i++) {
              this.subtotal += this.arraysubtotal[i];
            }

            this.total = this.subtotal * 0.12 + this.subtotal;

            this._AvicolaService
              .crearDetalleFactura({
                descripcionFactura: this.arraydescripcion,
                peso: this.arraypeso,
                precioPorLibra: this.arrayprecio,
                cantidad: this.arraystock,
                subtotalPorPedido: this.arraysubtotal2,
                subtotal: this.subtotal.toFixed(2),
                total: this.total.toFixed(2),
                fechaEntrega: this.date,
                estado: 'activo',
                fechaCreacion: this.fechaactual,
                nombreUsuarioCreacion: this.user,
                fechaActualizacion: this.fechaactual,
                nombreUsuarioActualizacion: this.user,
              })
              .subscribe((registro) => {
                this.idFactura = JSON.stringify(registro['id']);
                this._AvicolaService
                  .crearFactura({
                    fechaEmision: this.fechaactual,
                    estado: 'activo',
                    fechaCreacion: this.fechaactual,
                    nombreUsuarioCreacion: this.user,
                    fechaActualizacion: this.fechaactual,
                    nombreUsuarioActualizacion: this.user,
                    idDetalleFactura: this.idFactura + '',
                    idRegistro: this.id,
                    idDatosEmpresa: 1,
                  })
                  .subscribe((registroCreado) => {
                    this.idFactura = JSON.stringify(registroCreado['id']);
                    
                    localStorage.removeItem('idFactura');
                    localStorage.setItem(
                      'idFactura',
                      JSON.stringify(this.idFactura)
                    );
                    alert('todo creado' + this.idFactura);
                    this._router.navigate(['usuario/factura/']);
                  });
              });
          });
      } else {
        alert('fecha no valida');
      }
    }
  }
  }
 
}