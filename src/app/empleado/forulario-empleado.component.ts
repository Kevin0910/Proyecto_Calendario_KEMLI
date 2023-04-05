import { Component } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';
import { ActivatedRoute, Router } from '@angular/router';

import swal from 'sweetalert2';

@Component({
  selector: 'app-forulario-empleado',
  templateUrl: './forulario-empleado.component.html'
})
export class ForularioEmpleadoComponent {

  public empleado: Empleado = new Empleado();
  public titulo: string = "Crear empleado";

  constructor(private empleadoService: EmpleadoService,
              private router: Router,
              private activatedRoute: ActivatedRoute){  }

  ngOnInit() {
  this.cargarEmpleado();
  }

  cargarEmpleado():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.empleadoService.getEmpleado(id).subscribe( (empleado) => this.empleado = empleado)
      }
    })
  }

  create(): void{
  this.empleadoService.create(this.empleado).subscribe(
    empleado => {
      this.router.navigate(['/empleados'])
      swal('Empleado Guardado', `Empleado ${empleado.nombre} ${empleado.apellido_P} ${empleado.apellido_M}`, 'success')
    }
  );

   /* public create(): void{
      console.log("Click")
      console.log(this.empleado)
  }*/
}}
