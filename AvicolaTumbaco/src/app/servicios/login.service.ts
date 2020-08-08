import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Login } from '../modelos/login.interface';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:1337/registro';
  constructor(private readonly _httpClient: HttpClient) {}
  metodoGet(url: string) {
    return this._httpClient.get(url);
  }

  crearRegistro(datosRegistroCrear) {
    const url = 'http://localhost:1337/registro';
    return this._httpClient.post(url, datosRegistroCrear);
  }
  crearLogin(datosCredencialesCrear) {
    const url = 'http://localhost:1337/login';
    return this._httpClient.post(url, datosCredencialesCrear);
  }
  metodoPut(url: string, datos) {
    return this._httpClient.put(url, datos);
  }
  metodoPatch(login: Login): Observable<Login> {
    this.url = `${this.url}/${login.id}`;
    return this._httpClient.patch<any>(this.url, login);
  }

}
