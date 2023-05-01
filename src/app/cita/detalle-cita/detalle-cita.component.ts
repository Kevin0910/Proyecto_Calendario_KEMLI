import { Component, Input } from '@angular/core';
import { ModalCitaService } from './modal-cita.service';
import { Cita } from '../components/cita';

@Component({
  selector: 'detalle-cita',
  templateUrl: './detalle-cita.component.html',
  styleUrls: ['./detalle-cita.component.css']
})
export class DetalleCitaComponent {
  titulo: string = 'Detalle de la cita';
  @Input() cita: Cita;

  constructor(public modalCitaService:ModalCitaService) {  }

  ngOnInit() {  }

  cerrarModal (){
    this.modalCitaService.cerrarModalCita();
  }
}
