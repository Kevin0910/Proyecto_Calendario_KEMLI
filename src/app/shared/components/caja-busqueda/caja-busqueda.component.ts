import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'searchBox',
  templateUrl: './caja-busqueda.component.html'
})
export class CajaBusquedaComponent {

  private flujoDeCadena: Subject<string> = new Subject<string>();

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebouce = new EventEmitter<string>();

  constructor(){}

  ngOnInit(): void {
    this.flujoDeCadena
    .pipe(
      debounceTime(1000)
    )
    .subscribe( value => {
      console.log(value)
    });
  }

  emitValue(value: string){
    this.onValue.emit(value);
  }

  onKeyPress(terminoBusqueda: string){
    this.onDebouce.emit(terminoBusqueda)
  }


}
