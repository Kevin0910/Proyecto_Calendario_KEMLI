import { Component } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';
import { ActivatedRoute, Router } from '@angular/router';

import swal from 'sweetalert2';
import { TipoEmpl } from './tipoEmpl';

@Component({
  selector: 'app-forulario-empleado',
  templateUrl: './forulario-empleado.component.html'
})
export class ForularioEmpleadoComponent {

  public titulo: string = "Crear empleado";
  public empleado: Empleado = new Empleado();
  public errores: string[];
  tipoEmpleados: TipoEmpl[];


  constructor(private empleadoService: EmpleadoService,
              private router: Router,
              private activatedRoute: ActivatedRoute){  }

  ngOnInit() {
  this.cargarEmpleado();
  //Cargar tipo de empleados
  this.empleadoService.getTipoEmpleados().subscribe(tipoEmpleados =>  this.tipoEmpleados = tipoEmpleados  );

  }

  cargarEmpleado():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.empleadoService.getEmpleado(id).subscribe( (empleado) => this.empleado = empleado);
      }
    })
  }

  create(): void{
  this.empleadoService.create(this.empleado).subscribe(
    jsonResponse => {
      this.router.navigate(['/empleados'])
      swal('Empleado Guardado', `El empleado ${jsonResponse.empleado.primer_nombre} ${jsonResponse.empleado.apellido_P} se a guardado con exito`, 'success')
    },
    err =>{
      this.errores = err.error.errors as string[];
      console.error('Error en el codigo backend '+ err.status);
      console.error(err.error.errors);
    }
  );
}

  update():void{
    this.empleadoService.update(this.empleado)
    .subscribe (jsonResponse => {
        this.router.navigate(['/empleados'])
        swal('Empleado Actualizado', `El empleado ${jsonResponse.empleado.primer_nombre} ${jsonResponse.empleado.apellido_P} se a actualizado con exito`, 'success')
      },
      err =>{
        this.errores = err.error.errors as string[];
        console.error('Error en el codigo backend '+ err.status);
        console.error(err.error.errors);
      }
    );
  }
}
