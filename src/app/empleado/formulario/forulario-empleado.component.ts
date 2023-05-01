import { Component } from '@angular/core';
import { Empleado } from '../components/empleado';
import { EmpleadoService } from '../components/empleado.service';
import { ActivatedRoute, Router } from '@angular/router';

import swal from 'sweetalert2';
import { TipoEmpl } from '../components/tipoEmpl';

@Component({
  selector: 'app-forulario-empleado',
  templateUrl: './forulario-empleado.component.html'
})
export class ForularioEmpleadoComponent {

  public titulo: string = "Crear empleado";
  public empleado: Empleado = new Empleado();
  public errores: string[];
  public tipoEmpleados: TipoEmpl[];


  constructor(private empleadoService: EmpleadoService,
              private router: Router,
              private activatedRoute: ActivatedRoute){   }

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
    console.log(this.empleado);
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
    console.log(this.empleado);
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

  compararTipoEmpleados(o1:TipoEmpl, o2:TipoEmpl):boolean {
    return o1 &&  o2 ? o1.id === o2.id : o1 === o2;
  }
}
