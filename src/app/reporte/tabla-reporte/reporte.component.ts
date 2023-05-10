import { Component } from '@angular/core';
import { ReporteService } from '../../services/reporte.service';
import { Reporte } from '../../interfaces/reporte';
import { Observable } from 'rxjs';
import { ModalReporteService } from '../detalle/model-reporte.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent {

  reportes: Reporte[];
  reporteSeleccionado: Reporte;

  constructor(private reporteService: ReporteService,
              public modalReporteService: ModalReporteService){}

  ngOnInit(): void {
    this.reporteService.getReporte().subscribe(
      (reportes) => this.reportes = reportes);
  }





  abrirModal(reporte:Reporte){
    this.reporteSeleccionado = reporte;
    this.modalReporteService.abrirModalReporte()
  }

}
