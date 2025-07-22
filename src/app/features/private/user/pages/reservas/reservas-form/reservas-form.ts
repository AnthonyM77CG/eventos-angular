import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../../../../core/services/auth.service';
import { ReservaService } from '../../../../../../core/services/reserva.service';
import { EspacioEventoService } from '../../../../../../core/services/espacio-evento.service';
import { Observable } from 'rxjs';
import { EspacioEventoI } from '../../../../../../core/models/espacio-evento';
import { PlanI } from '../../../../../../core/models/plan';
import { ReservaI } from '../../../../../../core/models/reserva';
import { PagoI } from '../../../../../../core/models/pago';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlanService } from '../../../../../../core/services/plan.service';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../../../../core/services/usuario.service';
import { PagoService } from '../../../../../../core/services/Pago.service';

@Component({
  selector: 'app-reservas-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reservas-form.html',
  styleUrl: './reservas-form.scss'
})
export class ReservasForm implements OnInit {
  private authService = inject(AuthService);
  private usuarioService = inject(UsuarioService);
  private reservaService = inject(ReservaService);
  private pagoService = inject(PagoService);
  private espacioService = inject(EspacioEventoService);
  private planService = inject(PlanService);
  private router = inject(Router);

  protected errorMsg = signal<string | null>(null);
  protected espacios$!: Observable<EspacioEventoI[]>;
  protected planes$!: Observable<PlanI[]>;

  protected isReservaCreada = false;
  protected isReservaBeingCreated = false;
  protected isPagoBeingCreated = false;
  protected isPagoCreado = false;

  reserva: Partial<ReservaI> = {
    fecha: '',
    horaInicio: '',
    horaFin: '',
    asistentes: 1,
    estado: 'CONFIRMADA',
    creadoEn: new Date().toISOString()
  };

  reservaCreada: ReservaI | null = null;
  selectedPlanPrecio: number | null = null;
  pagoCreado: PagoI | null = null;
  pagoProyectado: PagoI | null = null;

  formReserva = new FormGroup({
    fecha: new FormControl(this.reserva.fecha, [Validators.required]),
    horaInicio: new FormControl(this.reserva.horaInicio, [Validators.required]),
    horaFin: new FormControl(this.reserva.horaFin, [Validators.required]),
    asistentes: new FormControl(this.reserva.asistentes, [Validators.required, Validators.min(1)]),
    espacio: new FormControl(this.reserva.espacio?.id, [Validators.required]),
    plan: new FormControl(this.reserva.plan?.id, [Validators.required]),
    metodoPago: new FormControl<'TARJETA' | 'EFECTIVO' | 'TRANSFERENCIA'>('TARJETA', [Validators.required])
  });

  get fecha() {
    return this.formReserva.get('fecha');
  }
  get horaInicio() {
    return this.formReserva.get('horaInicio');
  }
  get horaFin() {
    return this.formReserva.get('horaFin');
  }
  get asistentes() {
    return this.formReserva.get('asistentes');
  }
  get espacio() {
    return this.formReserva.get('espacio');
  }
  get plan() {
    return this.formReserva.get('plan');
  }
  get metodoPago() {
    return this.formReserva.get('metodoPago');
  }

  ngOnInit(): void {
    this.espacios$ = this.espacioService.getEspaciosEvento();
    this.planes$ = this.planService.getPlanes();

    this.formReserva.get('metodoPago')?.valueChanges.subscribe((metodo) => {
      if (this.pagoProyectado) {
        this.pagoProyectado.metodoPago = metodo!;
      }
    });
  }

  onPlanChange(event: any): void {
    const selectedPlanId = event.target.value;
    this.planService.getPlanById(selectedPlanId).subscribe(plan => {
      this.selectedPlanPrecio = plan.precio;
      if (this.pagoProyectado) {
        this.pagoProyectado.monto = plan.precio;
      }
    });
  }

  crearReserva() {
    if (this.formReserva.invalid) {
      this.formReserva.markAllAsTouched();
      return;
    }

    this.errorMsg.set(null);
    this.isReservaBeingCreated = true;

    const userId = this.authService.getUserIdLogin();
    const selectedEspacioId = this.formReserva.value.espacio;
    const selectedPlanId = this.formReserva.value.plan;

    if (!userId || !selectedEspacioId || !selectedPlanId) return;

    this.espacioService.getEspacioEventoById(selectedEspacioId).subscribe(espacio => {
      this.planService.getPlanById(selectedPlanId).subscribe(plan => {
        this.usuarioService.getUsuarioById(userId).subscribe(usuario => {
          const nuevaReserva: ReservaI = {
            fecha: this.formReserva.value.fecha!,
            horaInicio: this.formReserva.value.horaInicio!,
            horaFin: this.formReserva.value.horaFin!,
            asistentes: this.formReserva.value.asistentes!,
            estado: 'CONFIRMADA',
            creadoEn: new Date().toISOString(),
            usuario,
            espacio,
            plan
          };

          this.reservaService.createReserva(nuevaReserva).subscribe({
            next: (reservaCreada) => {
              this.isReservaCreada = true;
              this.isReservaBeingCreated = false;
              this.reservaCreada = reservaCreada;

              this.pagoProyectado = {
                monto: plan.precio,
                metodoPago: this.formReserva.value.metodoPago!,
                fechaPago: new Date().toISOString(),
                reserva: { id: reservaCreada.id! }
              };

              console.log('Reserva creada:', reservaCreada);
              console.log('Pago proyectado:', this.pagoProyectado);
            },
            error: (e) => {
              this.isReservaBeingCreated = false;
              this.errorMsg.set('Error al crear la reserva. Inténtalo de nuevo.');
              console.error('Error al crear reserva:', e);
            }
          });
        });
      });
    });
  }

  crearPago() {
    if (!this.pagoProyectado) return;

    this.isPagoBeingCreated = true;

    this.pagoService.createPago(this.pagoProyectado).subscribe({
      next: (pago) => {
        this.isPagoBeingCreated = false;
        this.isPagoCreado = true;
        this.pagoCreado = pago;
        console.log('Pago insertado:', pago);
      },
      error: (e) => {
        this.isPagoBeingCreated = false;
        this.errorMsg.set('Error al crear el pago.');
        console.error('Error al crear pago:', e);
      }
    });
  }
}
