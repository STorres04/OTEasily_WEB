import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app';
import { AuthModule } from '../app/features/auth/auth.module';
import { Task } from './features/tasks/task/task';
import { Tablero } from './features/dashboard/tablero/tablero';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Register } from './features/auth/register/register';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppComponent,
    Task,
    Tablero,
    Header,
    Footer,
    FormsModule,
    Register,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
