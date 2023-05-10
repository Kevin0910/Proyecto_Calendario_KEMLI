import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalReporteService {

  modal: boolean = false;

  constructor() { }

  //Metodo para abrir el modal
  abrirModalReporte(){
    this.modal = true;
  }

  //Metodo para cerrar el modal
  cerrarModalReporte(){
    this.modal = false;
  }
}
