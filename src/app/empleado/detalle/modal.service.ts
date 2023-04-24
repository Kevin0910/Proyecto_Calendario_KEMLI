import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean = false;


  constructor() { }

  abrirModal(){
    this.modal = true;
  }

  //Metodo para cerrar el modal
  cerrarModal(){
    this.modal = false;
  }

}
