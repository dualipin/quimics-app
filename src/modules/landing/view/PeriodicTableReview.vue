<template>
  <div
    class="min-h-screen overflow-hidden bg-gradient-to-t from-yellow-100 to-white pt-20 dark:from-gray-900 dark:to-black dark:text-white"
  >
    <!-- Header -->
    <header class="px-4 py-12 text-center">
      <motion.div
        :initial="{ opacity: 0, y: -20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8 }"
      >
        <h1 class="mb-4 text-5xl font-bold dark:text-gray-100">Historia de la Tabla Periódica</h1>
        <p class="mx-auto max-w-3xl text-xl dark:text-gray-300">
          Un viaje a través del tiempo para descubrir cómo la humanidad organizó los elementos
          químicos
        </p>
      </motion.div>
    </header>

    <!-- Main Timeline -->
    <main class="container mx-auto px-4 py-12">
      <div class="relative">
        <!-- Timeline line -->
        <div
          class="bg-opacity-30 absolute left-1/2 h-full w-1 -translate-x-1/2 transform bg-white dark:bg-gray-600"
        ></div>

        <!-- Timeline items -->
        <div class="space-y-24">
          <!-- Lavoisier 1790 -->
          <motion.div
            :initial="{ opacity: 0, x: -100 }"
            :whileInView="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.8 }"
            :viewport="{ once: true }"
            class="relative flex items-center justify-between"
          >
            <div
              class="z-1 pr-8 sm:sm:w-5/12"
              @click="playElementAudio(1)"
              @mouseenter="playElementAudio(1)"
              @mouseleave="stopAudio"
            >
              <div
                class="bg-opacity-10 border-opacity-20 rounded-xl border border-white bg-white p-6 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-900"
              >
                <div class="mb-4 flex items-center">
                  <span class="mr-2 text-2xl font-bold text-yellow-700 dark:text-yellow-300"
                    >1790</span
                  >
                  <span class="text-sm tracking-wider uppercase dark:text-gray-300"
                    >Antoine Lavoisier</span
                  >
                </div>
                <p class="text-gray-800 dark:text-gray-300">
                  El químico francés recopiló una lista de 23 elementos, incluyendo oro, plata,
                  carbón y oxígeno. Considerado el padre de la química moderna, estableció las bases
                  para la comprensión sistemática de los elementos.
                </p>
              </div>
            </div>
            <div
              class="absolute left-1/2 flex h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-white bg-indigo-500 dark:border-gray-600 dark:bg-indigo-700"
            >
              <span class="text-2xl text-white">1</span>
            </div>
            <div class="sm:w-5/12"></div>
          </motion.div>

          <!-- Döbereiner 1829 -->
          <motion.div
            :initial="{ opacity: 0, x: 100 }"
            :whileInView="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.8 }"
            :viewport="{ once: true }"
            class="relative flex items-center justify-between"
          >
            <div class="sm:w-5/12"></div>
            <div
              class="absolute left-1/2 flex h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-white bg-purple-500 dark:border-gray-600 dark:bg-purple-700"
            >
              <span class="text-2xl text-white">2</span>
            </div>
            <div
              class="z-1 pl-8 sm:w-5/12"
              @click="playElementAudio(2)"
              @mouseenter="playElementAudio(2)"
              @mouseleave="stopAudio"
            >
              <div
                class="bg-opacity-10 border-opacity-20 rounded-xl border border-white bg-white p-6 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-900"
              >
                <div class="mb-4 flex items-center">
                  <span class="mr-2 text-2xl font-bold text-yellow-700 dark:text-yellow-300"
                    >1829</span
                  >
                  <span class="text-sm tracking-wider uppercase dark:text-gray-300"
                    >Johann W. Döbereiner</span
                  >
                </div>
                <p class="text-gray-800 dark:text-gray-300">
                  El químico alemán organizó los elementos en grupos de tres (tríadas), donde cada
                  triada mostraba propiedades químicas similares mientras que las propiedades
                  físicas variaban. Este fue un primer intento de clasificación periódica.
                </p>
              </div>
            </div>
          </motion.div>

          <!-- Newlands 1864 -->
          <motion.div
            :initial="{ opacity: 0, x: -100 }"
            :whileInView="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.8 }"
            :viewport="{ once: true }"
            class="relative flex items-center justify-between"
          >
            <div
              class="z-1 pr-8 sm:w-5/12"
              @click="playElementAudio(3)"
              @mouseenter="playElementAudio(3)"
              @mouseleave="stopAudio"
            >
              <div
                class="bg-opacity-10 border-opacity-20 rounded-xl border border-white bg-white p-6 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-900"
              >
                <div class="mb-4 flex items-center">
                  <span class="mr-2 text-2xl font-bold text-yellow-700 dark:text-yellow-300"
                    >1864</span
                  >
                  <span class="text-sm tracking-wider uppercase dark:text-gray-300"
                    >John A. Newlands</span
                  >
                </div>
                <p class="text-gray-800 dark:text-gray-300">
                  Propuso la "Ley de las Octavas" al organizar 56 elementos, notando que las
                  propiedades se repetían cada ocho elementos, similar a las notas musicales. Aunque
                  incompleta, esta observación fue crucial para el desarrollo posterior.
                </p>
              </div>
            </div>
            <div
              class="absolute left-1/2 flex h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-white bg-pink-500 dark:border-gray-600 dark:bg-pink-700"
            >
              <span class="text-2xl text-white">3</span>
            </div>
            <div class="sm:w-5/12"></div>
          </motion.div>

          <!-- Mendeleiev 1869 -->
          <motion.div
            :initial="{ opacity: 0, x: 100 }"
            :whileInView="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.8 }"
            :viewport="{ once: true }"
            class="relative flex items-center justify-between"
          >
            <div class="sm:w-5/12"></div>
            <div
              class="absolute left-1/2 flex h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-white bg-red-500 dark:border-gray-600 dark:bg-red-700"
            >
              <span class="text-2xl text-white">4</span>
            </div>
            <div
              class="pl-8 sm:w-5/12"
              @click="playElementAudio(4)"
              @mouseenter="playElementAudio(4)"
              @mouseleave="stopAudio"
            >
              <div
                class="bg-opacity-10 border-opacity-20 rounded-xl border border-white bg-white p-6 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-900"
              >
                <div class="mb-4 flex items-center">
                  <span class="mr-2 text-2xl font-bold text-yellow-700 dark:text-yellow-300"
                    >1869</span
                  >
                  <span class="text-sm tracking-wider uppercase dark:text-gray-300"
                    >Dimitri I. Mendeleiev</span
                  >
                </div>
                <p class="text-gray-800 dark:text-gray-300">
                  Publicó su tabla periódica con 63 elementos, organizados por masa atómica pero
                  respetando sus propiedades. Su genialidad fue dejar espacios vacíos para elementos
                  aún no descubiertos, prediciendo sus características con notable precisión.
                </p>
              </div>
            </div>
          </motion.div>

          <!-- Moseley 1912 -->
          <motion.div
            :initial="{ opacity: 0, x: -100 }"
            :whileInView="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.8 }"
            :viewport="{ once: true }"
            class="relative flex items-center justify-between"
          >
            <div
              class="z-1 pr-8 sm:w-5/12"
              @click="playElementAudio(5)"
              @mouseenter="playElementAudio(5)"
              @mouseleave="stopAudio"
            >
              <div
                class="bg-opacity-10 border-opacity-20 rounded-xl border border-white bg-white p-6 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-900"
              >
                <div class="mb-4 flex items-center">
                  <span class="mr-2 text-2xl font-bold text-yellow-700 dark:text-yellow-300"
                    >1912</span
                  >
                  <span class="text-sm tracking-wider uppercase dark:text-gray-300"
                    >Henry G.J. Moseley</span
                  >
                </div>
                <p class="text-gray-800 dark:text-gray-300">
                  Determinó que la clasificación debía basarse en el número atómico (protones) en
                  lugar de la masa atómica. Esto resolvió inconsistencias en la tabla de Mendeleiev
                  y estableció el fundamento científico moderno de la tabla periódica.
                </p>
              </div>
            </div>
            <div
              class="absolute left-1/2 flex h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-white bg-orange-500 dark:border-gray-600 dark:bg-orange-700"
            >
              <span class="text-2xl text-white">5</span>
            </div>
            <div class="sm:w-5/12"></div>
          </motion.div>

          <!-- Seaborg 1951 -->
          <motion.div
            :initial="{ opacity: 0, x: 100 }"
            :whileInView="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.8 }"
            :viewport="{ once: true }"
            class="relative flex items-center justify-between"
          >
            <div class="sm:w-5/12"></div>
            <div
              class="absolute left-1/2 flex h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-white bg-green-500 dark:border-gray-600 dark:bg-green-700"
            >
              <span class="text-2xl text-white">6</span>
            </div>
            <div
              class="pl-8 sm:w-5/12"
              @click="playElementAudio(6)"
              @mouseenter="playElementAudio(6)"
              @mouseleave="stopAudio"
            >
              <div
                class="bg-opacity-10 border-opacity-20 rounded-xl border border-white bg-white p-6 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-900"
              >
                <div class="mb-4 flex items-center">
                  <span class="mr-2 text-2xl font-bold text-yellow-700 dark:text-yellow-300"
                    >1951</span
                  >
                  <span class="text-sm tracking-wider uppercase dark:text-gray-300"
                    >Glenn T. Seaborg</span
                  >
                </div>
                <p class="text-gray-800 dark:text-gray-300">
                  Premio Nobel por descubrir los elementos transuránicos. Propuso la serie de los
                  actínidos separada en la tabla periódica, modificando su estructura para acomodar
                  los elementos más pesados, dando forma a la tabla que conocemos hoy.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>

    <!-- Modern Table Section -->
    <section class="bg-gradient-to-b from-yellow-100 to-black px-4 py-16 dark:from-gray-900">
      <div class="container mx-auto">
        <motion.div
          :initial="{ opacity: 0 }"
          :while-in-view="{ opacity: 1 }"
          :transition="{ duration: 1 }"
          :viewport="{ once: true }"
          class="mb-12 text-center"
        >
          <h2 class="mb-4 text-4xl font-bold text-gray-100 dark:text-gray-300">
            La Tabla Periódica Moderna
          </h2>
          <p class="mx-auto max-w-3xl text-gray-300 dark:text-gray-400">
            Hoy contamos con 118 elementos organizados científicamente, pero la historia continúa...
          </p>
        </motion.div>
      </div>
    </section>
  </div>

  <audio ref="audioRef" class="hidden"></audio>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import { useLandingAudio } from '../composables/useLandingAudio'
const { audioRef, playElementAudio, stopAudio } = useLandingAudio('periodic-table')
</script>

<style>
/* Estilos globales */
body {
  font-family: 'Inter', sans-serif;
}
</style>
