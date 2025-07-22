<script setup lang="ts">
import equipoImagen from '@/assets/equipo.jpeg'
import HeroSection from '../components/home/HeroSection.vue'
import TeamSection from '../components/home/TeamSection.vue'
import FeaturesSection from '../components/home/FeaturesSection.vue'
import ComparativeSection from '../components/home/ComparativeSection.vue'
import CTA from '../components/home/CTA.vue'
</script>
<template>
  <main>
    <!-- Hero Section -->
    <HeroSection />

    <FeaturesSection />

    <ComparativeSection />

    <CTA />

    <!-- Mission Section -->
    <!-- <section class="py-16 bg-white dark:bg-gray-800">
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
    </section> -->

    <!-- Stats -->
    <!-- <section class="bg-green-50 dark:bg-green-900 py-12">
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
    </section> -->

    <!-- Features Section -->

    <!-- Team Section -->
    <!-- <TeamSection /> -->

    <!-- Vision Section -->
    <!-- <section class="bg-gradient-to-r from-green-600 to-blue-600 py-16">
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
              to=""
              class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
            >
              Ir a la tabla periódica
            </RouterLink>
          </div>
        </div>
      </div>
    </section> -->
  </main>

  <!-- Footer -->
</template>
