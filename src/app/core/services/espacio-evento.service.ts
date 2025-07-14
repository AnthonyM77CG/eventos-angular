import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EspacioEventoI } from '../models/espacio-evento';

@Injectable({
  providedIn: 'root'
})
export class EspacioEventoService {
  private URL = 'http://localhost:8080/api/espacios_evento'
  private http = inject(HttpClient)

  getEspaciosEvento() {
    return this.http.get<EspacioEventoI[]>(this.URL)
  }

  getEspacioEventoById(id: number) {
    return this.http.get<EspacioEventoI>(`${this.URL}/${id}`);
  }

  createEspacioEvento(espacio: EspacioEventoI) {
    return this.http.post<EspacioEventoI>(this.URL, espacio);
  }

  updateEspacioEvento(id: number, espacio: EspacioEventoI) {
    return this.http.put<EspacioEventoI>(`${this.URL}/actualizar/${id}`, espacio);
  }

  deleteEspacioEvento(id: number){
    return this.http.delete<EspacioEventoI>(`${this.URL}/eliminar/${id}`)
  }
}
