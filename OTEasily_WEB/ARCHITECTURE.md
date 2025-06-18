# OTEasily Web - Documentación de Arquitectura

## 📋 Resumen del Proyecto

**OTEasily Web** es una aplicación web moderna de gestión de tareas desarrollada con Angular 20. Permite a los usuarios crear, editar, eliminar y gestionar tareas con un sistema completo de autenticación JWT y una interfaz responsive.

## 🏗️ Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Angular 20)                    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │    Auth     │  │    Menu     │  │    Tasks    │         │
│  │  (Login/    │  │ (Navigation)│  │ (CRUD Tasks)│         │
│  │  Register)  │  │             │  │             │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│         │                 │                 │              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ AuthService │  │ Shared Comp │  │ TaskService │         │
│  │ (JWT/Token) │  │(Header/Foot)│  │  (HTTP/API) │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                   HTTP/HTTPS (Axios)                       │
├─────────────────────────────────────────────────────────────┤
│                   BACKEND API (.NET)                       │
│     🔗 https://localhost:7085/OTEasily/                    │
│     ├─ /Usuarios/* (Auth & User Management)               │
│     ├─ /Task/* (Task CRUD Operations)                     │
│     └─ /Task/Anotaciones/* (Task Annotations)             │
└─────────────────────────────────────────────────────────────┘
```

## 🏗️ Arquitectura Técnica

### Stack Tecnológico
- **Frontend**: Angular 20 + TypeScript 5.8
- **Server**: Node.js + Express 5.1 (SSR)
- **HTTP Client**: Axios 1.10
- **Rendering**: Server-Side Rendering (SSR)
- **Styling**: CSS nativo responsive

### Patrones Arquitectónicos
- **Feature-based Architecture**: Organización por funcionalidades
- **Standalone Components**: Sin NgModules, mayor flexibilidad
- **Lazy Loading**: Carga bajo demanda de componentes
- **Service-oriented**: Servicios para lógica de negocio y estado

## 📁 Estructura del Proyecto

```
src/app/
├── features/           # Funcionalidades organizadas por dominio
│   ├── auth/          # Sistema de autenticación
│   ├── menu/          # Navegación principal
│   ├── tasks/         # Gestión de tareas
│   └── dashboard/     # Panel de control (futuro)
├── shared/            # Servicios y componentes reutilizables
├── assets/           # Recursos estáticos (imágenes, iconos)
├── app.config.ts     # Configuración de la aplicación
└── app.routes.ts     # Definición de rutas
```

## 🎯 Funcionalidades Principales

### 🔐 Sistema de Autenticación
- Login y registro de usuarios
- Autenticación JWT con tokens Bearer
- Gestión de sesión persistente (localStorage)
- Protección automática de rutas

### 📝 Gestión de Tareas
- CRUD completo de tareas
- Filtros por usuario, fecha y prioridad
- Sistema de anotaciones y comentarios
- Estados y progreso de tareas
- Interfaz modal para nueva tarea

### 🎨 Interfaz de Usuario
- Diseño responsive (móvil, tablet, escritorio)
- Modales y formularios interactivos
- Sistema de notificaciones
- Navegación intuitiva con menú

## 🔗 Servicios y APIs

### Backend Integration
- **Base URL**: `https://localhost:7085/OTEasily/`
- **Autenticación**: Bearer Token (JWT)
- **Endpoints principales**:
  - `/Usuarios/*` - Gestión de usuarios y autenticación
  - `/Task/*` - Operaciones CRUD de tareas
  - `/Task/Anotaciones/*` - Sistema de anotaciones

### Servicios Frontend
- **AuthService**: Gestión de autenticación y tokens
- **TaskService**: Comunicación con APIs de tareas
- **Axios HTTP Client**: Manejo de peticiones HTTP

## 🌐 Routing y Navegación

### Estructura de Rutas
- `/login` - Página de inicio de sesión
- `/register` - Registro de nuevos usuarios
- `/menu` - Panel principal con gestión de tareas
- Redirección automática a login para rutas no autenticadas

### Características
- **Lazy Loading**: Componentes cargados bajo demanda
- **Standalone Components**: Arquitectura sin NgModules
- **Route Guards**: Protección implícita de rutas autenticadas

## 📱 Diseño Responsive

### Breakpoints
- **Desktop**: > 900px
- **Tablet**: 600px - 900px  
- **Mobile**: < 600px

### Características
- **Mobile-first**: Optimizado para dispositivos móviles
- **Flexbox Layout**: Diseño flexible y adaptativo
- **Touch-friendly**: Elementos táctiles optimizados

## � Seguridad y Performance

### Medidas de Seguridad
- Validación JWT en cada petición
- Sanitización automática de inputs (Angular)
- Protección contra XSS
- Gestión segura de tokens en localStorage

### Optimizaciones
- **SSR**: Renderizado inicial en servidor
- **Lazy Loading**: Carga diferida de componentes
- **Tree Shaking**: Eliminación de código no utilizado
- **Bundle Optimization**: Optimización automática en producción

## 🚀 Desarrollo y Deploy

### Scripts Principales
- `npm start` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm test` - Ejecución de tests
- `npm run serve:ssr` - Servidor SSR

### Herramientas de Desarrollo
- **Testing**: Jasmine + Karma
- **Build**: Angular CLI + Webpack
- **TypeScript**: Strict mode habilitado
- **Code Quality**: ESLint + Prettier

## 🎯 Roadmap y Mejoras Futuras

### Funcionalidades Pendientes
- **🏠 Dashboard**: Panel con estadísticas y métricas
- **👤 Mi Cuenta**: Gestión completa de perfil de usuario
- **🔔 Notificaciones**: Sistema de alertas en tiempo real
- **👥 Roles**: Control de acceso y permisos granulares
- **📱 PWA**: Capacidades offline y mobile app

### Mejoras Técnicas
- **State Management**: Implementación de NgRx para estado complejo
- **Testing**: Ampliación de cobertura de pruebas unitarias
- **CI/CD**: Pipeline automatizado de despliegue
- **Monitoring**: Sistema de logging y métricas de rendimiento
- **Internationalization**: Soporte multi-idioma

---

## 📋 Información del Proyecto

| Atributo | Valor |
|----------|-------|
| **Versión** | 0.0.0 |
| **Angular** | 20.0.0 |
| **TypeScript** | 5.8.2 |
| **Última actualización** | Junio 2025 |

---

*Esta documentación proporciona una visión general de alto nivel de la arquitectura de OTEasily Web. Para detalles técnicos específicos, consulte el código fuente y los comentarios en los archivos individuales.*
