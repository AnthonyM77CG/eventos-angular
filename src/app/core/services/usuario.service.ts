import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UsuarioI } from '../models/usuario';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private URL = `${environment.apiBaseUrl}/usuarios`;
  private http = inject(HttpClient)

  getUsuarios() {
    return this.http.get<UsuarioI[]>(this.URL);
  }

  getUsuarioById(id: number) {
    return this.http.get<UsuarioI>(`${this.URL}/${id}`)
  }
}
