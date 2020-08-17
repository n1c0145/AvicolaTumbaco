import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../modelos/login.interface';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  nombre = '';
  apellido= '';
  direccion = '';
  telefono= '';
  estado= '';
  fechaCreacion= '';
  nombreUsuarioCreacion= '';
  fechaActualizacion= '';
  nombreUsuarioActualizacion= '';
  usuario= '';
  clave= '';
  idTipoPerfil= '';
  usuarios;
  id;
  constructor(
    private readonly _router: Router,
  ) { }

  ngOnInit(): void {

    
  }

}
