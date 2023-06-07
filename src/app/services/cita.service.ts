import { Injectable } from '@angular/core';
import { Cita } from '../interfaces/cita';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TipoActividad } from '../interfaces/tipoActividad';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private urlEndPoint: string = 'http://localhost:8080/api/citas'
  private HttpHeaders = new HttpHeaders ({'Content-Type': 'application/json'})


  constructor(private http:HttpClient,
              private router: Router) { }

              //BUSCADOR DE CLIENTES
  busqCliente(termino: string): Observable<Cita[] | null>{
    return this.http.get<Cita[]>(`${this.urlEndPoint}/filtrar-cliente-citas/${termino}`)
          .pipe(
            catchError(e => {
              console.log(e)
              return throwError(() => e)
            })
          );
  }

  //BUSCADOR DE EMPLEADOS
  busqEmpleado(termino: string): Observable<Cita[] | null>{
    return this.http.get<Cita[]>(`${this.urlEndPoint}/filtrar-empleado-citas/${termino}`)
          .pipe(
            catchError(e => {
              console.log(e)
              return throwError(() => e)
            })
          );
  }





  getTipoActividades(): Observable<TipoActividad[]>{
    return this.http.get<TipoActividad[]>(this.urlEndPoint+"/tipoActividades");
  }



  getCitas(): Observable<Cita[]>{
    return this.http.get<Cita[]>(this.urlEndPoint);
  }

  //CREAR CITAS
  create(cita: Cita): Observable<any>{
    return this.http.post<any>(this.urlEndPoint, cita, {headers:this.HttpHeaders}).pipe(
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

  //OBTENER CITAS
    getCita(id): Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/citas']);
        console.error(e.error.mensaje);
        swal('Error al editar', e.error.mensaje, 'error');
        return throwError(()=>e)
      })
    );
  }

  //MODIFICAR CITAS
  update(cita: Cita): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cita.id}`, cita, {headers:this.HttpHeaders}).pipe(
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


  //ELIMINAR CITAS
  delete(id:number): Observable<any>{
    return this.http.delete<any>(`${this.urlEndPoint}/${id}`, {headers:this.HttpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e)
      })
    );
  }
}
