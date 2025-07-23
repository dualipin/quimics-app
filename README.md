# Studying Chemistry

Juegos para aprender química y divertirse

## Configuración recomendada del IDE

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (y deshabilitar Vetur).

## Soporte de Tipos para Importaciones de `.vue` en TS

TypeScript no puede manejar información de tipos para importaciones de `.vue` por defecto, por lo que reemplazamos el CLI `tsc` con `vue-tsc` para la comprobación de tipos. En los editores, necesitamos [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) para hacer que el servicio de lenguaje de TypeScript reconozca los tipos de `.vue`.

## Personalizar configuración

Consulta la [Referencia de Configuración de Vite](https://vite.dev/config/).

## Configuración del Proyecto

```sh
npm install --force
```

### Compilar y Recargar en Caliente para Desarrollo

```sh
npm run dev
```

## Que hace

- [x] Al iniciar sesión: Que pueda ingresar por correo y no por usuario, que si no recuerda su contraseña pueda recuperarla, que se pueda registrar si no tiene una cuenta
- [x] Tabla periodica: Cambiar el audio (grabarlo alguien del equipo (opcional) ) darle más diseños, dar opción de modo oscuro o claro a la ventana emergente, cambiar el fondo de la tabla.
- [x] Personajes: De la química y tabla periódica, que tenga información del personaje y audio donde lea su historia, esto aparecerá debajo de la tabla periódica o en un módulo como avatar o su foto, pero con animación. Cambiar los colores de los elementos de la tabla periódica y agregar en un apartado las reseñas( el Word que te mandare están los colores nuevos que llevara para que se pueda distinguir y las reseñas para anexar.
- [ ] Preguntas: Niveles y ganar recompensas, que con las recompensas que vaya acumulando pueda comprar o adquirir preguntas malas, tanto en las preguntas estáticas por el sistema como las preguntas generadas por IA, serán 5 preguntas por niveles, darle más diseño a todo.
- [ ] Loteria: Mas diseño, y que también puedan ganar recompensas, dinero para desbloquear aspectos de fondos o gorritos y recompensas de esa manera.
- [x] Memorama: Numero de átomo, elemento, que grupo pertenece (12 cartas)
- [ ] Culebrita: Formar grupos de elementos de la tabla periódica con 2 opciones, que aparezcan elementos de 2 grupos, pero tiene que seleccionar 1 de los grupos solicitados, si no pierde, con las recompensas que acumule podrá desbloquear aspectos y mapas.
- [ ] Creación de compuestos: Darle más animación y mas diseño
- [ ] Mario broos: Nivel avanzando, formulación de compuestos, que pueda elegir a su jugador en este caso serán los personajes relacionados a la química o creador de la tabla periodica.

ORDEN DE LOS JUEGOS

1. Memorama
2. Loteria
3. Preguntas
4. Culebrita
5. Creación de compuestos
6. Mario Bross

Las recompensas serán monedas en cada juego, con esas recompensas podrá desbloquear aspectos, obsequios u trajes para cada personaje.
