# 📋 OTEasily Web

**OTEasily Web** es una aplicación web moderna de gestión de tareas desarrollada con Angular 20. Permite a los usuarios crear, editar, eliminar y gestionar tareas con un sistema completo de autenticación JWT, filtros avanzados y una interfaz responsive con modo oscuro/claro.

![Angular](https://img.shields.io/badge/Angular-20.0.0-red?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue?style=flat-square&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-green?style=flat-square&logo=node.js)

## 🚀 Características Principales

- ✅ **Sistema de Autenticación**: Login/registro con JWT
- 📝 **Gestión de Tareas**: CRUD completo con filtros avanzados
- 🎨 **Modo Oscuro/Claro**: Toggle de tema con persistencia
- 📱 **Responsive Design**: Optimizado para móviles, tablets y escritorio
- 🔄 **Server-Side Rendering**: Renderizado inicial en servidor
- 📊 **Sistema de Anotaciones**: Comentarios y seguimiento de progreso
- 🔍 **Filtros Inteligentes**: Por usuario, fecha, prioridad
- 🎯 **Modales Interactivos**: Formularios emergentes modernos

## 📋 Requisitos del Sistema

### Requisitos Obligatorios

| Herramienta | Versión Mínima | Versión Recomendada | Verificación |
|-------------|---------------|-------------------|--------------|
| **Node.js** | 18.13.0 | 20.x LTS | `node --version` |
| **npm** | 8.x | 10.x | `npm --version` |
| **Angular CLI** | 20.0.0 | 20.0.2 | `ng version` |
| **Git** | 2.x | Última | `git --version` |

### Navegadores Soportados

- ✅ **Chrome** 90+
- ✅ **Firefox** 88+
- ✅ **Safari** 14+
- ✅ **Edge** 90+

## 🛠️ Instalación y Configuración

### 1. Clonar el Repositorio

```bash
# Clonar el proyecto
git clone <https://github.com/STorres04/OTEasily_WEB.git>
cd OTEasily_WEB
```

### 2. Instalar Node.js y npm

#### Windows
```bash
# Descargar e instalar desde: https://nodejs.org/
# Verificar instalación
node --version
npm --version
```

#### macOS (con Homebrew)
```bash
brew install node
```

#### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. Instalar Angular CLI Globalmente

```bash
npm install -g @angular/cli@20.0.2

# Verificar instalación
ng version
```

### 4. Instalar Dependencias del Proyecto

```bash
# Instalar todas las dependencias
npm install

# O usar yarn (alternativo)
yarn install
```

### 5. Configurar Variables de Entorno

```bash
# El backend debe estar ejecutándose en:
# https://localhost:7085/OTEasily/

# Verificar configuración en src/app/app.config.ts
export const BASE_URL = 'https://localhost:7085';
```

## 🚀 Comandos de Ejecución

### Desarrollo

```bash
# Servidor de desarrollo
npm start
# o
ng serve

# Servidor de desarrollo con puerto específico
ng serve --port 4200

# Servidor de desarrollo con apertura automática del navegador
ng serve --open
```

**🌐 Acceso**: http://localhost:4200

### Server-Side Rendering (SSR)

```bash
# Construir para SSR
npm run build

# Ejecutar servidor SSR
npm run serve:ssr:OTEasily_WEB
```

**🌐 Acceso SSR**: http://localhost:4000

### Modo Producción

```bash
# Build de producción
npm run build

# Servir build de producción localmente
npx http-server dist/OTEasily_WEB/browser -p 8080
```

## 🧪 Testing y Calidad

### Pruebas Unitarias

```bash
# Ejecutar tests una vez
npm test
# o
ng test

# Tests en modo watch
ng test --watch

# Tests con cobertura
ng test --code-coverage
```

### Análisis de Código

```bash
# Linting
ng lint

# Formateo de código
npm run format
```

### Build de Verificación

```bash
# Verificar que el proyecto compila correctamente
npm run build

# Analizar el tamaño del bundle
ng build --stats-json
npx webpack-bundle-analyzer dist/OTEasily_WEB/stats.json
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── features/               # Funcionalidades por dominio
│   │   ├── auth/              # Sistema de autenticación
│   │   │   ├── login/         # Componente de login
│   │   │   └── register/      # Componente de registro
│   │   ├── menu/              # Navegación principal
│   │   ├── tasks/             # Gestión de tareas
│   │   │   └── task/          # Componente principal de tareas
│   │   └── dashboard/         # Panel de control (futuro)
│   ├── shared/                # Servicios y componentes reutilizables
│   │   ├── auth.service.ts    # Servicio de autenticación
│   │   ├── header/            # Componente header
│   │   └── footer/            # Componente footer
│   ├── assets/               # Recursos estáticos
│   ├── app.config.ts         # Configuración de la aplicación
│   └── app.routes.ts         # Definición de rutas
├── main.ts                   # Punto de entrada del cliente
├── main.server.ts           # Punto de entrada del servidor
└── server.ts               # Configuración del servidor Express
```

## 🔗 Configuración del Backend

La aplicación requiere un backend .NET ejecutándose en:

```
Base URL: https://localhost:7085/OTEasily/
```

### Endpoints Principales

| Función | Endpoint | Método |
|---------|----------|--------|
| **Login** | `/OTEasily/Usuarios/login` | POST |
| **Registro** | `/OTEasily/Usuarios/crear` | POST |
| **Consultar Tareas** | `/OTEasily/Task/consultar` | GET |
| **Crear Tarea** | `/OTEasily/Task/crear` | POST |
| **Actualizar Tarea** | `/OTEasily/Task/actualizar` | POST |
| **Eliminar Tarea** | `/OTEasily/Task/eliminar` | POST |
| **Usuarios** | `/OTEasily/Usuarios/Maestro/consultar` | GET |
| **Anotaciones** | `/OTEasily/Task/Anotaciones/crear` | POST |

### 🌐 Configuración de Navegador (CORS)

**⚠️ IMPORTANTE**: Debido a las políticas CORS del backend, es necesario ejecutar Chrome con configuraciones especiales para desarrollo local.

#### Windows
```bash
# Cerrar todas las instancias de Chrome antes de ejecutar
chrome.exe --disable-web-security --user-data-dir="C:\\ChromeDevSession"
```

#### macOS
```bash
# Cerrar todas las instancias de Chrome antes de ejecutar
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --user-data-dir="/tmp/ChromeDevSession"
```

#### Linux
```bash
# Cerrar todas las instancias de Chrome antes de ejecutar
google-chrome --disable-web-security --user-data-dir="/tmp/ChromeDevSession"
```

**📝 Notas importantes:**
- ⚠️ Solo usar para desarrollo local
- 🔒 Cierra todas las ventanas de Chrome antes de ejecutar el comando
- 💾 Se creará una sesión separada para desarrollo
- 🚫 No usar para navegación general (menos seguro)

### 🔄 Flujo de Inicio Completo

1. **Iniciar backend** .NET en `https://localhost:7085`
2. **Abrir Chrome** con el comando de desarrollo
3. **Ejecutar aplicación** con `npm start`
4. **Navegar** a `http://localhost:4200`

## 🐛 Solución de Problemas Comunes

### Error: `localStorage is not defined`
**Solución**: El proyecto ya incluye verificación SSR. Si persiste:
```bash
npm run build
npm run serve:ssr:OTEasily_WEB
```

### Error: Port 4200 is already in use
**Solución**:
```bash
# Usar puerto diferente
ng serve --port 4201

# O matar el proceso
npx kill-port 4200
```

### Error: Angular CLI no reconocido
**Solución**:
```bash
# Reinstalar Angular CLI
npm uninstall -g @angular/cli
npm install -g @angular/cli@20.0.2
```

### Error: Cannot resolve dependencies
**Solución**:
```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Error: Backend no disponible
**Verificaciones**:
1. Backend ejecutándose en `https://localhost:7085`
2. Certificados SSL configurados
3. CORS habilitado en el backend

### Error: CORS Policy / Network Error
**Síntomas**: 
- Error "Access to XMLHttpRequest has been blocked by CORS policy"
- Fallos en peticiones HTTP al backend
- "ERR_FAILED" en Network tab

**Solución**:
```bash
# ⚠️ Cerrar TODAS las ventanas de Chrome primero
# Luego ejecutar Chrome con configuración de desarrollo:
chrome.exe --disable-web-security --user-data-dir="C:\\ChromeDevSession"
```

**Alternativas**:
- Instalar extensión CORS Unblock
- Configurar proxy en Angular (angular.json)
- Solicitar configuración CORS en el backend

### Error: SSL Certificate Issues
**Síntomas**: Errores de certificado HTTPS
**Solución**:
```bash
# Aceptar certificado autofirmado en Chrome
# O configurar certificados válidos en el backend
```

## 📱 Funcionalidades Implementadas

### ✅ Sistema de Autenticación
- Login con validación de formularios
- Registro de nuevos usuarios
- Gestión de tokens JWT
- Protección automática de rutas

### ✅ Gestión de Tareas
- Lista de tareas con paginación
- Filtros por usuario, fecha y prioridad
- CRUD completo (Crear, Leer, Actualizar, Eliminar)
- Sistema de anotaciones y comentarios

### ✅ Interfaz de Usuario
- Diseño responsive para todos los dispositivos
- Toggle de modo oscuro/claro con persistencia
- Modales interactivos para formularios
- Sistema de notificaciones (éxito/error)
- Animaciones y transiciones suaves

### ✅ Características Técnicas
- Server-Side Rendering (SSR)
- Lazy Loading de componentes
- Optimización de bundles
- TypeScript strict mode
- Componentes standalone

## 🎯 Próximas Funcionalidades

- 🏠 **Dashboard**: Panel con estadísticas y métricas
- 👤 **Mi Cuenta**: Gestión completa de perfil
- 🔔 **Notificaciones**: Sistema de alertas en tiempo real
- 👥 **Roles y Permisos**: Control de acceso granular
- 📱 **PWA**: Capacidades offline

## 🤝 Contribución

### Workflow de Desarrollo

1. **Fork** el repositorio
2. **Crear** una rama para la funcionalidad: `git checkout -b feature/nueva-funcionalidad`
3. **Commit** los cambios: `git commit -m 'Añadir nueva funcionalidad'`
4. **Push** a la rama: `git push origin feature/nueva-funcionalidad`
5. **Crear** un Pull Request

### Estándares de Código

- **TypeScript**: Strict mode habilitado
- **ESLint**: Configuración Angular estándar
- **Prettier**: Formateo automático
- **Convenciones**: Naming camelCase para propiedades, PascalCase para componentes

## 📄 Información del Proyecto

| Atributo | Valor |
|----------|-------|
| **Versión** | 0.0.0 |
| **Angular** | 20.0.0 |
| **TypeScript** | 5.8.2 |
| **Node.js** | 20+ |
| **Licencia** | MIT |
| **Última actualización** | Junio 2025 |

## 📞 Soporte

Para reportar bugs o solicitar nuevas funcionalidades, crear un issue en el repositorio.

---

**⚡ ¡Listo para comenzar!** Sigue los pasos de instalación y tendrás OTEasily Web ejecutándose en tu entorno local.
