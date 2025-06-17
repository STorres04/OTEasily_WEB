import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { TaskComponent } from '../tasks/task/task.component';


@Component({
  selector: 'app-component-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports: [CommonModule, Header, Footer, TaskComponent]
})
export class MenuComponent   {
  isAuthenticated = false; // Cambiar a true cuando el usuario se autentique

  constructor(private router: Router) {
    console.log('Menu component loaded'); // Confirmar carga del componente
  }

  navigateToTask() {
    this.router.navigate(['/task']);
  }

  navigateToTablero() {
    this.router.navigate(['/tablero']);
  }
}
