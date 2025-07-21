import { RolI } from "./rol";

export interface UsuarioI {
    id: number;
    usuario: string;
    correo: string;
    rol: RolI;
}
