import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean = false;

  constructor() { }

  //Metodo para abrir el modal
  abrirModal(){
    this.modal = true;
  }

  //Metodo para cerrar el modal
  cerrarModal(){
    this.modal = false;
  }
}
