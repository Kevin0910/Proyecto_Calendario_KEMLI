import { EmpleadoService } from '../../services/empleado.service';
import { Cita } from '../../interfaces/cita';
import { CitaService } from '../../services/cita.service';

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';

import swal from 'sweetalert2';
import { TipoActividad } from '../../interfaces/tipoActividad';
import { Empleado } from 'src/app/interfaces/empleado';
import { ClienteService } from 'src/app/services/cliente.service';

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
    console.log(this.cita)
    this.citaService.create(this.cita)
    .subscribe( jsonResponseCita => {
      this.router.navigate(['/citas'])
      //console.log(this.cita)
      //console.log(this.cita.cliente)
      swal('Cita agregado',`La cita del cliente ${this.cita.cliente.primer_nombre} ${this.cita.cliente.apellido_P} ${jsonResponseCita.mensaje} `, 'success')
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
        this.router.navigate(['/citas'])
        swal ('Cita Guardado', `La cita del cliente ${this.cita.cliente.primer_nombre} ${this.cita.cliente.apellido_P} ${jsonResponse.mensaje} `, 'success' )
      },
      err =>{
        this.errores = err.error.errors as string[];
        console.error('Error en el codigo backend '+ err.status);
        console.error(err.error.errors);
      }
    );
  }

  fechaActual(): string  {
    return new Date().toISOString().split("T")[0];
  }

/*
  horaActual(): string {
    return new Date().toISOString().substr(11, 5);
  }
*/
  compararTipoActividad(o1: TipoActividad, o2: TipoActividad):boolean {
    return o1 &&  o2 ? o1.id === o2.id : o1 === o2;
    //return o1 === null ||  o2 === null || o1 === undefined ||  o2 === undefined ? false: o1.id === o2.id;
  }

  compararCliente(o1:Cliente, o2:Cliente):boolean {
    return o1 &&  o2 ? o1.id === o2.id : o1 === o2;
    //return o1 === null ||  o2 === null || o1 === undefined ||  o2 === undefined ? false: o1.id === o2.id;
  }

  compararEmpleado(o1:Empleado, o2:Empleado):boolean {
    return o1 &&  o2 ? o1.id === o2.id : o1 === o2;
    //return o1 === null ||  o2 === null || o1 === undefined ||  o2 === undefined ? false: o1.id === o2.id;
  }


}
