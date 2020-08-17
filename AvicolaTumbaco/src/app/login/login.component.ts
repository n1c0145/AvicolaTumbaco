import { AvicolaService } from './../servicios/avicola.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  user = '';
  constructor(
    private readonly _AvicolaService: AvicolaService,
    private readonly _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  iniciarSesion() {
    this._AvicolaService
      .metodoGet('http://localhost:1337/login/')
      .subscribe((resultadoParametro) => {
        var rest = JSON.stringify(resultadoParametro);
        for (let key in resultadoParametro) {
          if (this.usuario === resultadoParametro[key]['usuario']) {
            if (this.pass === resultadoParametro[key]['clave']) {
              this.band = true;
              alert('login existoso');

              this._AvicolaService
                .metodoGet(
                  'http://localhost:1337/login?usuario=' +
                    this.usuario +
                    '&&clave=' +
                    this.pass
                )
                .subscribe((resultadoMetodoGet) => {
                  
                  this.idd = resultadoMetodoGet[0].idTipoPerfil.id;
                  this.idstoge = resultadoMetodoGet[0].id;
                  this.user = resultadoMetodoGet[0].usuario
                  localStorage.setItem('id', JSON.stringify(this.idstoge));
                  localStorage.setItem('user', JSON.stringify(this.user));
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
