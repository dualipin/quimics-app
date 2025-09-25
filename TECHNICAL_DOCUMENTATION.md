# Documentación Técnica - Studying Chemistry

## Descripción General

**Studying Chemistry** es una aplicación web educativa desarrollada en Vue.js 3 con TypeScript que ofrece múltiples juegos interactivos para el aprendizaje de química. La aplicación incluye 8 juegos diferentes, sistema de recompensas, autenticación de usuarios y contenido educativo sobre química.

## Arquitectura del Proyecto

### Tecnologías Principales
- **Frontend**: Vue.js 3 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Routing**: Vue Router
- **Linting**: ESLint + Prettier

## Estructura de Módulos (`src/`)

### 1. **Módulo de Autenticación** (`modules/auth/`)

**Propósito**: Gestiona la autenticación y autorización de usuarios.

**Funcionalidades**:
- Login por correo electrónico
- Registro de nuevos usuarios
- Recuperación de contraseña
- Gestión de roles (estudiante, profesor)
- Persistencia de sesión

**Componentes Clave**:
- `auth-store.ts`: Store de Pinia para manejo del estado de autenticación
- Formularios de login y registro
- Middleware de autenticación para rutas protegidas

### 2. **Módulo de Juegos de Preguntas** (`modules/quiz/`)

**Propósito**: Sistema de preguntas y respuestas con múltiples fuentes de contenido.

**Funcionalidades**:
- Preguntas del sistema, generadas por IA y de la comunidad
- Sistema de niveles y dificultad (fácil, medio, difícil)
- Puntuación y monedas como recompensas
- Creación de preguntas (solo profesores)
- Seguimiento de rachas de respuestas correctas

**Componentes Principales**:
- `QuizGame.vue`: Vista principal del juego
- `QuestionCard.vue`: Tarjeta de pregunta individual
- `CreateQuestionForm.vue`: Formulario para crear preguntas (profesores)
- `quiz-store.ts`: Gestión del estado del juego
- `quiz-services.ts`: Servicios API para preguntas

**Tipos de Datos**:
```typescript
interface Question {
  id?: number | null
  question: string
  options: string[]
  answer: string
  difficulty: 'easy' | 'medium' | 'hard'
  created_by: 'system' | 'IA' | string
}
```

### 3. **Módulo Snake/Culebrita** (`modules/snake/`)

**Propósito**: Juego de la culebrita con elementos químicos y formación de compuestos.

**Funcionalidades**:
- Juego Snake tradicional con temática química
- Formación de grupos de elementos de la tabla periódica
- Selección entre 2 grupos de elementos
- Sistema de niveles con objetivos específicos
- Personalización de skins y aspectos cosméticos
- Recompensas por completar objetivos

**Componentes Principales**:
- `Snake.vue`: Vista principal del juego
- `GameBoard.vue`: Tablero de juego con lógica de Snake
- Sistema de objetivos por nivel
- Gestión de elementos químicos y sus propiedades

### 4. **Módulo de Tabla Periódica** (`modules/periodic-table/`)

**Propósito**: Tabla periódica interactiva con información detallada de elementos.

**Funcionalidades**:
- Tabla periódica completa e interactiva
- Información detallada de cada elemento
- Audio descriptivo para elementos
- Modo oscuro/claro
- Colores personalizados por grupos de elementos
- Reseñas históricas de elementos

**Características**:
- Ventanas emergentes con información del elemento
- Reproducción de audio al hacer hover
- Diseño responsive y accesible

### 5. **Módulo de Personajes Famosos** (`modules/chemists/`)

**Propósito**: Información educativa sobre químicos famosos y descubrimientos históricos.

**Funcionalidades**:
- Perfiles de químicos históricos importantes
- Línea de tiempo de descubrimientos
- Información biográfica con imágenes
- Contribuciones científicas destacadas
- Comparativas históricas

**Componentes Principales**:
- `FamousChemists.vue`: Galería de químicos famosos
- `TimelineView.vue`: Línea de tiempo histórica
- `KeyDiscoveries.vue`: Descubrimientos clave
- `PeriodicTableReview.vue`: Historia de la tabla periódica

**Químicos Incluidos**:
- Antoine Lavoisier (Padre de la química moderna)
- Dmitri Mendeleev (Tabla periódica)
- Marie Curie (Radiactividad)
- Linus Pauling (Enlaces químicos)

### 6. **Módulo de Servicios** (`services/`)

**Propósito**: Capa de abstracción para comunicación con APIs y servicios externos.

**Funcionalidades**:
- Cliente HTTP configurado (axios/fetch)
- Interceptores para autenticación
- Manejo de errores centralizado
- Endpoints organizados por módulo

**Estructura**:
- `api.ts`: Cliente HTTP base
- Servicios específicos por módulo (quiz-services.ts, etc.)

### 7. **Módulo de Stores** (`stores/`)

**Propósito**: Gestión centralizada del estado de la aplicación usando Pinia.

**Stores Principales**:
- `quiz-store.ts`: Estado del juego de preguntas
- `auth-store.ts`: Estado de autenticación
- Stores específicos para cada juego

### 8. **Módulo de Componentes** (`components/`)

**Propósito**: Componentes reutilizables de la interfaz de usuario.

**Categorías**:
- **UI Components**: Botones, modales, navegación
- **Game Components**: Elementos específicos de juegos
- **Layout Components**: Estructura de páginas

**Componentes Destacados**:
- `SimpleNav.vue`: Navegación responsive
- `Navbar.vue`: Barra de navegación principal
- Componentes de juego específicos

### 9. **Módulo de Vistas** (`views/`)

**Propósito**: Páginas principales de la aplicación.

**Vistas Principales**:
- Vista de inicio/dashboard
- Vistas específicas de cada juego
- Páginas educativas
- Perfil de usuario

### 10. **Módulo de Router** (`router/`)

**Propósito**: Configuración de rutas y navegación.

**Funcionalidades**:
- Rutas protegidas por autenticación
- Lazy loading de componentes
- Guards de navegación
- Rutas dinámicas para juegos

### 11. **Módulo de Layout** (`layout/`)

**Propósito**: Plantillas de diseño reutilizables.

**Layouts**:
- Layout principal de la aplicación
- Layout específico para juegos
- Layout para páginas educativas

## Sistema de Recompensas

### Monedas y Puntos
- **Puntos por dificultad**: Fácil (10), Medio (20), Difícil (30)
- **Monedas**: Sistema de recompensas para desbloquear contenido
- **Niveles**: Progresión cada 5 preguntas correctas
- **Rachas**: Seguimiento de respuestas consecutivas correctas

### Desbloqueables
- Aspectos cosméticos para personajes
- Fondos y temas personalizados
- Contenido adicional de juegos
- Preguntas premium

## Orden de Juegos

1. **Tabla Periódica** - Exploración interactiva
2. **Memorama** - Memoria con elementos químicos
3. **Lotería** - Juego de azar educativo
4. **Preguntas** - Sistema de quiz implementado
5. **Culebrita** - Snake con elementos químicos
6. **Creación de Compuestos** - Formación molecular
7. **Visor 3D de Moléculas** - Visualización molecular
8. **Mario Bros** - Plataformas con química

## Configuración de Desarrollo

### Comandos Principales
```bash
npm install --force
npm run dev          # Desarrollo
npm run build        # Producción
npm run preview      # Vista previa
```

### Estructura de Archivos de Configuración
- `vite.config.ts`: Configuración de Vite
- `tsconfig.json`: Configuración de TypeScript
- `eslint.config.ts`: Reglas de linting
- `.prettierrc.json`: Formato de código

## Consideraciones Técnicas

### Accesibilidad
- Componentes compatibles con lectores de pantalla
- Navegación por teclado
- Contraste de colores adecuado
- Texto alternativo para imágenes

### Performance
- Lazy loading de rutas
- Optimización de imágenes
- Code splitting por módulos
- Caching de datos de API

### Seguridad
- Validación de entrada en formularios
- Sanitización de datos
- Autenticación JWT
- Protección CSRF

Esta documentación proporciona una visión completa de la arquitectura y funcionalidades del proyecto Studying Chemistry, facilitando el mantenimiento y desarrollo futuro de la aplicación.