import { Cita } from '../cita';
import { CitaService } from '../cita.service';

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/cliente/cliente';

import swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-cita',
  templateUrl: './formulario-cita.component.html'
})
export class FormularioCitaComponent {

  public cita: Cita = new Cita();
  public titulo: string ='Crear cita';
  public errores: string[];
  //public id: Cliente[];

  constructor(private citaService: CitaService,
              private router: Router,
              private activatedRoute: ActivatedRoute){}

  ngOnInit(  ) {
    this.cargarCita();
   // this.citaService.getCitas().subscribe(citas => this.citas = citas)
  }

  cargarCita(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.citaService.getCita(id).subscribe( (cita) => this.cita = cita)
      }
    })
  }

  create(): void{
    this.citaService.create(this.cita)
    .subscribe( jsonResponse => {
      this.router.navigate(['/clientes'])
      swal('Cita agregado',`El cliente ${jsonResponse.cita.cliente.primer_nombre} ${jsonResponse.cita.cliente.segundo_nombre} ${jsonResponse.mensaje} `, 'success')
      },
      err =>{
        this.errores = err.error.errors as string[];
        console.error('Error en el codigo backend '+ err.status);
        console.error(err.error.errors);
      }

    );
  }

  update():void{
    this.citaService.update(this.cita)
    .subscribe( jsonResponse => {
        this.router.navigate(['/clientes'])
        swal ('Cita Guardado', `El cliente ${jsonResponse.cita.cliente.primer_nombre} ${jsonResponse.cita.cliente.apellido_P} ${jsonResponse.mensaje} `, 'success' )
      },
      err =>{
        this.errores = err.error.errors as string[];
        console.error('Error en el codigo backend '+ err.status);
        console.error(err.error.errors);
      }
    );
  }
}
