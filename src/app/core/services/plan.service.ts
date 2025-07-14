import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PlanI } from '../models/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private URL = 'http://localhost:8080/api/planes'
  private http = inject(HttpClient)

  getPlanes() {
    return this.http.get<PlanI[]>(this.URL);
  }
  getPlanById(id: number) {
    return this.http.get<PlanI>(`${this.URL}/${id}`);
  }
}
