import { Injectable } from '@angular/core';

import { Empleado } from './empleado';
import { EMPLEADOS } from './empleado.json';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlEndPoint: string = 'http://localhost:8080/api/empleados';
  constructor(private http: HttpClient) { }

    getEmpleados(): Observable <Empleado[]>{
      //return of(EMPLEADOS);
      return this.http.get<Empleado[]>(this.urlEndPoint);
  }
}
