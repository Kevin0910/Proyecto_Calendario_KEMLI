import { Injectable } from '@angular/core';
import { Empleado } from '../interfaces/empleado';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs'  ;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TipoEmpl } from '../interfaces/tipoEmpl';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlEndPoint: string = 'http://localhost:8080/api/empleados';
  private HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
              private router: Router) {}

  //OBTENER EMPLEADO MEDIANTE BUSCADOR
  busquedaEmpleado(termino: string): Observable<Empleado[] | null>{
    return this.http.get<Empleado[]>(`${this.urlEndPoint}/filtrar-empleados/${termino}`)
          .pipe(
            catchError(e => {
              console.log(e)
              return throwError(() => e)
            })
          );
  }

  //Arreglo de tipo de empleado
    getTipoEmpleados(): Observable<TipoEmpl[]>{
      return this.http.get<TipoEmpl[]>(this.urlEndPoint+"/tipoEmpleados")
    }

    //Arreglo de los empelados que son tecnicos
    getEmpleadosTecnicos():Observable<Empleado[]>{
      return this.http.get<Empleado[]>(this.urlEndPoint+'/filtrar-tecnicos');
    }

  //OBTENER TODOS LOS CLIENTES
    getEmpleados(): Observable <Empleado[]>{
      return this.http.get<Empleado[]>(this.urlEndPoint);
  }

  //POST PARA CREAR EMPLEADOS
    create(empleado: Empleado): Observable <any>{
      return this.http.post<any>(this.urlEndPoint, empleado, {headers: this.HttpHeaders}).pipe(
        catchError(e => {

          if(e.status == 400){
            return throwError(() => e)
          }

          console.error(e.error.mensaje);
          swal(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e)
        })
      );
    }

    //GET PARA OBTENER CLIENTES MEDIANTE ID
    getEmpleado(id): Observable<any>{
      return this.http.get<any>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e => {
          this.router.navigate(['/empleados'])
          console.error(e.error.mensaje);
          swal(e.error.mensaje, e.error.error, 'error')
          return throwError(() => e);
        })
      );
    }

    //PUT PARA EDITAR CLIENTE
    update(empleado:Empleado): Observable<any>{
      return this.http.put<any>(`${this.urlEndPoint}/${empleado.id}`, empleado, {headers:this.HttpHeaders}).pipe(
        catchError(e => {

          if(e.status == 400){
            return throwError(() => e)
          }

          console.error(e.error.mensaje)
          swal(e.error.mensaje, e.error.error, 'error')
          return throwError (()=> e);
        })
      );
    }

    //ELIMINAR CLIENTE
    delete(id:number): Observable<any>{
      return this.http.delete<any>(`${this.urlEndPoint}/${id}`, {headers:this.HttpHeaders}).pipe(
        catchError(e=>{
          console.error(e.error.mensaje)
          swal(e.error.mensaje, e.error.error, 'error')
          return throwError (()=> e);
        })
      );
    }
}
