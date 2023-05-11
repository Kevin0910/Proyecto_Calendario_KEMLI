import { Component, OnInit } from '@angular/core';
import { Cita } from '../../interfaces/cita';

import swal from 'sweetalert2';
import { ModalCitaService } from '../detalle-cita/modal-cita.service';
import { CitaService } from '../../services/cita.service';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { Empleado } from 'src/app/interfaces/empleado';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html'
})
export class CitaComponent{

  citas: Cita[];
  citaSeleccionado: Cita;
  citaBusquedas: Cita[] =[];

  // empleados: Empleado[];
  // empleadoBusquedas: Empleado[] = [];


  mostrarBusqClientes = false;
  mostrarBusqEmpleado = false;

  constructor(private citaService: CitaService,
              private empleadoService: EmpleadoService,
              public modalCitaService:ModalCitaService){}

  ngOnInit() {
    this.citaService.getCitas().subscribe(
      (citas) => this.citas =  citas
    );
  }

  busqCliente(termino: string): void {
    if (termino !== '') {
      this.citaService.busqCliente(termino).subscribe(
        citas => this.citaBusquedas = citas
      );
    } else {
      this.citaBusquedas = [];
    }
  }

  busqEmpleado(termino: string): void {
    if (termino !== '') {
      this.citaService.busqEmpleado(termino).subscribe(
        citas => this.citaBusquedas = citas
      );
    } else {
      this.citaBusquedas = [];
    }
  }


  delete(cita:Cita): void{
    swal({
      title: 'Esta seguro?',
      text: `¿Seguro que desea eliminar la cita del cliente ${cita.cliente.nombreDelCliente} ${cita.cliente.apellido_P} con el id cita ${cita.cliente.id} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'No, eliminar',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.citaService.delete(cita.id).subscribe(
          response => {
            this.citas = this.citas.filter(ci => ci !== cita)
            swal(
              'Cita eliminada!',
              `La cita del cliente ${cita.cliente.nombreDelCliente} ${cita.cliente.apellido_P} ah sido eliminado`,
              'success'
            )
          }
        )
      }
    })
  }

  //ELIMINAR CLIENTE DE BUSQUEDA
  deleteBusqueda(busquedaCita:Cita): void{
    swal({
      title: 'Esta seguro?',
      text: `¿Seguro que desea eliminar el cliente ${busquedaCita.cliente.nombreDelCliente} ${busquedaCita.cliente.apellido_P}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'No, eliminar',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {

        this.citaService.delete(busquedaCita.id).subscribe(
          response => {
            this.citaBusquedas = this.citaBusquedas.filter(busqCita => busqCita !== busquedaCita)
            swal(
              'Cliente eliminado!',
              `El cliente ${busquedaCita.cliente.nombreDelCliente} ${busquedaCita.cliente.apellido_P} ah sido eliminado`,
              'success'
            )
          }
        )
      }
    })
  }

abrirModal(cita:Cita){
  this.citaSeleccionado = cita;
  this.modalCitaService.abrirModalCita();
  }
}
