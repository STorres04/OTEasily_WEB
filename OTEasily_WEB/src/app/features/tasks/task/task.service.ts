import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
import { BASE_URL } from '../../../app.config';

export interface Task {
  idtarea: string;
  nombreTarea: string;
  descripcionTarea: string;
  fechaIncio: string;
  fechaFin: string;
  fechaCierre: string | null;
  fechaCreacion: string;
  estado: string;
  progreso: string;
  prioridad: string;
  responsable: string;
}

export interface Anotacion {
  idanotacion: string;
  idtarea: string;
  tipoAnotacion: string;
  descripcion: string;
  accion: string;
  fechaAnotacion: string;
  fechaCreacion: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {  getTasks(token: string, idusuario: string, fechaInicio?: string, fechaFin?: string, prioridad?: number): Observable<Task[]> {
    return new Observable(observer => {
      // Construimos el objeto en el orden exacto requerido por el backend
      const payload: any = {
        idusuario: idusuario,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        prioridad: prioridad
      };
      axios.post(`${BASE_URL}/OTEasily/Task/consultar`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
    });
  }

  getAnotacionesPorTarea(token: string, idtarea: string): Observable<Anotacion[]> {
    return new Observable(observer => {
      axios.post(`${BASE_URL}/OTEasily/Task/Anotaciones/consultar`, {
        idtarea: idtarea
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        observer.next(response.data?.anotaciones || []);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
    });
  }
  crearTarea(token: string, tarea: {
    idusuario: string;
    nombreTarea: string;
    descripcionTarea: string;
    fechaInicio: string;
    fechaFin: string;
    prioridad: number;
  }): Observable<any> {
    return new Observable(observer => {
      // Construimos el objeto para mantener el orden específico en el JSON
      const tareaAjustada = {
        idusuario: tarea.idusuario,
        nombreTarea: tarea.nombreTarea,
        descripcionTarea: tarea.descripcionTarea,
        fechaInicio: tarea.fechaInicio,
        fechaFin: tarea.fechaFin,
        prioridad: tarea.prioridad
      };
      
      axios.post(`${BASE_URL}/OTEasily/Task/crear`, tareaAjustada, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
    });
  }

  getUsuarios(token: string): Observable<{usuarios: {nombre: string, idusuario: string}[]}> {
    return new Observable(observer => {
      axios.get(`${BASE_URL}/OTEasily/Usuarios/Maestro/consultar`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
    });
  }
}
