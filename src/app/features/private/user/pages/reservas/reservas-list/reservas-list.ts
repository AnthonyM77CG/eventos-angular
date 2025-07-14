import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../../../core/services/auth.service';
import { ReservaService } from '../../../../../../core/services/reserva.service';
import { ReservaI } from '../../../../../../core/models/reserva';
import { catchError, Observable, of, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservas',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './reservas-list.html',
  styleUrl: './reservas-list.scss'
})
export class ReservasList implements OnInit {
  private authService = inject(AuthService)
  private reservaService = inject(ReservaService);
  protected reservas$!: Observable<ReservaI[]>;

  ngOnInit(): void {
    this.getReservasByUserId()
  }

  getReservasByUserId(): void {
    const userId = this.authService.getUserIdLogin();
    console.log(userId)
    if (userId) {
      this.reservas$ = this.reservaService.getReservasByUserId(userId)
    }
  }
}
