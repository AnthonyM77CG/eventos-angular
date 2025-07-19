export interface PagoI {
    id?: number;
    monto: number;
    metodoPago: 'TARJETA' | 'EFECTIVO' | 'TRANSFERENCIA';
    estadoPago: 'COMPLETADO' | 'REEMBOLSADO';
    fechaPago: string;
    reserva: { id: number };
}
