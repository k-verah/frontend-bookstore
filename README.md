# Frontend Bookstore 

Este proyecto implementa un **CRUD de autores** en **Next.js** usando **App Router**.  
Se conecta al backend `bookstore-back` y permite:

- Listar autores  
- Crear autores  
- Editar autores  
- Eliminar autores  

---

##  Tecnologías usadas
- [Next.js 15](https://nextjs.org/) con App Router  
- React Hooks (`useState`, `useEffect`)  
- TailwindCSS para estilos básicos  
- Fetch API para llamadas al backend  

---

## Requisitos previos
- Tener instalado **Node.js** (>= 18) y **npm**  
- Tener configurado y corriendo el backend (`bookstore-back`)  

---

##  Backend (bookstore-back)
Clona y ejecuta el backend en tu máquina local:  

```bash
git clone https://github.com/k-verah/bookstore-back.git
cd bookstore-back
docker build ./ -t bookstore
docker run -d -p 127.0.0.1:8080:8080 bookstore
docker ps
```
##  Frontend (bookstore-back)
1. Clonar este repositorio
```bash
git clone https://github.com/k-verah/frontend-bookstore.git
cd frontend-bookstore
```
2. Instala dependencias
3. Ejecutar el servidor de desarrollo


##  Funcionalidades implementadas

### Listar autores (/authors)
	•	Muestra todos los autores desde el backend.
	•	Botón Editar - redirige a /authors/[id]/edit.
	•	Botón Eliminar - borra el autor de la lista y backend.

### Crear autor (/crear)
	•	Formulario controlado con useState.
	•	Campos: nombre, descripción, fecha de nacimiento, URL de imagen.
	•	Al enviar - POST al backend y reseteo de formulario.

### Editar autor (/authors/[id]/edit)
	•	Ruta dinámica que busca el autor por su id.
	•	Precarga los datos en el formulario.
	•	Permite modificar y guardar con un PUT.
	•	Redirige al listado de autores.

### Eliminar autor
	•	Se puede eliminar directamente desde la lista.
	•	Llama a DELETE en el backend.
	•	Actualiza la lista en tiempo real.

##  Evidencias de funcionamiento
	•	 Autor creado con éxito:
<img width="1726" height="984" alt="Screenshot 2025-09-21 at 12 31 07 PM" src="https://github.com/user-attachments/assets/bfeb8046-8499-4098-b96a-84cd7ca2252b" />

	•	 Lista de autores
<img width="1725" height="985" alt="Screenshot 2025-09-21 at 12 32 24 PM" src="https://github.com/user-attachments/assets/d5944349-5c1a-4960-8be8-f6bf49a40c0f" />

	•	 Pantalla de edición
<img width="508" height="528" alt="Screenshot 2025-09-21 at 12 47 08 PM" src="https://github.com/user-attachments/assets/bb4ec7eb-16dc-49f8-bba0-3c9b017706f4" />

	•	 Eliminación de autor: al oprimir el boton el eliminar, podemos ver como se elimino el autor de ejemplo Pablo Neruda
<img width="1723" height="949" alt="Screenshot 2025-09-21 at 12 47 40 PM" src="https://github.com/user-attachments/assets/76e21132-d7e0-408d-977a-3701315e6834" />


## Parcial 1 

### Arquitectura
La arquitectura sigue una separacion por carpetas:
	- src/app - contiene las páginas principales (/authors, /favoritos, /authors/[id]/edit, etc.).
	- src/hooks - contiene hooks personalizados como useAuthors, donde esta la logica para consumir el backend y manejar autores.
	- src/context - contiene el Favorites, encargado de manejar el estado global de los autores favoritos y compartirlo entre rutas.

El flujo principal se basa en un CRUD de autores conectado a un backend con API REST.

### Accesibilidad
Se implemento la opción de Accesibilidad, añadiendo lo siguiente
	Navegación por teclado: todos los botones y enlaces muestran foco visible con focus:ring de Tailwind.
	Atributos ARIA:
	 	- aria-pressed="true/false" en el botón de favoritos.
	 	- aria-label en botnes de editar y eliminar.
		- Cambios de estado accesibles: el botón de favoritos refleja su estado con aria-pressed.
