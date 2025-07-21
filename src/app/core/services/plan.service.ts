import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PlanI } from '../models/plan';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private URL = `${environment.apiBaseUrl}/planes`;
  private http = inject(HttpClient);

  getPlanes() {
    return this.http.get<PlanI[]>(this.URL);
  }

  getPlanById(id: number) {
    return this.http.get<PlanI>(`${this.URL}/${id}`);
  }

  createPlan(plan: PlanI) {
    return this.http.post<PlanI>(`${this.URL}/agregar`, plan);
  }

  updatePlan(id: number, plan: PlanI) {
    return this.http.put<PlanI>(`${this.URL}/actualizar/${id}`, plan);
  }

  deletePlan(id: number) {
    return this.http.delete<PlanI>(`${this.URL}/eliminar/${id}`);
  }
}
