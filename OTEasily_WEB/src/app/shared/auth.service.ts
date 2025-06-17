import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string | null = null;
  private user: any = null;

  setAuth(user: any, token: string, idUsuario: string, nombreUsuario: string) {
    this.user = user;
    this.token = token;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('idUsuario', idUsuario);
    localStorage.setItem('nombreUsuario', nombreUsuario);
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return this.token || localStorage.getItem('token');
    }
    return null;
  }

  getUser(): any {
    if (this.isBrowser()) {
      return this.user || JSON.parse(localStorage.getItem('user') || 'null');
    }
    return null;
  }

  getIdUsuario(): string | null {
    if (this.isBrowser()) {
      const id = localStorage.getItem('idUsuario');
      if (!id || id === 'undefined') return null;
      return id;
    }
    return null;
  }

  getNombreUsuario(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('nombreUsuario');
    }
    return null;
  }

  clearAuth() {
    this.user = null;
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
