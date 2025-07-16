import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ReservaI } from '../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private URL = 'http://localhost:8080/api/reservas'
  private http = inject(HttpClient)

  getReservas() {
    return this.http.get<ReservaI[]>(this.URL)
  }

  getReservasByUserId(userId: number) {
    return this.http.get<ReservaI[]>(`${this.URL}/usuario/${userId}`);
  }

  createReserva(reserva: ReservaI) {
    return this.http.post<ReservaI>(`${this.URL}/agregar`, reserva);
  }
}
