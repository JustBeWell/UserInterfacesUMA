
# UmaRoyalFlush

## Descripción
**UmaRoyalFlush** es un juego de **póker** y/o **blackjack** online diseñado para ser jugado en plataformas web. El proyecto se enfoca en la creación de una interfaz de usuario intuitiva y funcional, y está pensado para ofrecer una experiencia de juego fluida y emocionante en línea.

## Temática Principal
Juego de póker y/o blackjack online para plataformas web.

## Miembros del Equipo

- **CIO**: Angel Nicolás Escaño López  
  Email: angelesc04@uma.es
- **CTO**: Diego Sicre Cortizo  
  Email: 0611146788@uma.es
- **CEO**: Miguel Carmona Cabello  
  Email: 0610937481@uma.es
- **COO**: Sergio Bueno Gómez  
  Email: Seyrohn@uma.es
- **CXO**: Garv Mahendralal Vanza  
  Email: garvmahvanza@uma.es

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas:

1. **Node.js** (versión >= 14.x): Puedes descargarlo desde [https://nodejs.org/](https://nodejs.org/).
2. **npm** (viene incluido con Node.js).

También es recomendable tener configurado un editor de código como **Visual Studio Code**.

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/UmaRoyalFlush.git
   ```

2. **Navega al directorio del proyecto**:
   ```bash
   cd UmaRoyalFlush
   ```

3. **Instala las dependencias del proyecto**:
   Asegúrate de estar en el directorio raíz del proyecto y ejecuta:
   ```bash
   npm install
   ```

4. **Configura el entorno**:
   Si es necesario, configura las variables de entorno en un archivo `.env`. Si no hay un archivo `.env` predeterminado, crea uno basado en el archivo de ejemplo `.env.example`.

## Ejecución

Para ejecutar el proyecto en tu máquina local, sigue estos pasos:

1. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

   Esto lanzará la aplicación en modo de desarrollo y podrás acceder a ella en `http://localhost:3000`.

2. **Para ejecutar el build de producción**, utiliza:
   ```bash
   npm run build
   ```

   Luego puedes servir la aplicación con:
   ```bash
   npm run start
   ```

3. **Accede a la aplicación**:
   Después de iniciar el servidor de desarrollo, abre tu navegador y ve a `http://localhost:3000` para ver la aplicación en ejecución.

## Estructura del Proyecto

A continuación, se describe la estructura básica de carpetas de este proyecto:

```
UmaRoyalFlush/
├── public/              # Archivos estáticos (imágenes, fuentes, etc.)
├── src/                 # Código fuente de la aplicación
│   ├── components/      # Componentes de React
│   ├── pages/           # Páginas de la aplicación
│   ├── services/        # Lógica del negocio y servicios
│   └── App.js           # Componente principal
├── package.json         # Configuración de dependencias y scripts
├── .env.example         # Archivo de ejemplo de configuración del entorno
├── README.md            # Este archivo
└── .gitignore           # Archivos que no se deben versionar
```

## Contribuciones

Las contribuciones al proyecto son bienvenidas. Si deseas contribuir, sigue estos pasos:

1. Haz un **fork** del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un **commit** con un mensaje descriptivo.
4. **Push** a tu repositorio (`git push origin feature/nueva-funcionalidad`).
5. Abre un **Pull Request** para que revisemos tus cambios.

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](https://opensource.org/licenses/MIT).

---

**¡Gracias por usar UmaRoyalFlush!**  
Si tienes preguntas, no dudes en contactarnos a través de nuestros correos electrónicos o números de contacto.

