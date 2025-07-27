<!-- src/views/GameView.vue -->
<template>
  <div class="min-h-screen p-6">
    <div class="mx-auto max-w-2xl">
      <div class="mb-6 flex justify-between">
        <LevelIndicator />
        <CoinDisplay />
      </div>

      <QuestionCard v-if="currentQuestion" />
      <div v-else class="py-10 text-center dark:text-gray-300">
        <p class="text-lg">Cargando pregunta...</p>
      </div>

      <StreakDisplay />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useQuizStore } from '../stores/quiz-store'
import LevelIndicator from '../components/LevelIndicator.vue'
import CoinDisplay from '../components/CoinDisplay.vue'
import QuestionCard from '../components/QuestionCard.vue'
import StreakDisplay from '../components/StreakDisplay.vue'

const quizStore = useQuizStore()
const { currentQuestion } = storeToRefs(quizStore)

quizStore.loadQuestion()
</script>
