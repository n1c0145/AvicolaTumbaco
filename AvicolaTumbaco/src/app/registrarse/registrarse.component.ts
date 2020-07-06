import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';
import { log } from 'util';
@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
  cedula='';
  nombres='';
  usuario='';
  pass='';
  passr='';
  idPerfil='';
  idRegistro='';
  constructor(
    private readonly _router: Router,
    private readonly _loginService: LoginService,
  ) { }

  ngOnInit(): void {
  }
ingresar(){
  this._loginService.crearRegistro({
    cedula:this.cedula,
    nombres:this.nombres,
    idPerfil:1
  }).subscribe(
    (registroCreado)=>{
      alert(JSON.stringify(registroCreado['id']));
      this.idRegistro=JSON.stringify(registroCreado['id']);
      this._loginService.crearCredenciales({
        usuario:this.usuario,
        clave:this.pass,
        idRegistro: this.idRegistro+''
      }).subscribe(
        (registroCreado)=>{
          alert(JSON.stringify(registroCreado));
          const valorLocal = JSON.parse(localStorage.getItem('idPerfil'));
       
        }
      )
    }
  )
}

}
