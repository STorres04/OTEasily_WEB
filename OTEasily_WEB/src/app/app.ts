import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { Tablero } from './features/dashboard/tablero/tablero';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './features/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, Header, Footer, Tablero, CommonModule, MenuComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  
}
