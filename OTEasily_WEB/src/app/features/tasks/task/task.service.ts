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
export class TaskService {
  getTasks(token: string, idusuario: string, fechaInicio?: string, fechaFin?: string, prioridad?: number): Observable<Task[]> {
    return new Observable(observer => {
      axios.post(`${BASE_URL}/OTEasily/Task/consultar`, {
        idusuario: idusuario,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        prioridad: prioridad
      }, {
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
}
