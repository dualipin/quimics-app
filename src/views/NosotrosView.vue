<script setup lang="ts">
import equipoImagen from '@/assets/equipo.jpeg'
</script>
<template>
  <main class="dark:bg-gray-900 dark:text-gray-100 pt-20">
    <!-- Hero Section -->
    <section class="hero-pattern py-20 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1
            class="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl"
          >
            <span class="block">Sobre</span>
            <span class="block gradient-text mt-2">Nosotros</span>
          </h1>
          <p
            class="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          >
            Transformando el aprendizaje de la química a través de la innovación educativa
          </p>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-16 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center mb-12">
          <h2
            class="text-base text-green-600 dark:text-green-400 font-semibold tracking-wide uppercase"
          >
            Nuestra Misión
          </h2>
          <p
            class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl"
          >
            Revolucionando el aprendizaje de la química
          </p>
        </div>

        <div class="prose prose-green prose-lg text-gray-500 dark:text-gray-300 mx-auto">
          <p class="mb-4">
            <span class="font-bold text-green-600 dark:text-green-400">Studying Chemistry</span>
            nace como respuesta a uno de los principales retos en la educación media superior: el
            aprendizaje de la tabla periódica y los conceptos básicos de química. Según el ensayo
            <span class="italic">"El interés de los estudiantes respecto a la química"</span> de
            Ángel Vázquez Alonso y María Antonia Manassero, alrededor del 65% de los estudiantes de
            13 años consideran las ciencias una asignatura difícil. Esta situación se agrava en
            contextos donde los recursos educativos innovadores son limitados, afectando
            directamente el desempeño académico en áreas científicas.
          </p>
          <p>
            En el informe <span class="italic">"Tendencias que moldean la educación 2022"</span> de
            la OECD, se destaca que las tecnologías digitales permiten un acceso casi ilimitado a
            datos e información, promoviendo la innovación como clave para mejorar la calidad
            educativa. En México, existen más de 3.3 millones de estudiantes en nivel medio superior
            bajo la modalidad escolarizada, quienes pueden beneficiarse directamente de herramientas
            innovadoras como Studying Chemistry.
          </p>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="bg-green-50 dark:bg-green-900 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6 text-center">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
                Estudiantes consideran difícil la química
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-green-600 dark:text-green-400">65%</dd>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6 text-center">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
                Estudiantes de nivel medio superior en México
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-green-600 dark:text-green-400">
                +3.3 millones
              </dd>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6 text-center">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
                Enfoque en ODS de la ONU
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-green-600 dark:text-green-400">
                Educación de Calidad
              </dd>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-16 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center mb-12">
          <h2
            class="text-base text-green-600 dark:text-green-400 font-semibold tracking-wide uppercase"
          >
            Nuestro Equipo
          </h2>
          <p
            class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl"
          >
            Jóvenes comprometidos con la innovación
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Juntos, buscamos transformar la enseñanza de la química en México, promoviendo una
            educación de calidad, inclusiva y alineada con los Objetivos de Desarrollo Sostenible.
          </p>
        </div>

        <!-- Team Image -->
        <div class="mb-12">
          <div class="max-w-3xl mx-auto">
            <img
              :src="equipoImagen"
              alt="Nuestro equipo"
              class="w-full h-auto shadow-lg object-cover"
              style="border-radius: 70% 30% 78% 22% / 28% 73% 27% 72%"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <!-- Team Member 1 -->
          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 team-card"
          >
            <div class="px-4 py-5 sm:px-6 text-center">
              <h3 class="text-2xl leading-6 font-medium text-gray-900 dark:text-gray-100">
                Iván Antonio Méndez Segura
              </h3>
            </div>
          </div>

          <!-- Team Member 2 -->
          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 team-card"
          >
            <div class="px-4 py-5 sm:px-6 text-center">
              <h3 class="text-2xl leading-6 font-medium text-gray-900 dark:text-gray-100">
                Irvin Emir Méndez Segura
              </h3>
            </div>
          </div>

          <!-- Team Member 3 -->
          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 team-card"
          >
            <div class="px-4 py-5 sm:px-6 text-center">
              <h3 class="text-2xl leading-6 font-medium text-gray-900 dark:text-gray-100">
                Ángeles Zamora Cuevas
              </h3>
            </div>
          </div>

          <!-- Team Member 4 -->
          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 team-card"
          >
            <div class="px-4 py-5 sm:px-6 text-center">
              <h3 class="text-2xl leading-6 font-medium text-gray-900 dark:text-gray-100">
                Kevin de Jesús Álvarez Collado
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision Section -->
    <section class="bg-gradient-to-r from-green-600 to-blue-600 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          <span class="block">Nuestra Visión</span>
        </h2>
        <p class="mt-4 text-lg leading-6 text-green-100">
          Transformar la enseñanza de la química en México, promoviendo una educación de calidad,
          inclusiva y alineada con los Objetivos de Desarrollo Sostenible.
        </p>
        <div class="mt-8 flex justify-center">
          <div class="inline-flex rounded-md shadow">
            <RouterLink
              :to="{ name: 'periodica' }"
              class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
            >
              Ir a la tabla periódica
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
</template>
<!-- <style scoped>
.hero-pattern {
  background-color: #f9faff;
  /* background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); */
}

.hero-pattern.dark {
  background-color: #1a202c;
}

.gradient-text {
  background: linear-gradient(90deg, #059669, #10b981);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.team-card.dark:hover {
  box-shadow:
    0 20px 25px -5px rgba(255, 255, 255, 0.1),
    0 10px 10px -5px rgba(255, 255, 255, 0.04);
}
</style> -->
