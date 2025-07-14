import { Component, inject, OnInit } from '@angular/core';
import { ReservaService } from '../../../../../../core/services/reserva.service';
import { Observable } from 'rxjs';
import { ReservaI } from '../../../../../../core/models/reserva';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-reservas-list',
  imports: [AsyncPipe],
  templateUrl: './reservas-list.html',
  styleUrl: './reservas-list.scss'
})
export class ReservasList implements OnInit {
  private reservaService = inject(ReservaService);
  protected reservas$!: Observable<ReservaI[]>;

  ngOnInit(): void {
    this.getReservas()
  }

  getReservas() {
    this.reservas$ = this.reservaService.getReservas()
  }
}
