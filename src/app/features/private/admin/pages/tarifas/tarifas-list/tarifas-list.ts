import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TarifaService } from '../../../../../../core/services/tarifa.service';
import { TarifaI } from '../../../../../../core/models/tarifa';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-tarifas-list',
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './tarifas-list.html',
  styleUrl: './tarifas-list.scss'
})
export class TarifasList implements OnInit {
  private tarifaService = inject(TarifaService);
  protected tarifas$!: Observable<TarifaI[]>;

  ngOnInit(): void {
    this.getTarifas();
  }

  deleteTarifa(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta tarifa?')) {
      this.tarifaService.deleteTarifa(id).pipe(
        tap(() => this.getTarifas())
      ).subscribe();
    }
  }

  getTarifas() {
    this.tarifas$ = this.tarifaService.getTarifas();
  }
}
