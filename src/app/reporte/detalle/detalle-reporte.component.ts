import { Component, Input } from '@angular/core';
import { ModalReporteService } from './model-reporte.service';
import { Reporte } from 'src/app/interfaces/reporte';

@Component({
  selector: 'detalle-reporte',
  templateUrl: './detalle-reporte.component.html',
  styleUrls: ['./detalle-reporte.component.css']
})
export class DetalleReporteComponent {
  titulo: string = 'Detalle del reporte'
  @Input() reporte: Reporte;

  constructor(public modalReporteService: ModalReporteService){  }

  ngOnInit(): void {  }

  cerrarModal(){
    this.modalReporteService.cerrarModalReporte();
    }
}
