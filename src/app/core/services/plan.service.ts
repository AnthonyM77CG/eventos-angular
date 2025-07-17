import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlanI } from '../models/plan';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private baseUrl = 'http://localhost:8080/api/planes';

  constructor(private http: HttpClient) {}

  getPlanes(): Observable<PlanI[]> {
    return this.http.get<PlanI[]>(`${this.baseUrl}`);
  }

  getPlanById(id: number): Observable<PlanI> {
    return this.http.get<PlanI>(`${this.baseUrl}/${id}`);
  }

  createPlan(plan: PlanI): Observable<PlanI> {
    return this.http.post<PlanI>(`${this.baseUrl}/agregar`, plan);
  }

  updatePlan(id: number, plan: PlanI): Observable<PlanI> {
    return this.http.put<PlanI>(`${this.baseUrl}/actualizar/${id}`, plan);
  }

  deletePlan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eliminar/${id}`);
  }
}
