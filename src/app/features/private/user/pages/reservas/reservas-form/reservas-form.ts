import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../../../../core/services/auth.service';
import { ReservaService } from '../../../../../../core/services/reserva.service';
import { EspacioEventoService } from '../../../../../../core/services/espacio-evento.service';
import { Observable } from 'rxjs';
import { EspacioEventoI } from '../../../../../../core/models/espacio-evento';
import { PlanI } from '../../../../../../core/models/plan';
import { ReservaI } from '../../../../../../core/models/reserva';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlanService } from '../../../../../../core/services/plan.service';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../../../../core/services/usuario.service';

@Component({
  selector: 'app-reservas-form',
  imports: [ReactiveFormsModule, AsyncPipe, RouterLink],
  templateUrl: './reservas-form.html',
  styleUrl: './reservas-form.scss'
})
export class ReservasForm implements OnInit {
  private authService = inject(AuthService);
  private usuarioService = inject(UsuarioService)
  private reservaService = inject(ReservaService);
  private espacioService = inject(EspacioEventoService);
  private planService = inject(PlanService);
  private router = inject(Router);

  protected errorMsg = signal<string | null>(null);
  protected espacios$!: Observable<EspacioEventoI[]>;
  protected planes$!: Observable<PlanI[]>;

  reserva: Partial<ReservaI> = {
    fecha: '',
    horaInicio: '',
    horaFin: '',
    asistentes: 1,
    estado: 'PENDIENTE',
    creadoEn: new Date().toISOString(),
    usuario: undefined,
    espacio: undefined,
    plan: undefined
  };

  formReserva = new FormGroup({
    fecha: new FormControl(this.reserva.fecha, [Validators.required]),
    horaInicio: new FormControl(this.reserva.horaInicio, [Validators.required]),
    horaFin: new FormControl(this.reserva.horaFin, [Validators.required]),
    asistentes: new FormControl(this.reserva.asistentes, [Validators.required, Validators.min(1)]),
    espacio: new FormControl(this.reserva.espacio?.id, [Validators.required]),
    plan: new FormControl(this.reserva.plan?.id, [Validators.required])
  });

  ngOnInit(): void {
    this.espacios$ = this.espacioService.getEspaciosEvento();
    this.planes$ = this.planService.getPlanes();
  }

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

  crearReserva() {
    if (this.formReserva.invalid) {
      this.formReserva.markAllAsTouched();
      return;
    }

    this.errorMsg.set(null);

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
          console.log('Usuario obtenido del backend:', usuario);
          const nuevaReserva: ReservaI = {
            fecha: this.formReserva.value.fecha!,
            horaInicio: this.formReserva.value.horaInicio!,
            horaFin: this.formReserva.value.horaFin!,
            asistentes: this.formReserva.value.asistentes!,
            estado: 'PENDIENTE',
            creadoEn: new Date().toISOString(),
            usuario: usuario, // Puedes obtener el correo del usuario si lo tienes en el token o en el servicio de autenticación
            espacio: espacio,
            plan: plan
          };
          this.reservaService.createReserva(nuevaReserva).subscribe({
            next: () => {
              console.log('Reserva creada exitosamente');
              this.router.navigate(['/user/reservas']);
            },
            error: (e) => {
              this.errorMsg.set('Error al crear la reserva. Inténtalo de nuevo.');
              console.error('Error al crear reserva:', e);
            }
          });
        });
      });
    });
  }
}
