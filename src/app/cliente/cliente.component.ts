import { Component } from '@angular/core';

import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})

export class ClienteComponent {
  clientes: Cliente [];

  constructor(private clienteService:ClienteService){

  }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      (clientes) => this.clientes = clientes
    );

  }
}
