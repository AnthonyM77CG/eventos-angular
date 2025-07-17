import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TarifaService } from '../../../../../../core/services/tarifa.service';
import { TarifaI } from '../../../../../../core/models/tarifa';

@Component({
  selector: 'app-tarifas-form',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './tarifas-form.html',
  styleUrl: './tarifas-form.scss'
})
export class TarifasForm implements OnInit {
  private readonly tarifaService = inject(TarifaService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected isEditing = signal<boolean>(false);
  protected errorMsg = signal<string | null>(null);

  tarifa: TarifaI = {
    precio: 0,
    espacioEventoId: 0,
    planId: 0
  };

  formTarifa = new FormGroup({
    precio: new FormControl(this.tarifa.precio, [Validators.required, Validators.min(0.01)]),
    espacioEventoId: new FormControl(this.tarifa.espacioEventoId, [Validators.required]),
    planId: new FormControl(this.tarifa.planId, [Validators.required])
  });

  get precio() {
    return this.formTarifa.get('precio');
  }
  get espacioEventoId() {
    return this.formTarifa.get('espacioEventoId');
  }
  get planId() {
    return this.formTarifa.get('planId');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditing.set(true);
        this.tarifaService.getTarifaById(Number(id)).subscribe({
          next: (tarifaData) => {
            this.tarifa = tarifaData;
            this.formTarifa.patchValue(tarifaData);
          },
          error: () => {
            this.errorMsg.set('No se pudo cargar la tarifa para edición.');
            this.router.navigate(['/admin/tarifas']);
          }
        });
      } else {
        this.isEditing.set(false);
      }
    });
  }

  submitForm(): void {
    if (this.formTarifa.invalid) {
      this.formTarifa.markAllAsTouched();
      return;
    }
    this.errorMsg.set(null);

    const tarifaToSave: TarifaI = {
      ...this.tarifa,
      precio: this.formTarifa.value.precio ?? 0,
      espacioEventoId: this.formTarifa.value.espacioEventoId ?? 0,
      planId: this.formTarifa.value.planId ?? 0
    };

    const operation = this.isEditing()
      ? this.tarifaService.updateTarifa(tarifaToSave.id!, tarifaToSave)
      : this.tarifaService.createTarifa(tarifaToSave);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/admin/tarifas']);
      },
      error: () => {
        this.errorMsg.set('Error al guardar la tarifa. Inténtalo de nuevo.');
      }
    });
  }
}
