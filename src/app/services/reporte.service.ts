import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Reporte } from '../interfaces/reporte';

@Injectable({
  providedIn: 'root'
})

export class ReporteService {

  private urlEndPoint: string = 'http://localhost:8080/api/reportes'


  constructor(private http:HttpClient,
              private router: Router) { }

  getReporte(): Observable<Reporte[]>{
    return this.http.get<Reporte[]>(this.urlEndPoint)
  }
}
