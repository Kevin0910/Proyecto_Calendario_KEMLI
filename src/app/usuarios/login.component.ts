import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuarios';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{
  
  titulo: string ='Iniciar sesión'; 
  usuario: Usuario;
  
  constructor(private authservice: AuthService, private router: Router){
    this.usuario=new Usuario();
  }
  
  ngOnInit(){
    if (this.authservice.isAuthenticated()){
      swal('Login',`Hola ${this.authservice.usuario.username} ya iniciaste sesión`, 'info');
      this.router.navigate(['/clientes']);
    }
  }

  login(){
    console.log(this.usuario);
    if(this.usuario.username==null || this.usuario.password==null){
      swal('Error Login', 'Username o password vacías','error');
      return;
    }
  

  this.authservice.login(this.usuario).subscribe(response => {
    console.log(response);
    

    this.authservice.guardarUsuario(response.access_token);
    this.authservice.guardarToken(response.access_token);
    let usuario=this.authservice.usuario;
    this.router.navigate(['/clientes']);
    swal('/login', `Hola ${usuario.username}, has iniciado sesión con éxito`,'success');
  },
  
  err=>{
    if(err.status==400){
      swal('Error Login','Usuario o clave incorrectas', 'error' );
    }
  }
  
  );
  
}
}
