import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean = false;


  constructor() { }

  abrirModalEmpleado(){
    this.modal = true;
  }

  //Metodo para cerrar el modal
  cerrarModalEmpleado(){
    this.modal = false;
  }

}
