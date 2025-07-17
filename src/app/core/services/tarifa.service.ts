import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { TarifaI } from '../models/tarifa';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {
  private baseUrl = 'http://localhost:8080/api/tarifas';
  private http = inject(HttpClient);

  getTarifas() {
    return this.http.get<TarifaI[]>(this.baseUrl);
  }

  getTarifaById(id: number) {
    return this.http.get<TarifaI>(`${this.baseUrl}/${id}`);
  }

  createTarifa(tarifa: TarifaI) {
    return this.http.post<TarifaI>(`${this.baseUrl}/agregar`, tarifa);
  }

  updateTarifa(id: number, tarifa: TarifaI) {
    return this.http.put<TarifaI>(`${this.baseUrl}/actualizar/${id}`, tarifa);
  }

  deleteTarifa(id: number) {
    return this.http.delete<TarifaI>(`${this.baseUrl}/eliminar/${id}`);
  }
}
