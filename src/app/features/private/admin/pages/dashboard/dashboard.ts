import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspacioEventoService } from '../../../../../core/services/espacio-evento.service';
import { ReservaService } from '../../../../../core/services/reserva.service';
import { UsuarioService } from '../../../../../core/services/usuario.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {
  private espacioService = inject(EspacioEventoService);
  private reservaService = inject(ReservaService);
  private usuarioService = inject(UsuarioService);

  protected totalSalones = signal<number>(0);
  protected totalReservas = signal<number>(0);
  protected totalUsuarios = signal<number>(0);

  protected loading = signal<boolean>(true);
  protected error = signal<string | null>(null);

  ngOnInit(): void {
    this.cargarMetricas();
  }

  cargarMetricas(): void {
    this.loading.set(true);
    this.error.set(null);
    forkJoin({
      salones: this.espacioService.getEspaciosEvento(),
      reservas: this.reservaService.getReservas(),
      usuarios: this.usuarioService.getUsuarios()
    }).subscribe({
      next: ({ salones, reservas, usuarios }) => {
        this.totalSalones.set(salones.length);
        this.totalReservas.set(reservas.length);
        this.totalUsuarios.set(usuarios.length);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar las métricas del dashboard:', err);
        this.error.set('No se pudieron cargar las métricas. Inténtalo de nuevo más tarde.');
        this.loading.set(false);
      }
    });
  }
}
