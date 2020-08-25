import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AvicolaService {

  constructor(private readonly _httpClient: HttpClient) {}
  metodoGet(url: string) {
    return this._httpClient.get(url);
  }
  metodoPut(url: string, datos) {
    return this._httpClient.put(url, datos);
  }
  crearRegistro(datosRegistroCrear) {
    const url = 'http://localhost:1337/registro';
    return this._httpClient.post(url, datosRegistroCrear);
  }
  crearLogin(datosCredencialesCrear) {
    const url = 'http://localhost:1337/login';
    return this._httpClient.post(url, datosCredencialesCrear);
  }
  crearProducto(datosRegistroCrear) {
    const url = 'http://localhost:1337/inventario';
    return this._httpClient.post(url, datosRegistroCrear);
  }
  crearProveedor(datosRegistroCrear) {
    const url = 'http://localhost:1337/proveedor';
    return this._httpClient.post(url, datosRegistroCrear);
  }
  crearVenta(datosRegistroCrear) {
    const url = 'http://localhost:1337/producto';
    return this._httpClient.post(url, datosRegistroCrear);
  }

}
