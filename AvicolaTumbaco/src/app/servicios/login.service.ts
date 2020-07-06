import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  crearRegistro(datosRegistroCrear){
    const url = 'http://localhost:1337/registro';
    return this._httpClient.post(url,datosRegistroCrear);
}
crearCredenciales(datosCredencialesCrear){
  const url = 'http://localhost:1337/login';
  return this._httpClient.post(url,datosCredencialesCrear);
}



}