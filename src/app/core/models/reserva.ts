import { EspacioEventoI } from "./espacio-evento";
import { PlanI } from "./plan";
import { UsuarioI } from "./usuario";

export interface ReservaI {
    id?: number;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    asistentes: number;
    estado: 'CONFIRMADA' | 'CANCELADA';
    creadoEn: string;
    usuario: UsuarioI;
    espacio: EspacioEventoI;
    plan: PlanI;
}
