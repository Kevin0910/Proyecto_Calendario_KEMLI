import { Injectable } from '@angular/core';
import { Cita } from './cita';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CITAS } from './cita.json';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private urlEndPoint: string = 'http://localhost:8080/api/citas'
  private HttpHeaders = new HttpHeaders ({'Content-Type': 'application/json'})


  constructor(private http:HttpClient) { }


  getCitas(): Observable<Cita[]>{
    //return of(CITAS)
    return this.http.get<Cita[]>(this.urlEndPoint);
  }



  delete(id:number): Observable<Cita>{
    return this.http.delete<Cita>(`${this.urlEndPoint}/${id}`, {headers:this.HttpHeaders})
  }
}
