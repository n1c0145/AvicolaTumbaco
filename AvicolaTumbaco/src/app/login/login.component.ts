import { log } from 'util';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';
import { __values } from 'tslib';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  band = false;
  usuario = '';
  pass = '';
  admin = 2;
  user = 1;
  constructor(
    private readonly _loginService: LoginService,
    private readonly _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  iniciarSesion() {
    this._loginService
      .metodoGet('http://localhost:1337/login/')
      .subscribe((resultadoParametro) => {
        var rest = JSON.stringify(resultadoParametro);
        for (let key in resultadoParametro) {
          if (this.usuario === resultadoParametro[key]['usuario']) {
            if (this.pass === resultadoParametro[key]['clave']) {
              this.band = true;
              alert('login existoso');
              localStorage.setItem(
                'idusuario',
                JSON.stringify({ idusuario: resultadoParametro[key]['id'] })
              );
              localStorage.setItem(
                'idPerfil',
                JSON.stringify({
                  idPerfil: resultadoParametro[key]['idRegistro']['idPerfil'],
                })
              );
              var valorLocal = localStorage.getItem('idPerfil');

              if (valorLocal === '{"idPerfil":1}') {
                this._router.navigate(['usuario/iniciousuario/']);
              } else {
                this._router.navigate(['administrador/inicioadministrador/']);
              }
            }
          }
        }

        if (this.band == false) {
          alert('incorrecto');
        }
      });
  }
}
