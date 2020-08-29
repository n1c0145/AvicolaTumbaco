import { AvicolaService } from './../../servicios/avicola.service';
import { Proveedor } from './../../modelos/proveedor.interface';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css'],
})
export class ProveedorComponent implements OnInit {
  nombre = '';
  descripcion = '';
  telefono = '';
  estado = '';
  fecha = new Date();
  user;
  proveedores;
  editOn = false;
  selectedProveedor: Proveedor;
  proveedor: Proveedor[];
  id;
  band = false;
  filterPost = '';
  constructor(
    private readonly _router: Router,
    private readonly _AvicolaService: AvicolaService
  ) {}

  ngOnInit(): void {
    
    this.user = localStorage.getItem('user');
    this._AvicolaService
      .metodoGet('http://localhost:1337/proveedor?estado=activo')
      .subscribe((data) => {
        this.proveedores = data;
      });
  }
  ingresar() {
    this._AvicolaService
    .metodoGet('http://localhost:1337/proveedor?estado=activo')
    .subscribe((resultado) => {
      var rest = resultado;
      for (let key in resultado) {
        if (this.nombre == resultado[key]['nombre']) {
          this.band = true;
          alert('Esta proveedor ya se encuetra registrado');
    }
      }
    
console.log(this.band);

  if(this.band==false){
  

        this._AvicolaService.crearProveedor({
          nombre:this.nombre,
          descripcion:this.descripcion,
          telefono:this.telefono,
          estado: 'activo',
          fechaCreacion: this.fecha,
          nombreUsuarioCreacion: this.user,
          fechaActualizacion: this.fecha,
          nombreUsuarioActualizacion: this.user,
        }).subscribe((registrocreado)=>{
       alert('Proveedor Creador');
        })
     }
});
     return (this.band = false);
  }
  editar(proveedor: Proveedor) {
    this.editOn = true;
    this.selectedProveedor = proveedor;
    this.id = proveedor.id;
  }
  actualizar() {
    this._AvicolaService
      .metodoPut('http://localhost:1337/proveedor/' + this.id, {
        nombre: this.selectedProveedor.nombre,
        descripcion: this.selectedProveedor.descripcion,
        telefono: this.selectedProveedor.telefono,
        fechaActualizacion: this.fecha,
        nombreUsuarioActualizacion: this.user,
      })
      .subscribe(() => {
        alert('Proveedor Actualizado');
        location.reload();
      });
  }
  eliminar(proveedor: Proveedor) {
    this.selectedProveedor = proveedor;
    this.id = proveedor.id;
    this._AvicolaService
      .metodoPut('http://localhost:1337/proveedor/' + this.id, {
        estado: 'inactivo',
        nombreUsuarioActualizacion: this.user,
      })
      .subscribe(() => {
        alert('Proveedor eliminado');
        location.reload();
      });
  }
}
