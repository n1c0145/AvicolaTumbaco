import { Proveedor } from './../modelos/proveedor.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private readonly _httpClient: HttpClient) { }

  metodoGet(url: string) {
    return this._httpClient.get(url);
  }
  crearProveedor(datosRegistroCrear) {
    const url = 'http://localhost:1337/proveedor';
    return this._httpClient.post(url, datosRegistroCrear);
  }
  metodoPut(url: string, datos) {
    return this._httpClient.put(url, datos);
  }
}
