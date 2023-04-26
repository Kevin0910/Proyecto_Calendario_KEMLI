import { Component, OnInit } from '@angular/core';
import { Cita } from './cita';
import { CitaService } from './cita.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html'
})
export class CitaComponent{

  citas: Cita[];

  constructor(private citaService: CitaService){}

  ngOnInit() {
    this.citaService.getCitas().subscribe(
      (citas) => this.citas =  citas
    );
  }
  delete(cita:Cita): void{
    swal({
      title: 'Esta seguro?',
      text: `¿Seguro que desea eliminar el cliente ${cita.cliente.primer_nombre} con ID:${cita.cliente.id} ?`,
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
              'Cliente eliminado!',
              `El cliente ${cita.cliente.primer_nombre} ${cita.cliente.apellido_P} ah sido eliminado`,
              'success'
            )
          }
        )
      }
    })
  }
}
