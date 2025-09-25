<template>
  <div class="min-h-screen pt-5" :class="`theme-` + theme">
    <!-- Encabezado -->
    <header class="mx-auto mb-8 max-w-4xl text-center">
      <h1 class="mb-2 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
        <span class="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
          >Memorama Químico</span
        >
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Encuentra las parejas de elementos de la tabla periódica para aprender jugando
      </p>
    </header>

    <!-- Panel de juego -->
    <div class="mx-auto">
      <!-- Contadores -->
      <div class="mx-auto mb-6 grid max-w-5xl grid-cols-1 gap-3 p-3 sm:grid-cols-2 md:grid-cols-4">
        <div class="rounded-lg bg-white px-4 py-2 shadow dark:bg-gray-800">
          <span class="font-medium text-gray-700 dark:text-gray-300">Pares: </span>
          <span class="font-bold text-blue-600 dark:text-blue-400"
            >{{ matchedPairs }} / {{ totalPairs }}</span
          >
        </div>
        <div class="rounded-lg bg-white px-4 py-2 shadow dark:bg-gray-800">
          <span class="font-medium text-gray-700 dark:text-gray-300">Intentos: </span>
          <span class="font-bold text-blue-600 dark:text-blue-400">{{ attempts }}</span>
        </div>
        <div class="rounded-lg bg-white px-4 py-2 shadow dark:bg-gray-800">
          <span class="font-medium text-gray-700 dark:text-gray-300">Tiempo: </span>
          <span class="font-bold" :class="timeLeft <= 10 ? 'text-red-600' : 'text-green-600'"
            >{{ timeLeft }}s</span
          >
        </div>
        <div class="rounded-lg bg-white px-4 py-2 shadow dark:bg-gray-800">
          <span class="font-medium text-gray-700 dark:text-gray-300">Puntos: </span>
          <span class="font-bold text-purple-600">{{ score }}</span>
        </div>
      </div>

      <div
        class="mx-auto mb-4 flex max-w-4xl flex-col flex-wrap items-center justify-between gap-3 p-2 md:flex-row"
      >
        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-600 dark:text-gray-300">Tema</label>
          <select
            v-model="themeLocal"
            @change="onChangeTheme"
            class="rounded-md border px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="science">Ciencia</option>
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
            <option value="neon">Neón</option>
          </select>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-600 dark:text-gray-300">Cartas</label>
          <input
            type="number"
            min="6"
            max="30"
            step="2"
            v-model.number="elementsCount"
            class="w-20 rounded-md border px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-200"
          />
        </div>
        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-600 dark:text-gray-300">Duración</label>
          <input
            type="number"
            min="30"
            max="600"
            step="10"
            v-model.number="duration"
            class="w-24 rounded-md border px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-200"
          />
        </div>
        <div class="flex gap-2">
          <button
            @click="restartWithOptions"
            class="rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 px-4 py-2 text-white transition hover:from-blue-600 hover:to-teal-600"
          >
            Aplicar
          </button>
          <button
            @click="resetGame"
            class="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          >
            Reiniciar
          </button>
        </div>
      </div>
      <div class="flex flex-col 2xl:flex-row">
        <!-- Tablero de juego -->
        <div class="grid flex-1 grid-cols-2 gap-4 p-10 sm:grid-cols-4 lg:grid-cols-6">
          <div
            v-for="(card, index) in cards"
            :key="index"
            @click="flipCard(index)"
            class="aspect-[3.5/5] transform cursor-pointer rounded-xl transition-transform duration-300 hover:scale-105"
            :style="(card.isFlipped || card.isMatched) && card.pairColor ? {
              background: card.pairAccent ? `linear-gradient(135deg, ${card.pairColor}, ${card.pairAccent})` : card.pairColor,
              borderColor: card.pairAccent || card.pairColor,
              boxShadow: card.isMatched ? `0 0 12px 2px ${(card.pairAccent || card.pairColor)}55` : `0 4px 8px -2px ${(card.pairAccent || card.pairColor)}55`
            } : {}"
            :class="{
              'bg-white shadow-lg dark:bg-gray-800':
                !card.isFlipped && !card.isMatched && theme === 'light',
              'bg-gray-900 shadow-lg': !card.isFlipped && !card.isMatched && theme === 'dark',
              'bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25':
                !card.isFlipped && !card.isMatched && theme === 'neon',
              'bg-gradient-to-br from-blue-600 to-teal-600 shadow-lg':
                !card.isFlipped && !card.isMatched && theme === 'science',
              'ring-2': card.isFlipped || card.isMatched,
              'pointer-events-none':
                card.isMatched || (flippedCards.length === 2 && !card.isFlipped),
            }"
          >
            <div class="relative flex h-full items-center justify-center">
              <!-- Parte trasera de la carta -->
              <div
                v-if="!card.isFlipped && !card.isMatched"
                class="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-500"
              >
                <span class="text-4xl text-white">?</span>
              </div>

              <!-- Contenido frontal de la carta -->
              <div
                v-if="card.isFlipped || card.isMatched"
                class="p-2 text-center"
                style="color:#000000; text-shadow:none;"
              >
                <div class="mb-2 text-3xl">{{ card.icon }}</div>
                <div class="font-bold">{{ card.name }}</div>
                <div v-if="card.type === 'element'" class="text-xs">
                  {{ card.symbol }} • Z={{ card.atomicNumber }}
                </div>
                <div v-if="card.category" class="text-[11px] opacity-80">
                  {{ card.category }}
                </div>
                <div
                  v-if="card.funFact && (card.isMatched || showFacts)"
                  class="mt-1 text-[11px]"
                  style="opacity:.85;"
                >
                  Dato: {{ card.funFact }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-0 xl:mt-16">
          <RankingGlobal game="memory" ref="rankingRef" />
        </div>
      </div>

      <!-- Modal de victoria -->
      <div
        v-if="gameWon"
        class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
      >
        <div class="mx-4 w-full max-w-md rounded-xl bg-white p-8 text-center dark:bg-gray-800">
          <span class="mb-4 text-6xl">🎉</span>
          <h2 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">¡Felicidades!</h2>
          <p class="mb-1 text-gray-600 dark:text-gray-300">
            Has completado el memorama en {{ attempts }} intentos
          </p>
          <p class="mb-4 text-purple-700 dark:text-purple-300">Puntaje final: {{ score }}</p>
          <div v-if="rewards.length" class="mb-4">
            <p class="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">Recompensas:</p>
            <div class="flex flex-wrap justify-center gap-2">
              <span
                v-for="r in rewards"
                :key="r"
                class="rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-700 dark:bg-purple-900/30 dark:text-purple-200"
                >🏅 {{ r }}</span
              >
            </div>
          </div>
          <button
            @click="resetGame"
            class="rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 px-6 py-2 text-white transition hover:from-blue-600 hover:to-teal-600"
          >
            Jugar de nuevo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import JSConfetti from 'js-confetti'
import { useMemoryGame } from '../composables/useMemoryGame'
import RankingGlobal from '@/modules/games/components/RankingGlobal.vue'

const {
  initializeGame,
  cards,
  resetGame,
  sendRanking,
  gameWon,
  attempts,
  flipCard,
  flippedCards,
  matchedPairs,
  totalPairs,
  score,
  rewards,
  user,
  theme,
  timeLeft,
} = useMemoryGame()

const rankingRef = ref<InstanceType<typeof RankingGlobal>>()

const elementsCount = ref(12)
const duration = ref(120)
const themeLocal = ref(theme.value)
const showFacts = ref(true)

const restartWithOptions = () => {
  initializeGame({
    elementsCount: elementsCount.value,
    duration: duration.value,
    theme: themeLocal.value,
  })
}

const onChangeTheme = () => {
  restartWithOptions()
}

watch(gameWon, async (won) => {
  if (won) {
    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti({
      emojis: ['🎉', '🥳', '🎊'],
      confettiNumber: 100,
      emojiSize: 50,
    })
  }

  try {
    const ranking = {
      name: 'memory',
      user: Number(user.user!.id), // Placeholder for user ID
      score: score.value,
      username: user.user!.full_name, // Placeholder for username
    }
    await sendRanking(ranking)
    console.log('Ranking enviado exitosamente')
  } catch (error) {
    console.error('Error al enviar el ranking:', error)
  }

  if (rankingRef.value) {
    rankingRef.value.loadRanking()
  }
})

// Inicializar al montar el componente
onMounted(() => {
  initializeGame({
    elementsCount: elementsCount.value,
    duration: duration.value,
    theme: themeLocal.value,
  })
})
</script>

<style scoped>
/* Animación para voltear cartas */
.flip-enter-active,
.flip-leave-active {
  transition: all 0.5s ease;
  transform-style: preserve-3d;
}

.flip-enter-from,
.flip-leave-to {
  transform: rotateY(180deg);
  opacity: 0;
}
</style>

<style scoped>
/* Temas básicos */
.theme-science {
  background:
    radial-gradient(1200px 800px at 50% -10%, rgba(56, 189, 248, 0.15), transparent),
    radial-gradient(800px 600px at 100% 0%, rgba(20, 184, 166, 0.12), transparent);
}
.theme-neon :deep(.ring-2) {
  box-shadow:
    0 0 10px rgba(168, 85, 247, 0.6),
    0 0 20px rgba(34, 211, 238, 0.5);
}
.theme-dark {
  background: #0b1220;
}
.theme-light {
  background: #f7fafc;
}
</style>
