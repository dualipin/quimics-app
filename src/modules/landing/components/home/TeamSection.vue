<script setup lang="ts">
import teamImage from '@/assets/equipo.jpeg'
</script>

<template>
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
            :src="teamImage"
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
</template>
