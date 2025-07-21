import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagoI } from '../models/pago';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PagoService {
    private URL = `${environment.apiBaseUrl}/pagos`;

    constructor(private http: HttpClient) { }

    createPago(pago: PagoI): Observable<PagoI> {
        return this.http.post<PagoI>(`${this.URL}/agregar`, pago);
    }

    getPagoByReservaId(idReserva: number): Observable<PagoI> {
        return this.http.get<PagoI>(`${this.URL}/reserva/${idReserva}`);
    }

    getPagos(): Observable<PagoI[]> {
        return this.http.get<PagoI[]>(this.URL);
    }

    getPagoById(id: number): Observable<PagoI> {
        return this.http.get<PagoI>(`${this.URL}/${id}`);
    }

    updatePago(id: number, pago: PagoI): Observable<PagoI> {
        return this.http.put<PagoI>(`${this.URL}/actualizar/${id}`, pago);
    }

    deletePago(id: number): Observable<void> {
        return this.http.delete<void>(`${this.URL}/eliminar/${id}`);
    }
}
