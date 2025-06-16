import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { Task } from './features/tasks/task/task';
import { Tablero } from './features/dashboard/tablero/tablero';
import { CommonModule } from '@angular/common';
import { Register } from './features/auth/register/register';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Login, Header, Footer, Task, Tablero, CommonModule, Register],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  protected title = 'OTEasily_WEB';
  showLogin = true; // Variable para controlar la visibilidad de los componentes

  toggleView() {
    this.showLogin = !this.showLogin; // Alternar entre login y registro
  }

  onRegisterClicked() {
    this.showLogin = false; // Mostrar el componente de registro
  }

  onHomeClicked() {
    this.showLogin = true; // Mostrar el componente de login
  }
}
