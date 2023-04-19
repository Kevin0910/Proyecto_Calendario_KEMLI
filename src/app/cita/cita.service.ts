import { Injectable } from '@angular/core';
import { Cita } from './cita';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { CITAS } from './cita.json';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private urlEndPoint: string = 'http://localhost:8080/api/citas'
  private HttpHeaders = new HttpHeaders ({'Content-Type': 'application/json'})


  constructor(private http:HttpClient,
              private router: Router) { }


  getCitas(): Observable<Cita[]>{
    //return of(CITAS)
    return this.http.get<Cita[]>(this.urlEndPoint);
  }

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
