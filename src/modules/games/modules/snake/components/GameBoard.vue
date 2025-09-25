<template>
  <div class="relative flex flex-col items-center justify-center p-4">
    <!-- Partículas de fondo -->
  <div class="pointer-events-none absolute inset-0">
      <div
    v-for="i in particleCount"
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
              :class="[
                isSnake(x - 1, y - 1) ? snakeCellClass : '',
                { 'scale-110': isFood(x - 1, y - 1) },
              ]"
            >
              <span
                v-if="isFood(x - 1, y - 1)"
                class="food-icon animate-pulse text-lg font-bold"
                :style="{ color: getFoodColor(x - 1, y - 1) }"
              >
                {{ renderFood(x - 1, y - 1) }}
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
          <!-- Skins -->
          <div class="rounded-lg bg-gray-200/70 p-4 dark:bg-gray-700/50">
            <h3 class="mb-2 text-sm font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-300">
              Apariencia
            </h3>
      <div class="flex flex-wrap gap-2">
              <button
                v-for="skin in snakeStore.unlockedSkins"
                :key="skin"
                @click="snakeStore.selectSkin(skin)"
        class="inline-flex items-center gap-2 rounded-md border px-3 py-1 text-sm capitalize transition"
                :class="skinButtonClass(skin)"
              >
        <span class="inline-block h-3 w-3 rounded-sm" :class="skinSwatchClass(skin)"></span>
                {{ skin }}
              </button>
            </div>
          </div>
          <!-- Objetivo del nivel -->
          <div class="rounded-lg bg-gray-200/70 p-4 dark:bg-gray-700/50">
            <div class="mb-2 flex items-center justify-between">
              <h3
                class="text-sm font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-300"
              >
                Nivel {{ nivel + 1 }}
              </h3>
              <span class="text-xs text-gray-600 dark:text-gray-300">Objetivo</span>
            </div>
            <p class="text-lg font-bold text-gray-900 dark:text-white">
              {{ objetivo.nombre }}
              <span class="text-gray-600 dark:text-gray-300">({{ objetivo.formula }})</span>
            </p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="(cnt, simb) in requeridosObjeto"
                :key="simb"
                class="rounded-full bg-white/70 px-2 py-1 text-xs font-semibold shadow-sm dark:bg-gray-900/40 dark:text-gray-200"
              >
                {{ simb }} {{ progresoElemento(simb) }}/{{ cnt }}
              </span>
            </div>
          </div>
          <!-- Cosméticos de comida -->
          <div class="rounded-lg bg-gray-200/70 p-4 dark:bg-gray-700/50">
            <h3 class="mb-2 text-sm font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-300">
              Cosméticos de comida
            </h3>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="c in snakeStore.unlockedFoodCosmetics"
                :key="c"
                @click="snakeStore.selectFoodCosmetic(c)"
                class="inline-flex items-center gap-2 rounded-md border px-3 py-1 text-sm capitalize transition"
                :class="foodButtonClass(c)"
              >
                <span class="text-base">{{ previewFoodIcon(c) }}</span>
                {{ c }}
              </button>
            </div>
          </div>
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
              class="flex transform items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-indigo-500 active:scale-95"
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

          <!-- Recompensas -->
          <div class="rounded-lg bg-gray-200/70 p-4 dark:bg-gray-700/50">
            <h3 class="mb-3 text-sm font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-300">
              Recompensas
            </h3>
            <div class="flex min-h-10 flex-wrap gap-2">
              <span
                v-for="r in snakeStore.rewards"
                :key="r"
                class="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-900/30 dark:text-purple-200"
              >
                🏅 {{ r }}
              </span>
              <span v-if="snakeStore.rewards.length === 0" class="text-sm text-gray-500 dark:text-gray-400">
                Aún no hay recompensas
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

    <!-- Banner de victoria -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="juegoGanado"
        class="fixed inset-x-0 bottom-6 z-50 mx-auto w-[90%] max-w-lg rounded-xl border border-emerald-400/40 bg-emerald-600/90 p-5 text-white shadow-2xl backdrop-blur-sm"
      >
        <div class="flex items-start gap-3">
          <SparklesIcon class="mt-1 h-6 w-6 flex-shrink-0" />
          <div class="flex-1">
            <h4 class="text-lg font-extrabold">¡Has ganado!</h4>
            <p class="text-sm opacity-90">
              Completaste todos los niveles. Presiona Reiniciar para jugar de nuevo.
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { useSnakeGame } from '../composables/useSnakeGame'
import { onMounted, ref, computed } from 'vue'
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
  nivel,
  objetivo,
  requeridos,
  recolectadosPorElemento,
  juegoGanado,
  snakeStore,
} = useSnakeGame()
// Apariencia: clases por skin
const snakeCellClass = computed(() => {
  switch (snakeStore.selectedSkin) {
    case 'quantum':
      return 'rounded-sm bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
    case 'molecular':
      return 'rounded-sm bg-gradient-to-br from-purple-500 to-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.6)]'
    case 'legendary':
      return 'rounded-sm bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]'
    default:
      return 'rounded-sm bg-emerald-500'
  }
})

const skinButtonClass = (skin: string) =>
  [
    snakeStore.selectedSkin === skin
      ? 'border-emerald-500 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'
      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700',
  ]

const particleCount = computed(() => (snakeStore.selectedSkin === 'legendary' ? 80 : 50))

const skinSwatchClass = (skin: string) => {
  switch (skin) {
    case 'quantum':
      return 'bg-gradient-to-br from-emerald-400 to-cyan-500'
    case 'molecular':
      return 'bg-gradient-to-br from-purple-500 to-pink-500'
    case 'legendary':
      return 'bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500'
    default:
      return 'bg-emerald-500'
  }
}

const foodButtonClass = (c: string) =>
  [
    snakeStore.foodCosmetic === c
      ? 'border-blue-500 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700',
  ]

const previewFoodIcon = (c: string) => {
  switch (c) {
    case 'orb':
      return '⬤'
    case 'atom':
      return '⚛️'
    case 'spark':
      return '✦'
    default:
      return '∑' // placeholder; in board we still show element symbol for 'element'
  }
}

const renderFood = (x: number, y: number) => {
  const cosmetic = snakeStore.foodCosmetic
  if (cosmetic === 'element') return getFoodSymbol(x, y)
  if (cosmetic === 'orb') return '⬤'
  if (cosmetic === 'atom') return '⚛️'
  if (cosmetic === 'spark') return '✦'
  return getFoodSymbol(x, y)
}

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
    S: '#f59e0b', // Ámbar para Azufre
    Ca: '#22d3ee', // Cian para Calcio
    Fe: '#ef4444', // Rojo para Hierro
    Al: '#60a5fa', // Azul para Aluminio
    P: '#a78bfa', // Violeta para Fósforo
    K: '#eab308', // Amarillo fuerte para Potasio
    Cu: '#f97316', // Naranja para Cobre
    Ag: '#d1d5db', // Plateado para Plata
    Zn: '#93c5fd', // Azul claro para Zinc
  }

  const symbol = getFoodSymbol(x, y)
  return colors[symbol] || '#f472b6' // Rosa por defecto
}

// Progreso por elemento requerido
const requeridosObjeto = computed<Record<string, number>>(() => {
  const obj: Record<string, number> = {}
  requeridos.value.forEach((v, k) => (obj[k] = v))
  return obj
})

const progresoElemento = (simb: string) => {
  return recolectadosPorElemento.value.get(simb) || 0
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
