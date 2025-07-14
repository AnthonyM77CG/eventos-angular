export interface PagoI {
    id: number;
    monto: number; // BigDecimal en Java se mapea a number en JSON
    metodoPago: 'TARJETA' | 'EFECTIVO' | 'TRANSFERENCIA';
    estadoPago: 'PENDIENTE' | 'COMPLETADO' | 'REEMBOLSADO';
    fechaPago: string; // LocalDateTime en Java se mapea a string en JSON
}
