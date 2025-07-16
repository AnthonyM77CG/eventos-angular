import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EspacioEventoService } from '../../../../../../core/services/espacio-evento.service';
import { EspacioEventoI } from '../../../../../../core/models/espacio-evento';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-espacio-evento-list',
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './espacio-evento-list.html',
  styleUrl: './espacio-evento-list.scss'
})
export class EspacioEventoList implements OnInit {
  private espacioService = inject(EspacioEventoService);
  protected espacios$!: Observable<EspacioEventoI[]>;

  ngOnInit(): void {
    this.getEspaciosEvento();
  }

  deleteEspacioEvento(id: number): void {
    if (confirm('¿Estás seguro de eliminar este espacio?')) {
      this.espacioService.deleteEspacioEvento(id).pipe(
        tap(() => this.getEspaciosEvento())
      ).subscribe();
    }
  }

  getEspaciosEvento() {
    this.espacios$ = this.espacioService.getEspaciosEvento();
  }


}
