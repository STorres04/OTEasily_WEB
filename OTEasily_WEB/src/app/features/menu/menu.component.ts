import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { TaskComponent } from '../tasks/task/task.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { TaskService } from '../tasks/task/task.service';

@Component({
  selector: 'app-component-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports: [CommonModule, Header, Footer, TaskComponent, FormsModule]
})
export class MenuComponent implements OnInit {
  isAuthenticated = false;
  showNuevaTareaModal = false;
  showProximamenteModal = false;
  nuevaTareaForm = {
    idusuario: '',
    nombreTarea: '',
    descripcionTarea: '',
    fechaInicio: '',
    fechaFin: '',
    prioridad: 0
  };
  submittedNuevaTarea = false;
  mensajeResultado: string | null = null;
  loadingNuevaTarea = false;
  usuariosSugeridos: { nombre: string; idusuario: string }[] = [];
  selectedUsuario: string = '';

  constructor(private router: Router, private authService: AuthService, private taskService: TaskService) {
    console.log('Menu component loaded');
    this.nuevaTareaForm.idusuario = this.authService.getIdUsuario() || '';
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  openNuevaTareaModal() {
    this.showNuevaTareaModal = true;
    this.submittedNuevaTarea = false;
    this.nuevaTareaForm = {
      idusuario: this.authService.getIdUsuario() || '',
      nombreTarea: '',
      descripcionTarea: '',
      fechaInicio: '',
      fechaFin: '',
      prioridad: 0
    };
  }

  closeNuevaTareaModal() {
    this.showNuevaTareaModal = false;
  }

  submitNuevaTarea() {
    this.submittedNuevaTarea = true;
    if (!this.nuevaTareaForm.nombreTarea || !this.nuevaTareaForm.descripcionTarea || !this.nuevaTareaForm.fechaInicio || !this.nuevaTareaForm.fechaFin) {
      return;
    }
    this.loadingNuevaTarea = true;
    this.mensajeResultado = null;
    const token = this.authService.getToken();
    if (!token) {
      this.mensajeResultado = 'No se encontró token de autenticación.';
      this.loadingNuevaTarea = false;
      return;
    }
    this.taskService.crearTarea(token, {
      idusuario: this.nuevaTareaForm.idusuario,
      nombreTarea: this.nuevaTareaForm.nombreTarea,
      descripcionTarea: this.nuevaTareaForm.descripcionTarea,
      fechaInicio: this.nuevaTareaForm.fechaInicio,
      fechaFin: this.nuevaTareaForm.fechaFin,
      prioridad: this.nuevaTareaForm.prioridad
    }).subscribe({
      next: (resp) => {
        this.mensajeResultado = resp?.mensajeResultado || 'Tarea creada correctamente.';
        this.loadingNuevaTarea = false;
        setTimeout(() => {
          this.closeNuevaTareaModal();
          this.mensajeResultado = null;
        }, 1200);
      },
      error: (err) => {
        this.mensajeResultado = err?.response?.data?.mensajeResultado || 'Error al crear la tarea.';
        this.loadingNuevaTarea = false;
      }
    });
  }

  cargarUsuarios() {
    const token = this.authService.getToken();
    if (!token) return;
    this.taskService.getUsuarios(token).subscribe({
      next: (resp) => {
        this.usuariosSugeridos = resp?.usuarios || [];
      },
      error: () => {
        this.usuariosSugeridos = [];
      }
    });
  }

  onUsuarioInput(event: any) {
    const inputValue = event.target.value;
    const usuario = this.usuariosSugeridos.find(u => u.nombre === inputValue);
    this.nuevaTareaForm.idusuario = usuario ? usuario.idusuario : '';
  }

  closeProximamenteModal() {
    this.showProximamenteModal = false;
  }
  
  showProximamente(event: Event) {
    event.preventDefault();
    this.showProximamenteModal = true;
    // Cerrar automáticamente después de 2 segundos
    setTimeout(() => {
      this.closeProximamenteModal();
    }, 2000);
  }

  navigateToTask() {
    this.showProximamente(new Event('click'));
  }

  navigateToTablero() {
    this.openNuevaTareaModal();
  }
}
