import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'searchBox',
  templateUrl: './caja-busqueda.component.html'
})
export class CajaBusquedaComponent {

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  emitValue(value: string){
    this.onValue.emit(value);
  }


}
  