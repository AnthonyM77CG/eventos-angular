import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservaI } from '../models/reserva';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private URL = `${environment.apiBaseUrl}/reservas`;
  private http = inject(HttpClient);

  getReservas() {
    return this.http.get<ReservaI[]>(this.URL);
  }

  getReservasByUserId(userId: number) {
    return this.http.get<ReservaI[]>(`${this.URL}/usuario/${userId}`);
  }

  createReserva(reserva: ReservaI) {
    return this.http.post<ReservaI>(`${this.URL}/agregar`, reserva);
  }
}
