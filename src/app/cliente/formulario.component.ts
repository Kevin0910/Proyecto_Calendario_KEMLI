import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';

import swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html'
})


export class FormularioComponent implements OnInit{

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear cliente";

  //Inyecciones
  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute){}

  ngOnInit(  ) {
    this.cargarCliente();
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
    })
  }

  create(): void{
    this.clienteService.create(this.cliente).subscribe
    (cliente => {
      this.router.navigate(['/clientes'])
      swal('Cliente guardado', `Cliente ${cliente.nombre} ${cliente.apellido_P} ${cliente.apellido_M} Creado con exito`, 'success')
    });
  }

  update():void{
    this.clienteService.update(this.cliente).subscribe(
      (cliente => {
        this.router.navigate(['/clientes'])
        swal ('Cliente Actualizado', `Cliente ${cliente.nombre} ${cliente.apellido_P} se a actualizado con exito`, 'success' )
      })
    )
  }
}
