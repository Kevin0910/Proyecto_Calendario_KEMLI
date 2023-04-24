import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AutenticacionComponent } from './autenticacion/autenticacion.component';
import { RouterModule, Routes, Route } from '@angular/router';
import { ReporteComponent } from './reporte/reporte.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { FormularioComponent } from './cliente/formulario.component';
import { ForularioEmpleadoComponent } from './empleado/forulario-empleado.component';
import { CitaComponent } from './cita/cita.component';

import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormularioCitaComponent } from './cita/formulario-cita.component';
import { DatalleComponent } from './cliente/datalle/datalle.component';
import { DetalleComponent } from './empleado/detalle/detalle.component';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
registerLocaleData(localeES, 'es')

const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'clientes', component: ClienteComponent},
  {path: 'empleados', component: EmpleadoComponent},
  {path: 'reporte', component: ReporteComponent},
  {path: 'cita', component: CitaComponent},
  {path: 'clientes/formulario', component: FormularioComponent},
  {path: 'clientes/formulario/:id', component: FormularioComponent},
  {path: 'empleados/formulario-empleados', component: ForularioEmpleadoComponent},
  {path: 'empleados/formulario-empleados/:id', component: ForularioEmpleadoComponent}
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
    DatalleComponent,
    DetalleComponent  ],
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
