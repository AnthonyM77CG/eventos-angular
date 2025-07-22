import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComentarioI } from '../models/comentario';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ComentarioService {
    private URL = `${environment.apiBaseUrl}/comentarios`;
    private http = inject(HttpClient);

    getComentarios(): Observable<ComentarioI[]> {
        return this.http.get<ComentarioI[]>(this.URL);
    }

    deleteComentario(id: number): Observable<void> {
        return this.http.delete<void>(`${this.URL}/eliminar/${id}`);
    }

    crearComentario(data: ComentarioI): Observable<ComentarioI> {
        return this.http.post<ComentarioI>(`${this.URL}/crear`, data);
    }
}
