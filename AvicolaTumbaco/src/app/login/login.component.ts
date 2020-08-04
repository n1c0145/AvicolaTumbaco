import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario = '';
  pass = '';
  band = false;
  idd;
  idstoge;
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

              this._loginService
                .metodoGet(
                  'http://localhost:1337/login?usuario=' +
                    this.usuario +
                    '&&clave=' +
                    this.pass
                )
                .subscribe((resultadoMetodoGet) => {
                  this.idd = resultadoMetodoGet[0].idTipoPerfil.id;
                  this.idstoge = resultadoMetodoGet[0].id;
                  localStorage.setItem('id', JSON.stringify(this.idstoge));
                  console.log(this.idstoge);

                  if (this.idd == 1) {
                    this._router.navigate(['usuario/iniciousuario/']);
                  }
                  if (this.idd == 2) {
                    this._router.navigate([
                      'administrador/inicioadministrador/',
                    ]);
                  }
                });
            }
          }
        }

        if (this.band == false) {
          alert('incorrecto');
        }
      });
  }
}

//localStorage.clear();
