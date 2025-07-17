import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PlanService } from '../../../../../../core/services/plan.service';
import { PlanI } from '../../../../../../core/models/plan';

@Component({
  selector: 'app-planes-form',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './planes-form.html',
  styleUrl: './planes-form.scss'
})
export class PlanesForm implements OnInit {
  private readonly planService = inject(PlanService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute)

  protected isEditing = signal<boolean>(false);
  protected errorMsg = signal<string | null>(null);

  plan: PlanI = {
    id: 0,
    nombre: '',
    descripcion: ''
  };

  formPlan = new FormGroup({
    nombre: new FormControl(this.plan.nombre, [Validators.required, Validators.minLength(3)]),
    descripcion: new FormControl(this.plan.descripcion, [Validators.maxLength(500)])
  });

  get nombre() {
    return this.formPlan.get('nombre');
  }

  get descripcion() {
    return this.formPlan.get('descripcion');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditing.set(true);
        this.planService.getPlanById(Number(id)).subscribe({
          next: (planData) => {
            this.plan = planData;
            this.formPlan.patchValue(planData);
          },
          error: (err) => {
            console.error('Error al cargar el plan para edición:', err);
            this.errorMsg.set('No se pudo cargar el plan para edición.');
            this.router.navigate(['/admin/planes']);
          }
        });
      } else {
        this.isEditing.set(false);
      }
    });
  }

  submitForm(): void {
    if (this.formPlan.invalid) {
      this.formPlan.markAllAsTouched();
      return;
    }
    this.errorMsg.set(null);

    const planToSave: PlanI = {
      ...this.plan,
      nombre: this.formPlan.value.nombre ?? '',
      descripcion: this.formPlan.value.descripcion ?? ''
    };

    const operation = this.isEditing()
      ? this.planService.updatePlan(planToSave.id!, planToSave)
      : this.planService.createPlan(planToSave);
    operation.subscribe({
      next: () => {
        console.log('Operación exitosa');
        this.router.navigate(['/admin/planes']);
      },
      error: (e) => {
        this.errorMsg.set('Error al guardar el plan. Inténtalo de nuevo.');
        console.error('Error al guardar plan:', e);
      }
    });
  }

}
