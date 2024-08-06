# Challenge Dux


Este proyecto es una aplicación de gestión de usuarios que utiliza React con Next.js y PrimeReact para el desarrollo del frontend. Los datos de usuarios se gestionan mediante un servidor JSON para operaciones CRUD (crear, leer, actualizar, eliminar). 

## Características

- **Interfaz de Usuario**: Utiliza PrimeReact para componentes como tablas, modales, y botones.
- **Filtrado y Paginación**: Incluye una barra de filtros para buscar usuarios por nombre y estado, y paginación para manejar grandes cantidades de datos.
- **Operaciones CRUD**: Permite agregar, editar, y eliminar usuarios.
- **Integración con JSON Server**: Utiliza JSON Server para la persistencia de datos en un entorno de desarrollo.

## Comandos útiles
 ```bash
 npm install
 npm run build
 npm run dev
 npx json-server --watch db.json --port 3001
