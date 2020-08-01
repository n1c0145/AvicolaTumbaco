import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }
  metodoGet(url: string){
    return this._httpClient.get(url);
}

  crearRegistro(datosRegistroCrear){
    const url = 'http://localhost:1337/registro';
    return this._httpClient.post(url,datosRegistroCrear);
}
crearLogin(datosCredencialesCrear){
  const url = 'http://localhost:1337/login';
  return this._httpClient.post(url,datosCredencialesCrear);
}

crearPerfil(datosCredencialesCrear){
  const url = 'http://localhost:1337/TipoPerfil';
  return this._httpClient.post(url,datosCredencialesCrear);
}

}
