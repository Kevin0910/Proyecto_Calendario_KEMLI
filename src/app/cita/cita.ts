import { TipoActividad } from "./tipoActividad";
import { Empleado } from '../empleado/empleado';
import { Cliente } from "../cliente/cliente";

export class Cita {
  id: number;
  fecha_cita: string;
  hora_cita: string;
  direccion: string;
  descripcion: string;
  empleado: Empleado;
  cliente: Cliente;
  tipoDeActividad:TipoActividad;


}
