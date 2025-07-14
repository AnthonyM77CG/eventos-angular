import { Component, inject, OnInit } from '@angular/core';
import { EspacioEventoService } from '../../../../../core/services/espacio-evento.service';
import { Observable, shareReplay, tap } from 'rxjs';
import { EspacioEventoI } from '../../../../../core/models/espacio-evento';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-espacio-evento',
  imports: [AsyncPipe],
  templateUrl: './espacio-evento.html',
  styleUrl: './espacio-evento.scss'
})
export class EspacioEvento implements OnInit{
  private espacioService = inject(EspacioEventoService)
  protected espacios$!: Observable<EspacioEventoI[]>
  protected espacio$!: Observable<EspacioEventoI> 

  ngOnInit(): void {
      this.getEspacioEvento()
  }

  getEspacioEvento() {
    this.espacios$ = this.espacioService.getEspaciosEvento()
  }

  getEspacioEventoById(id: number) {
    this.espacio$ = this.espacioService.getEspacioEventoById(id)
  }

  createEspacioEvento(espacio: EspacioEventoI) {
    this.espacio$ = this.espacioService.createEspacioEvento(espacio)
  }

  updateEspacioEvento(id: number, espacio: EspacioEventoI) {
    this.espacio$ = this.espacioService.updateEspacioEvento(id, espacio)
  }

  deleteEspacioEvento(id: number) {
    this.espacio$ = this.espacioService.deleteEspacioEvento(id)
  }
}
