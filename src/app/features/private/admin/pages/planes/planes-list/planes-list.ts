import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { PlanService } from '../../../../../../core/services/plan.service';
import { PlanI } from '../../../../../../core/models/plan';

@Component({
  selector: 'app-planes-list',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe],
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
