import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { PagoI } from '../../../../../../core/models/pago';
import { PagoService } from '../../../../../../core/services/Pago.service';

@Component({
  selector: 'app-pagos-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagos-lista.html',
  styleUrls: ['./pagos-lista.scss']
})
export class PagosLista implements OnInit {
  pagos$: Observable<PagoI[]> = of([]);

  constructor(private pagoService: PagoService) {}

  ngOnInit(): void {
    this.cargarPagos();
  }

  cargarPagos() {
    this.pagos$ = this.pagoService.getPagos();
    this.pagoService.getPagos().subscribe(data => {
      console.log('Pagos cargados (sin filtro):', data);
    });
  }

  trackById(index: number, item: PagoI) {
    return item.id;
  }
}
