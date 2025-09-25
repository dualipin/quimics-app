<template>
  <section id="modern" class="py-20">
    <div class="max-w-6xl mx-auto px-4">
      <motion.div
        :initial="{ opacity: 0, y: 50 }"
        :while-in-view="{ opacity: 1, y: 0, transition: { duration: 0.8 } }"
        :inViewOptions="{ once: true }"
      >
        <h2
          class="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          Química Moderna
        </h2>
      </motion.div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          :initial="{ opacity: 0, x: -50 }"
          :while-in-view="{ opacity: 1, x: 0, transition: { duration: 0.8 } }"
        >
          <h3 class="text-2xl font-bold mb-6">Avances Recientes</h3>
          <p class="text-gray-700 dark:text-gray-300 mb-6">
            La química moderna abarca desde la nanotecnología hasta la química verde, buscando
            soluciones sostenibles para los desafíos globales.
          </p>

          <div class="space-y-4">
            <motion.div
              :while-in-view="{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }"
              :initial="{ opacity: 0, y: 20 }"
              v-for="(advance, index) in advances"
              :key="index"
              class="flex items-start"
            >
              <div class="flex-shrink-0 mt-1 mr-4 text-cyan-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-gray-100">{{ advance.title }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ advance.description }}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          :initial="{ opacity: 0, scale: 0.9 }"
          :while-in-view="{ opacity: 1, scale: 1, transition: { duration: 0.8 } }"
          :exit="{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }"
        >
          <div class="relative">
            <div
              class="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl opacity-20 blur-xl"
            ></div>
            <div
              class="relative bg-gray-100 dark:bg-gray-800/50 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700/50"
            >
              <img
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Modern Chemistry"
                class="w-full h-auto object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
interface Advance {
  title: string
  description: string
}

const advances: Advance[] = [
  {
    title: 'Nanotecnología Molecular',
    description: 'Diseño y manipulación de materiales a escala atómica y molecular.',
  },
  {
    title: 'Química Verde',
    description:
      'Desarrollo de procesos químicos que reducen o eliminan el uso de sustancias peligrosas.',
  },
  {
    title: 'Computación Cuántica Química',
    description: 'Uso de computadoras cuánticas para simular moléculas complejas.',
  },
  {
    title: 'Materiales Inteligentes',
    description: 'Desarrollo de materiales que responden a estímulos ambientales.',
  },
  {
    title: 'Biología Sintética',
    description:
      'Diseño y construcción de nuevos sistemas biológicos con aplicaciones médicas e industriales.',
  },
]
</script>
