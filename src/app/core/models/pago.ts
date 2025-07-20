export interface PagoI {
    id?: number;
    monto: number;
    metodoPago: 'TARJETA' | 'EFECTIVO' | 'TRANSFERENCIA';
    fechaPago: string;
    reserva: { id: number };
}
