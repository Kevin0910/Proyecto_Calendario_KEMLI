import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalCitaService {

  modal: boolean = false;

  constructor() { }

  //Metodo para abrir el modal
  abrirModalCita(){
    this.modal = true;
  }

  //Metodo para cerrar el modal
  cerrarModalCita(){
    this.modal = false;
  }
}
