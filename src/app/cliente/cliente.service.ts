import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs'  ;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private HttpHeaders = new HttpHeaders ({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
              private router: Router) {}

    //OBTENER TODOS LOS CLIENTES
    getClientes(): Observable<Cliente[]>{
      return this.http.get<Cliente[]>(this.urlEndPoint);
    }

    //POST PARA CREAR EMPLEADOS
    create(cliente: Cliente): Observable<any>{
      return this.http.post<any>(this.urlEndPoint, cliente, {headers:this.HttpHeaders}).pipe(
        catchError(e => {
          console.error(e.error.mensaje);
          swal(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e)
        })
      );
    }

    //GET PARA OBTENER CLIENTES MEDIANTE ID
    getCliente(id): Observable<any>{
      return this.http.get<any>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e => {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          swal('Error al editar', e.error.mensaje, 'error');
          return throwError(()=>e)
        })
      );
    }

    //PUT PARA EDITAR
    update(cliente: Cliente): Observable<any>{
      return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers:this.HttpHeaders}).pipe(
          catchError(e => {
            console.error(e.error.mensaje);
            swal(e.error.mensaje, e.error.error, 'error');
            return throwError(() => e)
          })
      );
    }

    //DELETE PARA ELIMINAR
    delete(id: number): Observable<any>{
      return this.http.delete<any>(`${this.urlEndPoint}/${id}`, {headers: this.HttpHeaders}).pipe(
        catchError(e => {
          console.error(e.error.mensaje);
          swal(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e)
        })
      );
    }
}
