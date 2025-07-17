import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlanService } from '../../../../../../core/services/plan.service';
import { PlanI } from '../../../../../../core/models/plan';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-planes-list',
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './planes-list.html',
  styleUrl: './planes-list.scss'
})
export class PlanesList implements OnInit {
  private planService = inject(PlanService);
  protected planes$!: Observable<PlanI[]>;

  ngOnInit(): void {
    this.getPlanes();
  }

  deletePlan(id: number): void {
    if (confirm('¿Estás seguro de eliminar este plan?')) {
      this.planService.deletePlan(id).pipe(
        tap(() => this.getPlanes())
      ).subscribe();
    }
  }

  getPlanes() {
    this.planes$ = this.planService.getPlanes();
  }
}
