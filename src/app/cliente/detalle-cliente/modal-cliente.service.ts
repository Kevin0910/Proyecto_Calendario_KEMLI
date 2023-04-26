import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalClienteService {

  modal: boolean = false;

  constructor() { }

  //Metodo para abrir el modal
  abrirModalCliente(){
    this.modal = true;
  }

  //Metodo para cerrar el modal
  cerrarModalCliente(){
    this.modal = false;
  }
}

