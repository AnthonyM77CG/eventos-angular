import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, of, map } from 'rxjs';
import { ReservaI } from '../../../../../../core/models/reserva';
import { ReservaService } from '../../../../../../core/services/reserva.service';

@Component({
  selector: 'app-reservas-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, FormsModule, DatePipe],
  templateUrl: './reservas-list.html',
  styleUrl: './reservas-list.scss'
})
export class ReservasList implements OnInit {
  private reservaService = inject(ReservaService);

  protected reservas: ReservaI[] = [];
  protected filteredReservas$!: Observable<ReservaI[]>;
  
  // Filtros
  protected mesesDisponibles: {value: string, label: string}[] = [];
  protected mesSeleccionado: string = 'TODOS';
  protected anioSeleccionado: string = 'TODOS';
  protected aniosDisponibles: string[] = [];

  ngOnInit(): void {
    this.getReservas();
  }

  getReservas(): void {
    this.reservaService.getReservas().subscribe(reservas => {
      this.reservas = reservas;
      this.cargarFiltros();
      this.filtrarReservas();
    });
  }

  cargarFiltros(): void {
    const mesesUnicos = new Set<string>();
    const aniosUnicos = new Set<string>();

    this.reservas.forEach(reserva => {
      const fecha = new Date(reserva.fecha);
      if (!isNaN(fecha.getTime())) {
        const mes = fecha.getMonth() + 1; // 1-12
        const mesStr = mes < 10 ? `0${mes}` : `${mes}`;
        const anio = fecha.getFullYear();
        
        mesesUnicos.add(`${anio}-${mesStr}`);
        aniosUnicos.add(`${anio}`);
      }
    });

    // Ordenar meses (más recientes primero)
    this.mesesDisponibles = Array.from(mesesUnicos)
      .sort((a, b) => b.localeCompare(a))
      .map(mes => ({
        value: mes,
        label: this.formatearMes(mes)
      }));

    // Ordenar años (más recientes primero)
    this.aniosDisponibles = Array.from(aniosUnicos)
      .sort((a, b) => b.localeCompare(a));
  }

  formatearMes(mesValue: string): string {
    const [anio, mes] = mesValue.split('-');
    const fecha = new Date(parseInt(anio), parseInt(mes) - 1, 1);
    return fecha.toLocaleDateString('es-PE', { month: 'long', year: 'numeric' });
  }

  filtrarReservas(): void {
    this.filteredReservas$ = of(this.reservas).pipe(
      map(reservas => {
        return reservas.filter(reserva => {
          const fecha = new Date(reserva.fecha);
          if (isNaN(fecha.getTime())) return false;

          // Filtro por mes
          if (this.mesSeleccionado !== 'TODOS') {
            const [anioFiltro, mesFiltro] = this.mesSeleccionado.split('-');
            const mesReserva = fecha.getMonth() + 1;
            const mesReservaStr = mesReserva < 10 ? `0${mesReserva}` : `${mesReserva}`;
            
            if (`${fecha.getFullYear()}-${mesReservaStr}` !== this.mesSeleccionado) {
              return false;
            }
          }

          // Filtro por año
          if (this.anioSeleccionado !== 'TODOS') {
            if (fecha.getFullYear().toString() !== this.anioSeleccionado) {
              return false;
            }
          }

          return true;
        });
      })
    );
  }

  trackById(index: number, item: ReservaI): number {
    return item.id ?? index;
  }
}