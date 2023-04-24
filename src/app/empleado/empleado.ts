import { TipoEmpl } from "./tipoEmpl";

export class Empleado{
  id: number;
  primer_nombre: string;
  segundo_nombre: string;
  apellido_P: string;
  apellido_M: string;
  fecha_naci: string;
  domicilio: string;
  correo: string;
  telefono: string;
  tipoDeEmpleado: TipoEmpl;
}
