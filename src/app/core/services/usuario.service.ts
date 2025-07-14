import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UsuarioI } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private URL = 'http://localhost:8080/api/usuarios'
  private http = inject(HttpClient)

  getUsuarios() {
    return this.http.get<UsuarioI[]>(this.URL);
  }

  getUsuarioById(id: number) {
    return this.http.get<UsuarioI>(`${this.URL}/${id}`)
  }
}
