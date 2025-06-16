import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { Task } from './features/tasks/task/task';
import { Tablero } from './features/dashboard/tablero/tablero';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Login, Header, Footer, Task, Tablero],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  protected title = 'OTEasily_WEB';
}
