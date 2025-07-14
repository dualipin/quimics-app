<template>
  <div
    v-if="isGameStarted"
    class="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 min-h-screen"
  >
    <h1 class="text-4xl font-bold text-green-800 dark:text-green-400 mb-4">La lotería</h1>
    <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">¡Suerte!</p>
    <VaButton
      class="mb-4"
      color="success"
      @click="
        () => {
          isGameStarted = true
        }
      "
      >Unirse a la partida</VaButton
    >
    <!-- Removed LaloteriaGame component since it doesn't exist -->
  </div>
  <div v-else class="flex flex-col items-center p-6 bg-white dark:bg-gray-800 min-h-dvh pt-20">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-10 mb-14">
      Juego de Lotería
    </h1>
    <LoteriaGame />
  </div>
</template>

<script setup lang="ts">
import LoteriaGame from '@/components/LoteriaGame.vue'
import { ref } from 'vue'

const isGameStarted = ref(false)
</script>
