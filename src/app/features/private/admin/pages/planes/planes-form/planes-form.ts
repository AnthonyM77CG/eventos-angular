import { CommonModule } from '@angular/common'
import { Component, OnInit, inject, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { PlanService } from '../../../../../../core/services/plan.service'
import { PlanI } from '../../../../../../core/models/plan'

@Component({
  selector: 'app-planes-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './planes-form.html',
  styleUrl: './planes-form.scss'
})
export class PlanesForm implements OnInit {
  private planService = inject(PlanService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)

  protected isEditing = signal(false)
  protected errorMsg = signal<string | null>(null)

  plan: PlanI = { nombre: '', descripcion: '', precio: 0 }

  formPlan = new FormGroup({
    nombre: new FormControl(this.plan.nombre, [Validators.required, Validators.minLength(3)]),
    descripcion: new FormControl(this.plan.descripcion, [Validators.maxLength(500)]),
    precio: new FormControl(this.plan.precio, [Validators.required, Validators.min(0)])
  })

  get nombre() {
    return this.formPlan.get('nombre')
  }

  get descripcion() {
    return this.formPlan.get('descripcion')
  }

  get precio() {
    return this.formPlan.get('precio')
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id) {
        this.isEditing.set(true)
        this.planService.getPlanById(Number(id)).subscribe({
          next: (planData) => {
            this.plan = planData
            this.formPlan.patchValue(planData)
          },
          error: (err) => {
            console.error('Error al cargar el plan:', err)
            this.errorMsg.set('No se pudo cargar el plan para edición.')
            this.router.navigate(['/admin/planes'])
          }
        })
      }
    })
  }

  submitForm(): void {
    if (this.formPlan.invalid) {
      this.formPlan.markAllAsTouched()
      return
    }

    this.errorMsg.set(null)

    const planToSave: PlanI = {
      ...this.plan,
      nombre: this.formPlan.value.nombre ?? '',
      descripcion: this.formPlan.value.descripcion ?? '',
      precio: this.formPlan.value.precio ?? 0
    }

    const operation = this.isEditing()
      ? this.planService.updatePlan(planToSave.id!, planToSave)
      : this.planService.createPlan(planToSave)

    operation.subscribe({
      next: () => this.router.navigate(['/admin/planes']),
      error: (err) => {
        console.error('Error al guardar el plan:', err)
        this.errorMsg.set('Error al guardar el plan. Inténtalo de nuevo.')
      }
    })
  }
}
