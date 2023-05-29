import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs'  ;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders ({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService) {}

    private isNoAutorizado(e): boolean{
       if(e.status==401 ){
           this.router.navigate(['/login'])
           return true;
       }
       if( e.status==403){
        swal ('Acceso denegado');
        this.router.navigate(['/clientes'])
        return true;
    }
       return false;
    }
    private agregarAuthorizationHeader(){
      let token =this.authService.token;
      if(token!= null){
        return this.httpHeaders.append('Athorization','Bearar '+token);
      }
      return this.httpHeaders;
    }
    //OBTENER CLIENTE MEDIANTE BUSCADOR
    busquedaCliente(termino: string): Observable<Cliente[] | null>{
      return this.http.get<Cliente[]>(`${this.urlEndPoint}/filtrar-clientes/${termino}`)
            .pipe(
              catchError(e => {
                if(this.isNoAutorizado(e)){
                  return throwError(()=>e);
              }
                console.log(e)
                return throwError(() => e)
              })
            );
    }


    //OBTENER TODOS LOS CLIENTES
    getClientes(): Observable<Cliente[]>{
      return this.http.get<Cliente[]>(this.urlEndPoint);
    }

    //POST PARA CREAR EMPLEADOS
    create(cliente: Cliente): Observable<any>{
      return this.http.post<any>(this.urlEndPoint, cliente, {headers:this.agregarAuthorizationHeader()}).pipe(
        catchError(e => {
          if(this.isNoAutorizado(e)){
            return throwError(()=>e);
        }

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
    getCliente(id): Observable<any>{
      return this.http.get<any>(`${this.urlEndPoint}/${id}`,{headers:this.agregarAuthorizationHeader()}).pipe(
        catchError(e => {
          if(this.isNoAutorizado(e)){
            return throwError(()=>e);
        }
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          swal('Error al editar', e.error.mensaje, 'error');
          return throwError(()=>e)
        })
      );
    }

    //PUT PARA EDITAR
    update(cliente: Cliente): Observable<any>{
      return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers:this.agregarAuthorizationHeader()}).pipe(
          catchError(e => {
            if(this.isNoAutorizado(e)){
              return throwError(()=>e);
          }
            if(e.status == 400){
              return throwError(() => e)
            }

            console.error(e.error.mensaje);
            swal(e.error.mensaje, e.error.error, 'error');
            return throwError(() => e)
          })
      );
    }

    //DELETE PARA ELIMINAR
    delete(id: number): Observable<any>{
      return this.http.delete<any>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
        catchError(e => {
          if(this.isNoAutorizado(e)){
            return throwError(()=>e);
        }
        console.error(e.error.mensaje);
          swal(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e)
        })
      );
    }
}
