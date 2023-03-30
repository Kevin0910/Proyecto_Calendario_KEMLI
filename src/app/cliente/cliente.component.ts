import { Component } from '@angular/core';
import { from } from 'rxjs';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})

export class ClienteComponent {
  clientes: Cliente [];

  ngOnInit(): void {
    this.clientes = CLIENTES;

  }
}
