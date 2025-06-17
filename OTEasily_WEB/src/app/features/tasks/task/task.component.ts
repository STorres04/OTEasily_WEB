import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from './task.service';
import { AuthService } from '../../../shared/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { BASE_URL } from '../../../app.config';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  private token: string | null = null;
  private idusuario: string | null = null;
  selectedUsuario: string = '';
  selectedFechaInicio: string = '';
  selectedFechaFin: string = '';
  selectedPrioridad: string = '';
  usuariosSugeridos: { nombre: string; idusuario: string }[] = [];
  selectedUsuarioId: string = '';

  tareaSeleccionada: Task | null = null;
  mostrarPopup: boolean = false;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
    
  ) {
    // Obtener el token y el ID del usuario desde el servicio de autenticación
    this.token = this.authService.getToken();
    this.idusuario = '6C670B0BD2284CE88F94CD3D8FA6C6C4';//this.authService.getIdUsuario();
  }

  ngOnInit() {
    if (!this.token || !this.idusuario) {
      // Si no hay token o usuario, redirigir al login
      this.router.navigate(['/login']);
      return;
    }
    this.cargarUsuarios();
    // Simulación de fechas y prioridad por defecto
   this.loadTasks();
   
  }

  cargarUsuarios() {
    const token = this.token;
    const url = `${BASE_URL}/OTEasily/Usuarios/Maestro/consultar`; // Reemplaza por la URL real
    if (!token) return;
    axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      if (response.data && response.data.usuarios) {
        this.usuariosSugeridos = response.data.usuarios;
      } else {
        this.usuariosSugeridos = [];
      }
    })
    .catch(() => {
      this.usuariosSugeridos = [];
    });
  }

  loadTasks() {
    const fechaInicio = undefined;
    const fechaFin = undefined;
    const prioridad = undefined;
    if (this.token && this.idusuario) {
      this.taskService.getTasks(this.token, this.idusuario, fechaInicio, fechaFin, prioridad).subscribe({
        next: data => {
          // Si la respuesta tiene la propiedad 'tareas', usarla
          if (data && (data as any).tareas) {
            this.tasks = (data as any).tareas;
          } else {
            this.tasks = data as any[];
          }
        },
        error: err => this.tasks = []
      });
    }
  }

  buscarTareas() {
    const fechaInicio = this.selectedFechaInicio || undefined;
    const fechaFin = this.selectedFechaFin || undefined;
    const prioridad = this.selectedPrioridad !== '' ? Number(this.selectedPrioridad) : undefined;
    // Usar el idusuario seleccionado si existe, si no, el propio
    const usuario = this.selectedUsuarioId || this.idusuario;
    if (this.token && usuario) {
      this.taskService.getTasks(this.token, usuario, fechaInicio, fechaFin, prioridad).subscribe({
        next: data => {
          if (data && (data as any).tareas) {
            this.tasks = (data as any).tareas;
          } else {
            this.tasks = data as any[];
          }
        },
        error: err => this.tasks = []
      });
    }
  }

  onUsuarioInput(event: any) {
    const inputValue = event.target.value;
    const usuario = this.usuariosSugeridos.find(u => u.nombre === inputValue);
    this.selectedUsuarioId = usuario ? usuario.idusuario : '';
  }

  limpiarFiltros() {
    this.selectedUsuario = '';
    this.selectedUsuarioId = '';
    this.selectedFechaInicio = '';
    this.selectedFechaFin = '';
    this.selectedPrioridad = '';
    this.buscarTareas();
  }

  verTarea(task: Task) {
    this.tareaSeleccionada = task;
    this.mostrarPopup = true;
  }

  cerrarPopup() {
    this.mostrarPopup = false;
    this.tareaSeleccionada = null;
  }
}
