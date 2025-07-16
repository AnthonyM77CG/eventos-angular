import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EspacioEventoService } from '../../../../../../core/services/espacio-evento.service';
import { EspacioEventoI } from '../../../../../../core/models/espacio-evento';

@Component({
  selector: 'app-espacio-evento-form',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './espacio-evento-form.html',
  styleUrl: './espacio-evento-form.scss'
})
export class EspacioEventoForm implements OnInit {
  private readonly espacioService = inject(EspacioEventoService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute)

  protected isEditing = signal<boolean>(false);
  protected errorMsg = signal<string | null>(null);

  espacio: EspacioEventoI = {
    nombre: '',
    ubicacion: '',
    aforoMaximo: 0,
    descripcion: ''
  };

  formEspacio = new FormGroup({
    nombre: new FormControl(this.espacio.nombre, [Validators.required, Validators.minLength(3)]),
    ubicacion: new FormControl(this.espacio.ubicacion, [Validators.required, Validators.minLength(3)]),
    aforoMaximo: new FormControl(this.espacio.aforoMaximo, [Validators.required, Validators.min(1)]),
    descripcion: new FormControl(this.espacio.descripcion, [Validators.maxLength(500)])
  });

  get nombre() {
    return this.formEspacio.get('nombre');
  }
  get ubicacion() {
    return this.formEspacio.get('ubicacion');
  }
  get aforoMaximo() {
    return this.formEspacio.get('aforoMaximo');
  }
  get descripcion() {
    return this.formEspacio.get('descripcion');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditing.set(true);
        this.espacioService.getEspacioEventoById(Number(id)).subscribe({
          next: (espacioData) => {
            this.espacio = espacioData; 
            this.formEspacio.patchValue(espacioData); 
          },
          error: (err) => {
            console.error('Error al cargar el local para edición:', err);
            this.errorMsg.set('No se pudo cargar el local para edición.');
            this.router.navigate(['/admin/locales']); 
          }
        });
      } else {
        this.isEditing.set(false);
      }
    });
  }

  submitForm(): void {
    if (this.formEspacio.invalid) {
      this.formEspacio.markAllAsTouched();
      return;
    }
    this.errorMsg.set(null);

    const espacioToSave: EspacioEventoI = {
      ...this.espacio,
      nombre: this.formEspacio.value.nombre ?? '', 
      ubicacion: this.formEspacio.value.ubicacion ?? '',
      aforoMaximo: this.formEspacio.value.aforoMaximo ?? 0, 
      descripcion: this.formEspacio.value.descripcion ?? '',
    };

    const operation = this.isEditing()
      ? this.espacioService.updateEspacioEvento(espacioToSave.id!, espacioToSave)
      : this.espacioService.createEspacioEvento(espacioToSave);
    operation.subscribe({
      next: () => {
        console.log('Operación exitosa');
        this.router.navigate(['/admin/locales']);
      },
      error: (e) => {
        this.errorMsg.set('Error al guardar el local. Inténtalo de nuevo.');
        console.error('Error al guardar local:', e);
      }
    });
  }

}
