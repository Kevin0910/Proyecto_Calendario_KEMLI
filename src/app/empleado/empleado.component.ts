import { Component } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html'
})

export class EmpleadoComponent {

  empleados: Empleado [];

  constructor(private empleadoServicio:EmpleadoService){  }

  ngOnInit(): void {
    this.empleadoServicio.getEmpleados().subscribe(
      (empleados) => this.empleados = empleados
      );

    }
}
