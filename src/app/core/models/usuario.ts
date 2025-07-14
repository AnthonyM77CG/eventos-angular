import { RolI } from "./rol";

export interface UsuarioI {
    id: number;
    usuario: string; // Nombre de usuario
    correo: string;
    rol: RolI;
}
