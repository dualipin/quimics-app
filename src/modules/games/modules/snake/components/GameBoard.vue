<template>
  <div class="relative flex flex-col items-center justify-center p-4">
    <!-- Partículas de fondo -->
    <div class="pointer-events-none absolute inset-0">
      <div
        v-for="i in 50"
        :key="i"
        class="particle absolute rounded-full bg-blue-400/50 dark:bg-blue-500/50"
      ></div>
    </div>

    <!-- Contenedor principal -->
    <div class="z-10 flex w-full max-w-6xl flex-col items-center gap-8 lg:flex-row lg:items-start">
      <!-- Tablero de juego -->
      <div class="relative">
        <div
          class="game-board rounded-xl border border-gray-300/50 bg-white/80 p-1 shadow-2xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50"
        >
          <div v-for="y in gridSize" :key="y" class="row flex">
            <div
              v-for="x in gridSize"
              :key="x"
              class="cell flex h-6 w-6 items-center justify-center border-gray-300/50 transition-all duration-200 sm:h-8 sm:w-8 dark:border-gray-700/30"
              :class="{
                'rounded-sm bg-emerald-500': isSnake(x - 1, y - 1),
                'scale-110': isFood(x - 1, y - 1),
              }"
            >
              <span
                v-if="isFood(x - 1, y - 1)"
                class="food-icon animate-pulse text-lg font-bold"
                :style="{ color: getFoodColor(x - 1, y - 1) }"
              >
                {{ getFoodSymbol(x - 1, y - 1) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Efecto de borde animado -->
        <div
          class="animate-border pointer-events-none absolute inset-0 rounded-xl border-2 border-transparent"
        ></div>
      </div>

      <!-- Panel de información -->
      <div
        class="info-panel w-full max-w-md rounded-xl border border-gray-300/50 bg-white/80 p-6 shadow-2xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50"
      >
        <div class="space-y-6">
          <!-- Controles -->
          <div class="grid grid-cols-2 gap-3">
            <button
              @click="startGame"
              class="flex transform items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-emerald-500 active:scale-95"
            >
              <span class="flex items-center justify-center gap-2">
                <PlayCircleIcon class="h-5 w-5" />
                Iniciar
              </span>
            </button>
            <button
              @click="stopGame"
              class="flex transform items-center justify-center rounded-lg bg-amber-600 px-4 py-2 font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-amber-500 active:scale-95"
            >
              <span class="flex items-center justify-center gap-2">
                <PauseCircleIcon class="h-5 w-5" />
                Pausar
              </span>
            </button>
            <button
              @click="resetGame"
              class="col-span-2 flex transform items-center justify-center rounded-lg bg-rose-600 px-4 py-2 font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-rose-500 active:scale-95"
            >
              <span class="flex items-center justify-center gap-2">
                <RefreshCwIcon class="h-5 w-5" />
                Reiniciar
              </span>
            </button>
          </div>

          <!-- Puntuación -->
          <div class="rounded-lg bg-gray-200/70 p-4 dark:bg-gray-700/50">
            <h3
              class="mb-2 text-sm font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-300"
            >
              Puntuación
            </h3>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ puntuacion }}</p>
          </div>

          <!-- Elementos recolectados -->
          <div class="rounded-lg bg-gray-200/70 p-4 dark:bg-gray-700/50">
            <h3
              class="mb-3 text-sm font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-300"
            >
              Elementos recolectados
            </h3>
            <div class="flex min-h-12 flex-wrap gap-2">
              <span
                v-for="(el, index) in elementosRecolectados"
                :key="index"
                class="flex items-center gap-1 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 px-3 py-1 text-sm font-bold text-white shadow-md"
              >
                {{ el }}
              </span>
              <span
                v-if="elementosRecolectados.length === 0"
                class="text-sm text-gray-500 dark:text-gray-400"
              >
                Ningún elemento recolectado
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notificación de compuesto formado -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="compuestoFormado"
        class="animate-float fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 transform items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-600 to-emerald-600 px-6 py-4 text-white shadow-xl"
      >
        <SparklesIcon class="h-6 w-6 flex-shrink-0" />
        <div>
          <h4 class="text-lg font-bold">¡Compuesto formado!</h4>
          <p class="text-sm">{{ compuestoFormado }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { useSnakeGame } from '../composables/useSnakeGame'
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { PauseCircleIcon, PlayCircleIcon, RefreshCwIcon, SparklesIcon } from 'lucide-vue-next'

const {
  snake,
  gridSize,
  elementosRecolectados,
  compuestoFormado,
  puntuacion,
  startGame,
  stopGame,
  resetGame,
  comidas,
} = useSnakeGame()

const isSnake = (x: number, y: number) => {
  return snake.value.some((segment) => segment.x === x && segment.y === y)
}

const isFood = (x: number, y: number) => {
  return comidas.value.some((c) => c.position.x === x && c.position.y === y)
}

const getFoodSymbol = (x: number, y: number) => {
  const comida = comidas.value.find((c) => c.position.x === x && c.position.y === y)
  return comida?.simbolo ?? ''
}

const getFoodColor = (x: number, y: number) => {
  const colors: Record<string, string> = {
    H: '#60a5fa', // Azul para Hidrógeno
    O: '#f87171', // Rojo para Oxígeno
    C: '#a3a3a3', // Gris para Carbono
    N: '#34d399', // Verde para Nitrógeno
    Cl: '#a3e635', // Verde lima para Cloro
    Na: '#fbbf24', // Amarillo para Sodio
  }

  const symbol = getFoodSymbol(x, y)
  return colors[symbol] || '#f472b6' // Rosa por defecto
}

// Animaciones con GSAP
onMounted(() => {
  // Animación de partículas de fondo
  gsap.to('.particle', {
    x: () => gsap.utils.random(0, 500),
    y: () => gsap.utils.random(0, 500),
    duration: gsap.utils.random(10, 20),
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })

  // Animación de borde del tablero
  gsap.to('.animate-border', {
    borderColor: gsap.utils.random(['#10b981', '#3b82f6', '#10b981']),
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })

  // Animación para los elementos recolectados
  elementosRecolectados.value.forEach((_, index) => {
    gsap.from(
      `.bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-md:nth-child(${index + 1})`,
      {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        delay: index * 0.1,
        ease: 'back.out',
      },
    )
  })
})
</script>

<style scoped>
/* Animaciones personalizadas */
@keyframes float {
  0%,
  100% {
    transform: translateY(0) translateX(-50%);
  }
  50% {
    transform: translateY(-10px) translateX(-50%);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Estilos para las partículas */
.particle {
  position: absolute;
  width: 30px;
  height: 30px;
}

.particle:nth-child(odd) {
  width: 15px;
  height: 15px;
  background-color: rgba(16, 185, 129, 0.2);
}

/* Efecto para las celdas de comida */
.food-icon {
  filter: drop-shadow(0 0 4px currentColor);
}

/* Efecto para la serpiente */
.snake {
  box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.3);
}
</style>
