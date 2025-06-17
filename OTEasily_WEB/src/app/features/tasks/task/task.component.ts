import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task, Anotacion } from './task.service';
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

  mostrarPopupEliminar: boolean = false;
  tareaEliminarId: string | null = null;

  mostrarPopupEditar: boolean = false;
  tareaEditar: Task | null = null;
  tareaEditarForm: any = {};

  mostrarPopupGestionar: boolean = false;
  tareaGestionar: Task | null = null;
  anotacionForm: any = {};

  mostrarPopupAnotaciones: boolean = false;
  anotacionesTarea: Anotacion[] = [];
  anotacionesCargando: boolean = false;

  notificacionMensaje: string | null = null;
  notificacionTipo: 'success' | 'error' | null = null;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
    
  ) {
    // Obtener el token y el ID del usuario desde el servicio de autenticación
    this.token = this.authService.getToken();
    this.idusuario = this.authService.getIdUsuario();
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
    const url = `${BASE_URL}/OTEasily/Usuarios/Maestro/consultar`; 
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

  confirmarEliminar(task: Task) {
    this.tareaEliminarId = task.idtarea;
    this.mostrarPopupEliminar = true;
  }

  cancelarEliminar() {
    this.mostrarPopupEliminar = false;
    this.tareaEliminarId = null;
  }

  mostrarNotificacion(mensaje: string, tipo: 'success' | 'error') {
    this.notificacionMensaje = mensaje;
    this.notificacionTipo = tipo;
    setTimeout(() => {
      this.notificacionMensaje = null;
      this.notificacionTipo = null;
    }, 3500);
  }

  eliminarTarea() {
    if (!this.tareaEliminarId || !this.token) return;
    const url = `${BASE_URL}/OTEasily/Task/eliminar`;
    axios.post(url,{idtarea: this.tareaEliminarId}, {
      headers: { Authorization: `Bearer ${this.token}` }
    })
    .then(response => {
      this.mostrarPopupEliminar = false;
      this.tareaEliminarId = null;
      this.buscarTareas(); 
      const mensaje = response?.data?.mensajeResultado || 'Tarea eliminada correctamente.';
      this.mostrarNotificacion(mensaje, 'success');
    })
    .catch(error => {
      this.mostrarPopupEliminar = false;
      this.tareaEliminarId = null;
      const mensaje = error?.response?.data?.mensajeResultado || 'No se pudo eliminar la tarea.';
      this.mostrarNotificacion(mensaje, 'error');
    });
  }

  editarTarea(task: Task) {
    this.tareaEditar = task;
    this.tareaEditarForm = { ...task };
    this.mostrarPopupEditar = true;
  }

  cerrarPopupEditar() {
    this.mostrarPopupEditar = false;
    this.tareaEditar = null;
    this.tareaEditarForm = {};
  }

  guardarEdicion() {
    if (!this.tareaEditarForm || !this.token) return;
    const url = `${BASE_URL}/OTEasily/Task/actualizar`;
    let idusuario = this.tareaEditarForm.responsable;
    const usuarioObj = this.usuariosSugeridos.find(u => u.idusuario === this.tareaEditarForm.responsable || u.nombre === this.tareaEditarForm.responsable);
    if (usuarioObj) {
      idusuario = usuarioObj.idusuario;
    }
    const tareaActualizada = {
      idtarea: this.tareaEditarForm.idtarea,
      nombreTarea: this.tareaEditarForm.nombreTarea,
      descripcionTarea: this.tareaEditarForm.descripcionTarea,
      fechaInicio: this.tareaEditarForm.fechaIncio,
      fechaFin: this.tareaEditarForm.fechaFin,
      fechaCierre: this.tareaEditarForm.fechaCierre,
      estadoTarea: this.tareaEditarForm.estado,
      estado: undefined,
      prioridad: Number(this.tareaEditarForm.prioridad),
      progreso: Number(this.tareaEditarForm.progreso),
      idusuario: idusuario
    };
    axios.post(url, tareaActualizada, {
      headers: { Authorization: `Bearer ${this.token}` }
    })
    .then(response => {
      this.mostrarPopupEditar = false;
      this.tareaEditar = null;
      this.tareaEditarForm = {};
      this.buscarTareas();
      const mensaje = response?.data?.mensajeResultado || 'Tarea actualizada correctamente.';
      this.mostrarNotificacion(mensaje, 'success');
    })
    .catch(error => {
      this.mostrarPopupEditar = false;
      this.tareaEditar = null;
      this.tareaEditarForm = {};
      const mensaje = error?.response?.data?.mensajeResultado || 'No se pudo actualizar la tarea.';
      this.mostrarNotificacion(mensaje, 'error');
    });
  }

  gestionarTarea(task: Task) {
    this.tareaGestionar = task;
    this.anotacionForm = {
      idtarea: task.idtarea,
      tipoAnotacion: 1,
      descripcion: '',
      accion: '',
      progreso: 0
    };
    this.mostrarPopupGestionar = true;
  }

  cerrarPopupGestionar() {
    this.mostrarPopupGestionar = false;
    this.tareaGestionar = null;
    this.anotacionForm = {};
  }

  guardarAnotacion() {
    if (!this.anotacionForm || !this.token) return;
    const url = `${BASE_URL}/OTEasily/Task/Anotaciones/crear`;
    const anotacion = {
      idtarea: this.anotacionForm.idtarea,
      tipoAnotacion: "1",
      descripcion: this.anotacionForm.descripcion,
      accion: this.anotacionForm.accion,
      progreso: Number(this.anotacionForm.progreso)
    };
    axios.post(url, anotacion, {
      headers: { Authorization: `Bearer ${this.token}` }
    })
    .then(response => {
      this.mostrarPopupGestionar = false;
      this.tareaGestionar = null;
      this.anotacionForm = {};
      this.buscarTareas();
      const mensaje = response?.data?.mensajeResultado || 'Anotación guardada correctamente.';
      this.mostrarNotificacion(mensaje, 'success');
    })
    .catch(error => {
      this.mostrarPopupGestionar = false;
      this.tareaGestionar = null;
      this.anotacionForm = {};
      const mensaje = error?.response?.data?.mensajeResultado || 'No se pudo guardar la anotación.';
      this.mostrarNotificacion(mensaje, 'error');
    });
  }

  verAnotacionesTarea(task: Task | null) {
    if (!task || !this.token) return;
    this.mostrarPopupAnotaciones = true;
    this.anotacionesCargando = true;
    this.anotacionesTarea = [];
    this.taskService.getAnotacionesPorTarea(this.token, task.idtarea).subscribe({
      next: (anotaciones) => {
        this.anotacionesTarea = anotaciones;
        this.anotacionesCargando = false;
      },
      error: () => {
        this.anotacionesTarea = [];
        this.anotacionesCargando = false;
      }
    });
  }

  cerrarPopupAnotaciones() {
    this.mostrarPopupAnotaciones = false;
    this.anotacionesTarea = [];
    this.anotacionesCargando = false;
  }
}
