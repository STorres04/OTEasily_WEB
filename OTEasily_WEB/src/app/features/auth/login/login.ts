import { Component, EventEmitter, Output } from '@angular/core';
import axios from 'axios';
import { BASE_URL } from '../../../app.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  @Output() registerClicked = new EventEmitter<void>();
  errorMessage: string | null = null;

  onSubmit(event: Event, formData: { usuario: string; password: string }) {
    event.preventDefault();
    const apiUrl = `${BASE_URL}/OTEasily/Usuarios/login`; 
    axios.post(apiUrl, formData)
      .then(response => {
        console.log('Autenticación exitosa:', response.data);
        this.errorMessage = null; // Limpiar mensaje de error si la autenticación es exitosa
      })
      .catch(error => {
        console.error('Error en la autenticación:', error);
        this.errorMessage = error.response?.data?.mensajeResultado || 'Ocurrió un error inesperado.';
      });
  }

  onRegisterClick() {
    this.registerClicked.emit();
  }
}
