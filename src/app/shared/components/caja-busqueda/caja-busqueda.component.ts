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
      debounceTime(300)
    )
    .subscribe( value => {
      this.onDebouce.emit(value)
    });
  }

  emitValue(value: string){
    this.onValue.emit(value);
  }

  onKeyPress(terminoBusqueda: string){
    this.flujoDeCadena.next(terminoBusqueda)
  }


}
