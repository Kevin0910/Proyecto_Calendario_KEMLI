import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ClienteComponent } from './cliente/tabla.cliente/cliente.component';
import { AutenticacionComponent } from './shared/components/autenticacion/autenticacion.component';
import { RouterModule, Routes, Route } from '@angular/router';
import { ReporteComponent } from './reporte/tabla-reporte/reporte.component';
import { EmpleadoComponent } from './empleado/tabla-empleado/empleado.component';
import { FormularioComponent } from './cliente/formulario/formulario.component';
import { ForularioEmpleadoComponent } from './empleado/formulario/forulario-empleado.component';
import { CitaComponent } from './cita/tabla-cita/cita.component';

import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormularioCitaComponent } from './cita/formulario/formulario-cita.component';
import { DetalleComponent } from './empleado/detalle/detalle.component';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { DetalleClienteComponent } from './cliente/detalle-cliente/detalle-cliente.component';
import { DetalleCitaComponent } from './cita/detalle-cita/detalle-cita.component';
import { DetalleReporteComponent } from './reporte/detalle/detalle-reporte.component';
import { CajaBusquedaComponent } from './shared/components/caja-busqueda/caja-busqueda.component';
registerLocaleData(localeES, 'es')

const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'clientes', component: ClienteComponent},
  {path: 'empleados', component: EmpleadoComponent},
  {path: 'reportes', component: ReporteComponent},
  {path: 'citas', component: CitaComponent},
  {path: 'clientes/formulario', component: FormularioComponent},
  {path: 'clientes/formulario/:id', component: FormularioComponent},
  {path: 'empleados/formulario-empleados', component: ForularioEmpleadoComponent},
  {path: 'empleados/formulario-empleados/:id', component: ForularioEmpleadoComponent},
  {path: 'citas/formulario-citas', component: FormularioCitaComponent},
  {path: 'citas/formulario-citas/:id', component: FormularioCitaComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClienteComponent,
    AutenticacionComponent,
    ReporteComponent,
    EmpleadoComponent,
    FormularioComponent,
    ForularioEmpleadoComponent,
    CitaComponent,
    FormularioCitaComponent,
    DetalleComponent,
    DetalleClienteComponent,
    DetalleCitaComponent,
    DetalleReporteComponent,
    CajaBusquedaComponent
    ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
