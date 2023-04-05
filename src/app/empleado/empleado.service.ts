import { Injectable } from '@angular/core';

import { Empleado } from './empleado';
import { EMPLEADOS } from './empleado.json';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlEndPoint: string = 'http://localhost:8080/api/empleados';
  private HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) {}

    getEmpleados(): Observable <Empleado[]>{
      //return of(EMPLEADOS);
      return this.http.get<Empleado[]>(this.urlEndPoint);
  }

    create(empleado: Empleado): Observable <Empleado>{
      return this.http.post<Empleado>(this.urlEndPoint, empleado, {headers: this.HttpHeaders})
    }

    getEmpleado(id): Observable<Empleado>{
      return this.http.get<Empleado>(`${this.urlEndPoint}/${id}`)
    }
}
