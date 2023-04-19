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
  public errores: string[];

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
    this.clienteService.create(this.cliente)
    .subscribe( jsonResponse => {
      this.router.navigate(['/clientes'])
      swal('Cliente agregado',`El cliente ${jsonResponse.cliente.primer_nombre} ${jsonResponse.cliente.apellido_P} ${jsonResponse.mensaje} `, 'success')
      },
      err =>{
        this.errores = err.error.errors as string[];
        console.error('Error en el codigo backend '+ err.status);
        console.error(err.error.errors);
      }

    );
  }

  update():void{
    this.clienteService.update(this.cliente)
    .subscribe( jsonResponse => {
        this.router.navigate(['/clientes'])
        swal ('Cliente Guardado', `El cliente ${jsonResponse.cliente.primer_nombre} ${jsonResponse.cliente.apellido_P} ${jsonResponse.mensaje} `, 'success' )
      },
      err =>{
        this.errores = err.error.errors as string[];
        console.error('Error en el codigo backend '+ err.status);
        console.error(err.error.errors);
      }
    );
  }
}
