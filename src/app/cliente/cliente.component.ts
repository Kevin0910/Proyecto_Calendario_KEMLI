import { Component } from '@angular/core';

import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})

export class ClienteComponent {
  clientes: Cliente [];
  clienteSeleccionado: Cliente;

  constructor(private clienteService:ClienteService){

  }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      (clientes) => this.clientes = clientes
    );
  }

  delete(cliente:Cliente): void{
    swal({
      title: 'Esta seguro?',
      text: `¿Seguro que desea eliminar el cliente ${cliente.primer_nombre} ${cliente.apellido_P}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'No, eliminar',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {

        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal(
              'Cliente eliminado!',
              `El cliente ${cliente.primer_nombre} ${cliente.apellido_P} ah sido eliminado`,
              'success'
            )
          }
        )
      }
    })
  }

  abrirModal (cliente: Cliente){
    this.clienteSeleccionado = cliente;
  }
}
