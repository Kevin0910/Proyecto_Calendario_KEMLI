import { Component, OnInit } from '@angular/core';
import { Cita } from '../../interfaces/cita';

import swal from 'sweetalert2';
import { ModalCitaService } from '../detalle-cita/modal-cita.service';
import { CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html'
})
export class CitaComponent{

  citas: Cita[];
  citaSeleccionado: Cita;
  citaBusquedas: Cita[] =[];

  constructor(private citaService: CitaService,
              public modalCitaService:ModalCitaService){}

  ngOnInit() {
    this.citaService.getCitas().subscribe(
      (citas) => this.citas =  citas
    );
  }

  busquedaPorNombre(termino: string): void{
    this.citaService.busquedaCita(termino).subscribe(
      (citaBusquedas => {
        this.citaBusquedas = citaBusquedas;
      })
    );
  }

  delete(cita:Cita): void{
    swal({
      title: 'Esta seguro?',
      text: `¿Seguro que desea eliminar la cita del cliente ${cita.cliente.primer_nombre} ${cita.cliente.apellido_P} con el id cita ${cita.cliente.id} ?`,
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
              `La cita del cliente ${cita.cliente.primer_nombre} ${cita.cliente.apellido_P} ah sido eliminado`,
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
