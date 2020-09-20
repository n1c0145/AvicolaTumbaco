import { AvicolaService } from './../servicios/avicola.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  usuario = '';
  pass = '';
  band = false;
  idd;
  idstoge;
  user = '';

  constructor(
    private readonly _AvicolaService: AvicolaService,
    private readonly _activatedRoute: ActivatedRoute,
    private _router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  iniciarSesion() {
    this._AvicolaService
      .metodoGet('http://localhost:1337/login?estado=activo')
      .subscribe((resultadoParametro) => {
        var rest = JSON.stringify(resultadoParametro);
        for (let key in resultadoParametro) {
          if (this.usuario === resultadoParametro[key]['usuario']) {
            if (this.pass === resultadoParametro[key]['clave']) {
              this.band = true;

              this._AvicolaService
                .metodoGet(
                  'http://localhost:1337/login?estado=activo&&usuario=' +
                    this.usuario +
                    '&&clave=' +
                    this.pass
                )
                .subscribe((resultadoMetodoGet) => {
                  this.idd = resultadoMetodoGet[0].idTipoPerfil.id;
                  this.idstoge = resultadoMetodoGet[0].id;
                  this.user = resultadoMetodoGet[0].usuario;
                  localStorage.clear();
                  localStorage.setItem('id', JSON.stringify(this.idstoge));
                  localStorage.setItem('user', JSON.stringify(this.user));
                  localStorage.setItem('log', JSON.stringify('login'));
                  if (this.idd == 1) {
                    this.showSuccess();
                    localStorage.setItem('log', JSON.stringify('loginUser'));
 
                  }
                  if (this.idd == 2) {
                    this.showSuccess2();
                    localStorage.setItem('log', JSON.stringify('loginAdmin'));

                  }
                });
            }
          }
        }

        if (this.band == false) {
          this.showError();
        }
      });
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Usuario o Contraseña incorrectos',
    });
  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      detail: 'Login Exitoso , Bienvenido',
    });
    return setTimeout(
      () => this._router.navigate(['usuario/iniciousuario/']),
      2200
    );
  }
  showSuccess2() {
    this.messageService.add({
      severity: 'success',
      detail: 'Login Exitoso , Bienvenido',
    });
    return setTimeout(
      () => this._router.navigate(['administrador/inicioadministrador/']),
      2200
    );
  }
}

//localStorage.clear();
