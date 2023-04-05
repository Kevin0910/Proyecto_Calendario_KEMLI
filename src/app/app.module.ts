import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AutenticacionComponent } from './autenticacion/autenticacion.component';
import { RouterModule, Routes, Route } from '@angular/router';
import { ReporteComponent } from './reporte/reporte.component';
import { CitasComponent } from './citas/citas.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { FormularioComponent } from './cliente/formulario.component';

import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ForularioEmpleadoComponent } from './empleado/forulario-empleado.component';

const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'clientes', component: ClienteComponent},
  {path: 'empleados', component: EmpleadoComponent},
  {path: 'reporte', component: ReporteComponent},
  {path: 'citas', component: CitasComponent},
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
    CitasComponent,
    EmpleadoComponent,
    FormularioComponent,
    ForularioEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
