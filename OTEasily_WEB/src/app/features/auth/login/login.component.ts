import { Component, EventEmitter, Output } from '@angular/core';
import axios from 'axios';
import { BASE_URL } from '../../../app.config';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../../shared/header/header';
import { Footer } from '../../../shared/footer/footer';
import { TaskComponent } from '../../tasks/task/task.component';
import { Tablero } from '../../dashboard/tablero/tablero';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Route } from '@angular/router';
import { AuthService } from '../../../shared/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  //imports: [CommonModule],
  imports: [Header, Footer, TaskComponent, Tablero, CommonModule, MenuComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  protected title = 'OTEasily_WEB';
  showLogin = true; // Variable para controlar la visibilidad de los componentes
  showRegister = false; // Variable para controlar la visibilidad del componente de registro
  constructor(private _router: Router, private authService: AuthService) {}
  @Output() registerClicked = new EventEmitter<void>();
  errorMessage: string | null = null;

  onSubmit(event: Event, formData: { usuario: string; password: string }) {
    event.preventDefault();
    const apiUrl = `${BASE_URL}/OTEasily/Usuarios/login`; 
    //Llama al login

    axios.post(apiUrl, formData)
      .then(response => {
        // Guardar usuario ingresado y token del JSON
        const usuario = formData.usuario;
        const tokenJWT = response.data.token;
        const apiUrlUsuario = `${BASE_URL}/OTEasily/Usuarios/consultar`; 

        // Llama al endpoint para obtener el ID y nombre del usuario
        axios.post(apiUrlUsuario, {
            usuario: usuario
          }, {
            headers: { Authorization: `Bearer ${tokenJWT}` }
          })
          .then(responseUsuario => {
              // Acepta tanto idusuario como idUsuario por robustez
              const idUsuario = responseUsuario.data.idusuario || responseUsuario.data.idUsuario;
              const nombreUsuario = responseUsuario.data.nombre || responseUsuario.data.nombreUsuario;
              if (idUsuario && idUsuario !== 'undefined') {
                this.authService.setAuth(usuario, tokenJWT, idUsuario, nombreUsuario);
              } else {
                this.errorMessage = 'No se pudo obtener el id del usuario.';
                return;
              }
              this.errorMessage = null;
              this._router.navigate(['/menu']);
          })
          .catch(error => {
              this.errorMessage = error.response?.data?.mensajeResultado || 'Ocurrió un error inesperado.';
          });
      })
      .catch(error => {
        this.errorMessage = error.response?.data?.mensajeResultado || 'Ocurrió un error inesperado.';
      });
  }

  onRegisterClick() {
    this._router.navigate(['/register']);
  }
   toggleView() {
    this.showLogin = !this.showLogin; // Alternar entre login y registro
  }
  onHomeClicked() {
    this.showLogin = true; // Mostrar el componente de login
  }

  handleLoginRedirect() {
    this.showLogin = true; // Cambiar la bandera para mostrar el login
  }
}


