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
    creadoEn: new Date().toISOString(),
    usuario: undefined,
    espacio: undefined,
    plan: undefined
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
    metodoPago: new FormControl<'TARJETA' | 'EFECTIVO' | 'TRANSFERENCIA'>('TARJETA', [Validators.required]),
    estadoPago: new FormControl<'COMPLETADO' | 'REEMBOLSADO'>('COMPLETADO', [Validators.required])
  });

  ngOnInit(): void {
    this.espacios$ = this.espacioService.getEspaciosEvento();
    this.planes$ = this.planService.getPlanes();

    // Actualiza el metodo de pago del pagoProyectado cuando el usuario cambia el select
    this.formReserva.get('metodoPago')?.valueChanges.subscribe((metodo) => {
      if (this.pagoProyectado) {
        this.pagoProyectado.metodoPago = metodo!;
      }
    });

    // Actualiza el estado del pago también si es necesario
    this.formReserva.get('estadoPago')?.valueChanges.subscribe((estado) => {
      if (this.pagoProyectado) {
        this.pagoProyectado.estadoPago = estado!;
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
    const username = this.authService.getUsernameLogin();

    if (!userId || !username) {
      this.errorMsg.set('No se pudo obtener la información del usuario logueado.');
      return;
    }

    const selectedEspacioId = this.formReserva.value.espacio;
    const selectedPlanId = this.formReserva.value.plan;

    this.espacioService.getEspacioEventoById(selectedEspacioId!).subscribe(espacio => {
      this.planService.getPlanById(selectedPlanId!).subscribe(plan => {
        this.usuarioService.getUsuarioById(userId!).subscribe(usuario => {
          const nuevaReserva: ReservaI = {
            fecha: this.formReserva.value.fecha!,
            horaInicio: this.formReserva.value.horaInicio!,
            horaFin: this.formReserva.value.horaFin!,
            asistentes: this.formReserva.value.asistentes!,
            estado: 'CONFIRMADA',
            creadoEn: new Date().toISOString(),
            usuario: usuario,
            espacio: espacio,
            plan: plan
          };

          this.reservaService.createReserva(nuevaReserva).subscribe({
            next: (reservaCreada) => {
              this.isReservaCreada = true;
              this.isReservaBeingCreated = false;
              this.reservaCreada = reservaCreada;

              // Crea el pago proyectado para mostrarlo
              this.pagoProyectado = {
                monto: this.selectedPlanPrecio ?? plan.precio,
                metodoPago: this.formReserva.value.metodoPago!,
                estadoPago: this.formReserva.value.estadoPago!,
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
    if (!this.isReservaCreada) {
      this.errorMsg.set('Primero crea la reserva antes de realizar el pago.');
      return;
    }

    if (!this.pagoProyectado) {
      this.errorMsg.set('No hay un pago proyectado disponible.');
      return;
    }

    this.isPagoBeingCreated = true;

    this.pagoService.createPago(this.pagoProyectado).subscribe({
      next: (pagoCreado) => {
        this.isPagoBeingCreated = false;
        this.pagoCreado = pagoCreado;
        this.isPagoCreado = true;
        console.log('Pago creado:', pagoCreado);
        this.router.navigate(['/user/reservas']);
      },
      error: (e) => {
        this.isPagoBeingCreated = false;
        this.errorMsg.set('Error al crear el pago. Inténtalo de nuevo.');
        console.error('Error al crear pago:', e);
      }
    });
  }
}
