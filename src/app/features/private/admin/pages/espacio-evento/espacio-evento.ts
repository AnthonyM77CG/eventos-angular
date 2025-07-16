import { Component, inject, OnInit } from '@angular/core';
import { EspacioEventoService } from '../../../../../core/services/espacio-evento.service';
import { Observable, tap } from 'rxjs';
import { EspacioEventoI } from '../../../../../core/models/espacio-evento';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-espacio-evento',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './espacio-evento.html',
  styleUrls: ['./espacio-evento.scss']
})
export class EspacioEvento implements OnInit {
  private readonly espacioService = inject(EspacioEventoService);

  protected espacios$!: Observable<EspacioEventoI[]>;
  protected showForm = false;
  protected selectedEspacio: EspacioEventoI = {
    nombre: '',
    ubicacion: '',
    aforoMaximo: 0,
    descripcion: ''
  };
  protected isEditing = false;

  ngOnInit(): void {
    this.getEspacioEvento();
  }

  getEspacioEvento(): void {
    this.espacios$ = this.espacioService.getEspaciosEvento();
  }

  openCreateForm(): void {
    this.selectedEspacio = {
      nombre: '',
      ubicacion: '',
      aforoMaximo: 0,
      descripcion: ''
    };
    this.isEditing = false;
    this.showForm = true;
  }

  openEditForm(espacio: EspacioEventoI): void {
    this.selectedEspacio = { ...espacio };
    this.isEditing = true;
    this.showForm = true;
  }

  submitForm(): void {
    const operation = this.isEditing
      ? this.espacioService.updateEspacioEvento(this.selectedEspacio.id!, this.selectedEspacio)
      : this.espacioService.createEspacioEvento(this.selectedEspacio);

    operation.pipe(
      tap(() => {
        this.getEspacioEvento();
        this.showForm = false;
      })
    ).subscribe();
  }

  deleteEspacioEvento(id: number): void {
    if (confirm('¿Estás seguro de eliminar este espacio?')) {
      this.espacioService.deleteEspacioEvento(id).pipe(
        tap(() => this.getEspacioEvento())
      ).subscribe();
    }
  }
}