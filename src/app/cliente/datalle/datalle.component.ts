import { Component, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'datalle-cliente',
  templateUrl: './datalle.component.html',
  styleUrls: ['./datalle.component.css']
})
export class DatalleComponent {
  titulo: String = 'Detalle del cliente';
  @Input() cliente: Cliente;

  constructor(private clienteService: ClienteService,
              public modalService: ModalService){}

  ngOnInit() {  }


  cerrarModal(){
    this.modalService.cerrarModal();
  }
}
