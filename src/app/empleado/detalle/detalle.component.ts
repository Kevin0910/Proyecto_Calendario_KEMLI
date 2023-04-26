import { Component, Input } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'detalle-empleado',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {
  titulo: string = 'Detalle del empleado'
  @Input() empleado: Empleado;

  constructor(private empleadoService: EmpleadoService,
              public modalService: ModalService){ }

  ngOnInit(){ }

  cerrarModal(){
    this.modalService.cerrarModalEmpleado();
  }

}
