import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';
@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
  cedula='';
  nombre='';
  apellido = '';
  direccion = '';
  telefono = '';
  usuario='';
  pass='';
  idPerfil='';
  idRegistro='';
  select;

  constructor(
    private readonly _router: Router,
    private readonly _loginService: LoginService,
  ) { }

  ngOnInit(): void {
  }
ingresar(){
  if(this.select == 1){

    this._loginService.crearRegistro({
      cedula:this.cedula,
      nombre:this.nombre,
      apellido:this.apellido,
      direccion:this.direccion,
      telefono:this.telefono,
      idPerfil:1
    }).subscribe(
      (registroCreado)=>{
        alert('Usuario Registrado');
        this.idRegistro=JSON.stringify(registroCreado['id']);
        this._loginService.crearCredenciales({
          usuario:this.usuario,
          clave:this.pass,
          idRegistro: this.idRegistro+''
        }).subscribe(
          (registroCreado)=>{
           
            const valorLocal = JSON.parse(localStorage.getItem('idPerfil'));
        
          }
        )
      }
    )
    this._router.navigate(['login']);

  }else if(this.select == 2){
   
    this._loginService.crearRegistro({
      cedula:this.cedula,
      nombre:this.nombre,
      apellido:this.apellido,
      direccion:this.direccion,
      telefono:this.telefono,
      idPerfil:2
    }).subscribe(
      (registroCreado)=>{
        alert('Administrador Registrado');
        this.idRegistro=JSON.stringify(registroCreado['id']);
        this._loginService.crearCredenciales({
          usuario:this.usuario,
          clave:this.pass,
          idRegistro: this.idRegistro+''
        }).subscribe(
          (registroCreado)=>{
           
            const valorLocal = JSON.parse(localStorage.getItem('idPerfil'));
        
          }
        )
      }
    )
    this._router.navigate(['login']);

  }else if(this.select !== 1&&2){
    alert('Escoja un tipo de usuario')

  }
 
}

}
