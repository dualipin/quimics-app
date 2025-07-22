<template>
  <div class="min-h-screen pt-5">
    <!-- Encabezado -->
    <header class="mx-auto mb-8 max-w-4xl text-center">
      <h1 class="mb-2 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
        <span class="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
          >Memorama Químico</span
        >
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Encuentra las parejas de elementos y compuestos para ganar
      </p>
    </header>

    <!-- Panel de juego -->
    <div class="mx-auto max-w-4xl">
      <!-- Contadores -->
      <div class="mb-6 flex items-center justify-between">
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
        <button
          @click="resetGame"
          class="rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 px-4 py-2 text-white transition hover:from-blue-600 hover:to-teal-600"
        >
          Reiniciar
        </button>
      </div>

      <!-- Tablero de juego -->
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
        <div
          v-for="(card, index) in cards"
          :key="index"
          @click="flipCard(index)"
          class="aspect-square transform cursor-pointer rounded-xl transition-transform duration-300 hover:scale-105"
          :class="{
            'bg-white shadow-lg': !card.isFlipped && !card.isMatched,
            'bg-blue-100 dark:bg-blue-900/30': card.isFlipped || card.isMatched,
            'ring-2 ring-blue-500': card.isFlipped,
            'ring-2 ring-green-500': card.isMatched,
            'pointer-events-none': card.isMatched || (flippedCards.length === 2 && !card.isFlipped),
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
            <div v-if="card.isFlipped || card.isMatched" class="p-2 text-center">
              <div class="mb-2 text-3xl">{{ card.icon }}</div>
              <div class="font-bold text-gray-900 dark:text-white">{{ card.name }}</div>
              <div v-if="card.type === 'element'" class="text-sm text-blue-600 dark:text-blue-300">
                {{ card.symbol }} - {{ card.atomicNumber }}
              </div>
              <div v-if="card.type === 'compound'" class="text-sm text-teal-600 dark:text-teal-300">
                {{ card.formula }}
              </div>
            </div>
          </div>
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
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Has completado el memorama en {{ attempts }} intentos
          </p>
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
import { onMounted, watch } from 'vue'
import JSConfetti from 'js-confetti'
import { useMemoryGame } from '../composables/useMemoryGame'

const {
  initializeGame,
  cards,
  resetGame,
  gameWon,
  attempts,
  flipCard,
  flippedCards,
  matchedPairs,
  totalPairs,
} = useMemoryGame()

watch(gameWon, (won) => {
  if (won) {
    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti({
      emojis: ['🎉', '🥳', '🎊'],
      confettiNumber: 100,
      emojiSize: 50,
    })
  }
})

// Inicializar al montar el componente
onMounted(() => {
  initializeGame()
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
