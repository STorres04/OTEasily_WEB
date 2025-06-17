import { Component, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import { Router, RouterModule } from '@angular/router';
import { Header } from '../../../shared/header/header'; 
import { Footer } from '../../../shared/footer/footer';
import { BASE_URL } from '../../../app.config';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, Header, Footer],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  showLogin = true; // Variable para controlar la visibilidad de los componentes
  showRegister = false; // Variable para controlar la visibilidad del componente de registro
  //constructor(private _router: Router) {}
  @Output() loginRedirect = new EventEmitter<void>();

  formData = {
    usuario: '',
    contrasena: '',
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    email: '',
    telefono: '',
    tipoIdentificacion: 1,
    identificacion: ''
  };

  errorMessage: string | null = null;
  successMessage: string | null = null; // Mensaje de éxito

  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  async registerUser() {
    const apiUrl = `${BASE_URL}/OTEasily/Usuarios/crear`; // Cambiar por la URL real de la API

    // Validar que los campos obligatorios no estén vacíos
    if (!this.formData.usuario || !this.formData.contrasena || !this.formData.primerNombre ||
        !this.formData.primerApellido || !this.formData.email || !this.formData.telefono ||
        !this.formData.identificacion) {
      console.error('Por favor, complete todos los campos obligatorios.');
      this.errorMessage = 'Por favor, complete todos los campos obligatorios.';
      return;
    }
    var telefono = this.formData.telefono.toString();
    var identificacion = this.formData.identificacion.toString();
    this.formData.identificacion = identificacion.replace(/\D/g, ''); // Eliminar
    this.formData.telefono = telefono.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    try {
      const response = await axios.post(apiUrl, this.formData);
      console.log('Registro exitoso:', response.data);
      this.errorMessage = null; 
      this.successMessage = response.data.mensajeResultado; 
      this.cdr.detectChanges(); 
    } catch (err) {
      const error = err as any; 
      console.error('Error al registrar:', error);
      this.errorMessage = error.response?.data?.mensajeResultado || 'Ocurrió un error inesperado.';
    }
  }

  closeError() {
    console.log('Botón de cierre presionado');
    this.errorMessage = null;
    this.cdr.detectChanges(); // Forzar la actualización del DOM
  }
  onRegisterClick() {
    this.router.navigate(['/register']);
  }
   toggleView() {
    this.showLogin = !this.showLogin; // Alternar entre login y registro
  }

  onRegisterClicked() {
    this.showLogin = false; // Mostrar el componente de registro
  }

  onHomeClicked() {
    this.showLogin = true; // Mostrar el componente de login
  }

  handleLoginRedirect() {
    this.showLogin = true; // Cambiar la bandera para mostrar el login
  }

  closeSuccess() {
    console.log('Botón de cierre de éxito presionado');
    this.successMessage = null;
    this.router.navigate(['/login']); // Redirigir al login
  }
}
