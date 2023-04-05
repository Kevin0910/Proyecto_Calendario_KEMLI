import { Injectable } from '@angular/core';

import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';

import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private HttpHeaders = new HttpHeaders ({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) {}

    getClientes(): Observable<Cliente[]>{
      //return of(CLIENTES);
      return this.http.get<Cliente[]>(this.urlEndPoint);
    }

    create(cliente: Cliente): Observable<Cliente>{
      return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers:this.HttpHeaders})
    }

    getCliente(id): Observable<Cliente>{
      return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
    }
}
