import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inventario } from '../modelos/inventario.interface';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private url = 'http://localhost:1337/inventario';
  constructor(private readonly _httpClient: HttpClient) {}

  crearRegistro(datosRegistroCrear) {
    const url = 'http://localhost:1337/inventario';
    return this._httpClient.post(url, datosRegistroCrear);
  }
  metodoGet(): Observable<Inventario[]> {
    return this._httpClient.get<Inventario[]>(this.url);
  }
  metodoPut(inventario: Inventario): Observable<Inventario> {
    this.url = `${this.url}/${inventario.id}`;
    return this._httpClient.put<Inventario>(this.url, inventario);
  }

  metodoDelete(id: string): Observable<{}> {
    this.url = `${this.url}/${id}`;
    return this._httpClient.delete(this.url);
  }
}
