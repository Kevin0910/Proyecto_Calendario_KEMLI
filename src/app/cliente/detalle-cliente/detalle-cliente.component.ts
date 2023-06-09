import { Component, Input } from '@angular/core';
import { Cliente } from '../../interfaces/cliente';
import { ClienteService } from '../../services/cliente.service';
import { ModalClienteService } from './modal-cliente.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css']
})
export class DetalleClienteComponent {
  titulo: string = 'Detalle del cliente';
  @Input() cliente: Cliente;

  constructor(private clienteService: ClienteService,
              public modalClienteService: ModalClienteService){}

  ngOnInit() {  }


  cerrarModal(){
    this.modalClienteService.cerrarModalCliente();
  }
}
