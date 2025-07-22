# VirellaRent Frontend

Este es el frontend de VirellaRent, una aplicación web desarrollada con Angular para la gestión de alquiler de espacios para eventos y reservas.

## Tabla de Contenidos

1.  [Requisitos Previos](#-requisitos-previos)
2.  [Instalación](#-instalación)
3.  [Configuración del Entorno](#-configuración-del-entorno)
4.  [Ejecución del Proyecto](#-ejecución-del-proyecto)
5.  [Uso de la Aplicación](#-uso-de-la-aplicación)

---

## Requisitos Previos

Antes de instalar y ejecutar el proyecto, asegúrate de tener lo siguiente instalado en tu sistema:

*   **Node.js**: Versión 20.x o superior. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
*   **npm** (Node Package Manager): Viene incluido con Node.js.
*   **Angular CLI**: Instálalo globalmente usando npm:
    ```bash
    npm install -g @angular/cli
    ```
*   **Backend de VirellaRent**: Este frontend requiere un backend en ejecución para funcionar correctamente. Asegúrate de tener el backend de VirellaRent configurado y corriendo en `http://localhost:8080` (o la URL configurada en `environment.ts`).

---

## Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

1.  **Clona el repositorio**:
    ```bash
    git clone https://github.com/AnthonyM77CG/eventos-angular.git
    cd virellarent-frontend
    ```

2.  **Instala las dependencias**:
    Navega al directorio del proyecto y ejecuta npm para instalar todas las dependencias:
    ```bash
    npm install
    ```

---

## Configuración del Entorno

El proyecto utiliza un archivo de entorno para gestionar variables como la URL base de la API.

1.  Abre el archivo `src/app/core/environments/environment.ts`
2.  Verifica que `apiBaseUrl` apunte a la URL de tu backend. Por defecto, está configurado para `http://localhost:8080/api`:

    ```typescript
    export const environment = {
        production: false,
        apiBaseUrl: 'http://localhost:8080/api'
    };
    ```
    Si tu backend se ejecuta en un puerto o dominio diferente, actualiza esta URL.

---

## Ejecución del Proyecto

Una vez que hayas instalado las dependencias y configurado el entorno, puedes iniciar el servidor de desarrollo de Angular:

1.  **Inicia el servidor de desarrollo**:
    ```bash
    ng serve
    ```
2.  **Accede a la aplicación**:
    Abre tu navegador web y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si realizas cambios en los archivos fuente.

---

## 🚀 Uso de la Aplicación

La aplicación VirellaRent ofrece diferentes funcionalidades dependiendo del rol del usuario (público, usuario registrado, administrador).

### **Público (Sin Iniciar Sesión)**

*   **Inicio (`/inicio`)**: Página principal con información general sobre VirellaRent.
*   **Locales (`/locales`)**: Explora los diferentes espacios para eventos disponibles.
*   **Nosotros (`/nosotros`)**: Conoce la historia, misión, visión y valores de la empresa.
*   **Contacto (`/contacto`)**: Formulario para enviar consultas o comentarios.
*   **Iniciar Sesión (`/login`)**: Accede a tu cuenta.
*   **Registrarse (`/register`)**: Crea una nueva cuenta de usuario.

### **Usuario Registrado (`/user`)**

Después de iniciar sesión con una cuenta de usuario, serás redirigido al panel de usuario.

*   **Mis Reservas (`/user/reservas`)**:
    *   Visualiza todas tus reservas.
    *   **Agregar Reserva (`/user/reservas/agregar`)**: Crea una nueva reserva seleccionando fecha, hora, asistentes, espacio de evento y plan. El proceso incluye la confirmación del pago.

### **Administrador (`/admin`)**

Después de iniciar sesión con una cuenta de administrador, serás redirigido al panel de administración.

*   **Dashboard (`/admin/dashboard`)**: Vista general con métricas de salones, reservas y usuarios.
*   **Locales (`/admin/locales`)**:
    *   Visualiza todos los locales registrados.
    *   **Agregar Local (`/admin/locales/agregar`)**: Crea un nuevo espacio para eventos.
    *   **Editar Local (`/admin/locales/editar/:id`)**: Modifica los detalles de un local existente.
    *   **Eliminar Local**: Elimina un local de la base de datos.
*   **Planes (`/admin/planes`)**:
    *   Visualiza todos los planes de reserva.
    *   **Agregar Plan (`/admin/planes/agregar`)**: Crea un nuevo plan.
    *   **Editar Plan (`/admin/planes/editar/:id`)**: Modifica los detalles de un plan existente.
    *   **Eliminar Plan**: Elimina un plan de la base de datos.
*   **Reservas (`/admin/reservas`)**: Visualiza todas las reservas realizadas, con opciones de filtrado por mes y año.
*   **Historial Pagos (`/admin/pagos`)**: Consulta el historial completo de todos los pagos.