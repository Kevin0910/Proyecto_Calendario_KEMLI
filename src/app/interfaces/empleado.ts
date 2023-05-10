import { TipoEmpl } from "./tipoEmpl";

export class Empleado{
  id: number;
  nombreDelEmpleado: string;
  apellido_P: string;
  apellido_M: string;
  fecha_naci: string;
  domicilio: string;
  correo: string;
  telefono: string;
  tipoDeEmpleado: TipoEmpl;
}
