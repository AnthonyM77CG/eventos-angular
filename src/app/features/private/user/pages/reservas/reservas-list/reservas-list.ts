import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../../../core/services/auth.service';
import { ReservaService } from '../../../../../../core/services/reserva.service';
import { ReservaI } from '../../../../../../core/models/reserva';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservas-list',
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './reservas-list.html',
  styleUrl: './reservas-list.scss'
})
export class ReservasList implements OnInit {
  private authService = inject(AuthService);
  private reservaService = inject(ReservaService);

  protected reservas$!: Observable<ReservaI[]>;

  ngOnInit(): void {
    this.getReservasByUserId();
  }

  getReservasByUserId(): void {
    const userId = this.authService.getUserIdLogin();
    if (userId) {
      this.reservas$ = this.reservaService.getReservasByUserId(userId).pipe(
        map(reservas => reservas.sort((a, b) =>
          new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
        ))
      );
    }
  }
}
