import { EmpleadoService } from './../../empleado/empleado.service';
import { Cita } from '../cita';
import { CitaService } from '../cita.service';

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/cliente/cliente';

import swal from 'sweetalert2';
import { TipoActividad } from '../tipoActividad';
import { Empleado } from 'src/app/empleado/empleado';
import { ClienteService } from 'src/app/cliente/cliente.service';

@Component({
  selector: 'app-formulario-cita',
  templateUrl: './formulario-cita.component.html'
})
export class FormularioCitaComponent {

  public cita: Cita = new Cita();
  public titulo: string ='Crear cita';
  public errores: string[];
  public clientes: Cliente[];
  public empleados: Empleado[];
  public  tipoActividad: TipoActividad[];

  constructor(private citaService: CitaService,
              private empleadoService: EmpleadoService,
              private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute){}

  ngOnInit(  ) {
    this.cargarCita();
    
    this.citaService.getTipoActividades().subscribe(tipoActividades => this.tipoActividad = tipoActividades);
    this.empleadoService.getEmpleados().subscribe(empleados => this.empleados = empleados);
    this.clienteService.getClientes().subscribe(clientes => this.clientes = clientes);
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

  compararTipoActividad(o1:TipoActividad, o2:TipoActividad):boolean {
    return o1 &&  o2 ? o1.id === o2.id : o1 === o2;
  }

  compararCliente(o1:Cliente, o2:Cliente):boolean {
    return o1 &&  o2 ? o1.id === o2.id : o1 === o2;
  }

  compararEmpleado(o1:Empleado, o2:Empleado):boolean {
    return o1 &&  o2 ? o1.id === o2.id : o1 === o2;
  }


}
