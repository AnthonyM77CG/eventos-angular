import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagoI } from '../models/pago';
import { ReservaI } from '../models/reserva';

@Injectable({
    providedIn: 'root'
})
export class PagoService {
    private URL = 'http://localhost:8080/api/pagos';

    constructor(private http: HttpClient) { }

    // Crear un pago asociado a una reserva
    createPago(pago: PagoI): Observable<PagoI> {
        return this.http.post<PagoI>(`${this.URL}/agregar`, pago);
    }

    // Obtener un pago por ID de reserva
    getPagoByReservaId(idReserva: number): Observable<PagoI> {
        return this.http.get<PagoI>(`${this.URL}/reserva/${idReserva}`);
    }
}
