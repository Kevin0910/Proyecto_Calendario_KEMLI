import { Component } from '@angular/core';
import { Empleado } from '../../interfaces/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import swal from 'sweetalert2';
import { ModalService } from '../detalle/modal.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html'
})

export class EmpleadoComponent {
  empleados: Empleado [];
  empleadoSeleccionado: Empleado;
  empleadoBusquedas: Empleado[] = []

  constructor(private empleadoServicio:EmpleadoService,
              public modalService: ModalService){  }

  ngOnInit(): void {
    this.empleadoServicio.getEmpleados().subscribe(
      (empleados) => this.empleados = empleados
      );
    }

    busquedaPorNombre(termino: string): void{
      this.empleadoServicio.busquedaCliente(termino).subscribe(
        (empleadoBusquedas => {
          this.empleadoBusquedas = empleadoBusquedas;
        })
      );
    }

    delete(empleado:Empleado): void{
      swal({
        title: 'Esta seguro?',
        text: `¿Seguro que desea eliminar el empleado ${empleado.primer_nombre} ${empleado.apellido_P}?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText:'No, eliminar',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.value) {

          this.empleadoServicio.delete(empleado.id).subscribe(
            response => {
              this.empleados = this.empleados.filter(empl => empl !== empleado)
              swal(
                'Cliente eliminado!',
                `El empleado ${empleado.primer_nombre} ${empleado.apellido_P} ah sido eliminado`,
                'success'
              )
            }
          )
        }
      })
  }

  abrirModal (empleado: Empleado){
    this.empleadoSeleccionado = empleado;
    this.modalService.abrirModalEmpleado();
  }
}
