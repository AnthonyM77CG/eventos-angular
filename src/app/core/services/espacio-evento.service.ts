import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EspacioEventoI } from '../models/espacio-evento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspacioEventoService {
  private readonly URL = 'http://localhost:8080/api/espacios_evento';
  private readonly http = inject(HttpClient);

  getEspaciosEvento(): Observable<EspacioEventoI[]> {
    return this.http.get<EspacioEventoI[]>(this.URL);
  }

  getEspacioEventoById(id: number): Observable<EspacioEventoI> {
    return this.http.get<EspacioEventoI>(`${this.URL}/${id}`);
  }

  createEspacioEvento(espacio: EspacioEventoI): Observable<EspacioEventoI> {
    return this.http.post<EspacioEventoI>(this.URL, espacio);
  }

  updateEspacioEvento(id: number, espacio: EspacioEventoI): Observable<EspacioEventoI> {
    return this.http.put<EspacioEventoI>(`${this.URL}/actualizar/${id}`, espacio);
  }

  deleteEspacioEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/eliminar/${id}`);
  }
}