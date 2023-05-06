import { Component } from '@angular/core';

import { Cliente } from '../../interfaces/cliente';
import { ClienteService } from '../../services/cliente.service';

import swal from 'sweetalert2';
import { ModalClienteService } from '../detalle-cliente/modal-cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})

export class ClienteComponent {
  clientes: Cliente [];
  clienteSeleccionado: Cliente;
  clienteBusquedas: Cliente[] = [];


  constructor(private clienteService:ClienteService,
              public modalClienteService: ModalClienteService){

  }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      (clientes) => this.clientes = clientes
    );

  }

  busquedaPorNombre(termino: string): void {
    if (termino !== '') {
      this.clienteService.busquedaCliente(termino).subscribe(
        clientes => this.clienteBusquedas = clientes
      );
    } else {
      this.clienteBusquedas = [];
    }
  }



  //ELIMINAR CLIENTE
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

  //ELIMINAR CLIENTE DE BUSQUEDA
  deleteBusqueda(busquedaCliente:Cliente): void{
    swal({
      title: 'Esta seguro?',
      text: `¿Seguro que desea eliminar el cliente ${busquedaCliente.primer_nombre} ${busquedaCliente.apellido_P}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'No, eliminar',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {

        this.clienteService.delete(busquedaCliente.id).subscribe(
          response => {
            this.clienteBusquedas = this.clienteBusquedas.filter(busqCli => busqCli !== busquedaCliente)
            swal(
              'Cliente eliminado!',
              `El cliente ${busquedaCliente.primer_nombre} ${busquedaCliente.apellido_P} ah sido eliminado`,
              'success'
            )
          }
        )
      }
    })
  }

  abrirModal (cliente: Cliente){
    this.clienteSeleccionado = cliente;
    this.modalClienteService.abrirModalCliente();
  }
}
