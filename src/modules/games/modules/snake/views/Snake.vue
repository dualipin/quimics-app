<template>
  <ScreenDanger />

  <div class="pt-5 text-center">
    <!-- Título principal con animación -->
    <div class="animate-fade-in mb-2">
      <h1
        class="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
      >
        <span class="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Química Snake
        </span>
      </h1>

      <!-- Subtítulo con efecto de máquina de escribir -->
      <h2 class="typewriter mt-2 text-xl font-medium text-gray-700 md:text-2xl dark:text-gray-300">
        Culebrita Atómica
      </h2>
    </div>

    <div class="flex flex-col items-center">
      <!-- Tablero de juego -->
      <div class="animate-slide-up mb-8">
        <GameBoard />
      </div>

      <!-- Sección de compuestos -->
      <div
        class="animate-fade-in w-full max-w-7xl rounded-xl border border-gray-200 bg-white/90 p-6 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50 dark:shadow-2xl"
      >
        <h2
          class="mb-4 flex items-center justify-center gap-2 text-2xl font-bold text-gray-900 dark:text-white"
        >
          <FlaskRoundIcon class="h-6 w-6 text-cyan-500 dark:text-cyan-400" />
          Compuestos para formar
          <WandSparklesIcon class="h-6 w-6 text-amber-500 dark:text-amber-400" />
        </h2>

        <ul class="grid grid-cols-2 gap-3 md:grid-cols-4">
          <li
            v-for="compuesto in compuestos"
            :key="compuesto.nombre"
            class="compuesto-formar group rounded-lg bg-gray-100/80 p-4 transition-all duration-200 hover:bg-gray-200/90 dark:bg-gray-700/40 dark:hover:bg-gray-700/60"
          >
            <div class="mb-1 font-semibold text-gray-900 dark:text-white">
              {{ compuesto.nombre }}
            </div>
            <div class="mb-2 text-sm text-gray-600 dark:text-gray-300">{{ compuesto.formula }}</div>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="elemento in compuesto.elementos"
                :key="elemento"
                class="compuesto-elemento flex items-center justify-center rounded-full px-2 py-1 text-xs font-bold"
                :class="getElementColor(elemento)"
              >
                {{ elemento }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GameBoard from '../components/GameBoard.vue'
import { compuestos } from '../data/compounds'
import { FlaskRoundIcon, WandSparklesIcon } from 'lucide-vue-next'
import ScreenDanger from '../components/ScreenDanger.vue'

gsap.registerPlugin(ScrollTrigger)

const getElementColor = (element: string) => {
  const colors: Record<string, string> = {
    H: 'bg-blue-100 text-blue-600 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700/50',
    O: 'bg-red-100 text-red-600 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700/50',
    C: 'bg-gray-100 text-gray-600 border border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700/50',
    N: 'bg-emerald-100 text-emerald-600 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700/50',
    Cl: 'bg-green-100 text-green-600 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700/50',
    Na: 'bg-amber-100 text-amber-600 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700/50',
  }
  return (
    colors[element] ||
    'bg-purple-100 text-purple-600 border border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-700/50'
  )
}

// Animación de máquina de escribir
onMounted(() => {
  gsap.from('.typewriter', {
    duration: 2,
    width: '0%',
    ease: 'steps(20)',
    delay: 0.5,
  })

  // Animación de entrada para el título principal
  gsap.from('.animate-fade-in', {
    duration: 1,
    opacity: 0,
    y: -20,
    ease: 'power2.out',
    stagger: 0.2,
  })

  // Animación de entrada para el tablero de juego
  gsap.from('.animate-slide-up', {
    duration: 0.5,
    opacity: 0,
    y: 30,
    ease: 'power2.out',
    delay: 0.3,
  })

  // Animación para los elementos de la lista
  gsap.from('.compuesto-elemento', {
    scrollTrigger: {
      trigger: '.compuesto-formar',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.6,
    ease: 'back.out',
  })
})
</script>
