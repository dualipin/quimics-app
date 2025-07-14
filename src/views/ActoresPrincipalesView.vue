<template>
  <div
    class="py-20 dark:from-gray-900 dark:to-gray-800 dark:text-white bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 min-h-dvh"
  >
    <!-- Encabezado con animación -->
    <div class="container mx-auto px-6 text-center" data-aos="fade-down">
      <h1
        class="text-6xl font-bold py-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500"
      >
        Los Revolucionarios de la Química
      </h1>
      <p class="text-xl mb-10 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Conoce a las mentes brillantes que cambiaron para siempre nuestra forma de entender los
        elementos
      </p>
    </div>

    <!-- Tarjetas de científicos -->
    <div class="container mx-auto px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <!-- Tarjeta 1 - Mendeléyev -->
      <article
        class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-purple-500 hover:shadow-2xl hover:duration-700"
        data-aos="zoom-in"
      >
        <div class="relative overflow-hidden h-64">
          <img
            src="@/assets/actores/Imagen1.jpg"
            alt="Dmitri Mendeléyev"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-6">
            <h2 class="text-3xl font-bold text-white">Dmitri Mendeléyev</h2>
            <p class="text-purple-300">Padre de la Tabla Periódica</p>
          </div>
        </div>
        <div class="p-6">
          <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            👋 Hola, soy Dmitri. Nací en Siberia en 1834 y revolucioné la química organizando los
            elementos en la tabla periódica que usas hoy. ¡Fue como resolver el puzzle más grande de
            la naturaleza!
          </p>
          <div class="mt-6 p-4 bg-purple-50 dark:bg-gray-700 rounded-xl">
            <p class="italic text-purple-600 dark:text-purple-300 font-medium">
              "La ciencia es el lenguaje de la naturaleza, y la tabla periódica es su abecedario."
            </p>
          </div>
          <div class="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span class="mr-2">🔬 Química</span>
            <span class="mr-2">🧪 Elementos</span>
            <span>📊 Organización</span>
          </div>
        </div>
      </article>

      <!-- Tarjeta 2 - Meyer -->
      <article
        class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-500 hover:shadow-2xl"
        data-aos="zoom-in"
        data-aos-delay="150"
      >
        <div class="relative overflow-hidden h-64">
          <img
            src="@/assets/actores/Imagen2.jpg"
            alt="Julius Lothar Meyer"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-6">
            <h2 class="text-3xl font-bold text-white">Julius Lothar Meyer</h2>
            <p class="text-blue-300">Pionero de la Periodicidad</p>
          </div>
        </div>
        <div class="p-6">
          <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            ✨ ¡Hola! Soy Julius, de Alemania. Mientras Dmitri trabajaba en Rusia, yo descubría
            patrones similares en los elementos. ¡La ciencia es un trabajo en equipo, aunque estemos
            a miles de kilómetros!
          </p>
          <div class="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-xl">
            <p class="italic text-blue-600 dark:text-blue-300 font-medium">
              "Los elementos bailan al ritmo de patrones ocultos. Nuestro trabajo es aprender sus
              pasos."
            </p>
          </div>
          <div class="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span class="mr-2">📈 Patrones</span>
            <span class="mr-2">🤝 Colaboración</span>
            <span>🔍 Descubrimiento</span>
          </div>
        </div>
      </article>

      <!-- Tarjeta 3 - Lavoisier -->
      <article
        class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-green-500 hover:shadow-2xl"
        data-aos="zoom-in"
        data-aos-delay="300"
      >
        <div class="relative overflow-hidden h-64">
          <img
            src="@/assets/actores/Imagen3.jpg"
            alt="Antoine Lavoisier"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-6">
            <h2 class="text-3xl font-bold text-white">Antoine Lavoisier</h2>
            <p class="text-green-300">Padre de la Química Moderna</p>
          </div>
        </div>
        <div class="p-6">
          <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            🇫🇷 Salut! Soy Antoine, de París. Antes de que existieran los influencers, yo era el
            influencer de la química del siglo XVIII. Descubrí que el oxígeno es esencial para la
            combustión y ayudé a crear el sistema métrico.
          </p>
          <div class="mt-6 p-4 bg-green-50 dark:bg-gray-700 rounded-xl">
            <p class="italic text-green-600 dark:text-green-300 font-medium">
              "En la naturaleza, nada se pierde, nada se crea, todo se transforma. #QuímicaViral"
            </p>
          </div>
          <div class="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span class="mr-2">🔥 Combustión</span>
            <span class="mr-2">⚖️ Conservación</span>
            <span>📏 Métrico</span>
          </div>
        </div>
      </article>
    </div>

    <!-- Llamado a la acción -->
    <div class="container mx-auto px-6 py-16 text-center" data-aos="fade-up">
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
        ¿Quieres aprender más sobre estos genios?
      </p>
      <RouterLink
        to="/"
        class="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-full hover:shadow-lg transition-all hover:scale-105"
      >
        Explora la Tabla Periódica
      </RouterLink>
    </div>
  </div>
</template>
