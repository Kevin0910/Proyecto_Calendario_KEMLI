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
import { HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'clientes', component: ClienteComponent},
  {path: 'empleados', component: EmpleadoComponent},
  {path: 'reporte', component: ReporteComponent},
  {path: 'citas', component: CitasComponent}
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
    EmpleadoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
