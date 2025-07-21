import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EspacioEventoI } from '../models/espacio-evento';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspacioEventoService {
  private URL = `${environment.apiBaseUrl}/espacios_evento`;
  private http = inject(HttpClient)

  getEspaciosEvento() {
    return this.http.get<EspacioEventoI[]>(this.URL)
  }

  getEspacioEventoById(id: number) {
    return this.http.get<EspacioEventoI>(`${this.URL}/${id}`);
  }

  createEspacioEvento(espacio: EspacioEventoI) {
    return this.http.post<EspacioEventoI>(`${this.URL}/agregar`, espacio);
  }

  updateEspacioEvento(id: number, espacio: EspacioEventoI) {
    return this.http.put<EspacioEventoI>(`${this.URL}/actualizar/${id}`, espacio);
  }

  deleteEspacioEvento(id: number) {
    return this.http.delete<EspacioEventoI>(`${this.URL}/eliminar/${id}`)
  }
}
