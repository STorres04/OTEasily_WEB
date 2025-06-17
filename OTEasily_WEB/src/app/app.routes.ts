import { Routes } from '@angular/router';
import { MenuComponent } from './features/menu/menu.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

/*export const routes: Routes = [
  { path: '', loadComponent: () => import('./app').then(m => m.AppComponent) },
  { path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.Login) }
];*/
export const routes: Routes = [
    {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
    {
      path: 'menu',
      loadComponent: () => import('./features/menu/menu.component').then(m => m.MenuComponent)
    },
    {
      path: 'register',
      loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)     
    },
    {
      path: '**',
      loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)  
    },
];
 
console.log('Routes configured:', routes);