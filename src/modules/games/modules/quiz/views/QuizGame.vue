<!-- src/views/GameView.vue -->
<template>
  <div class="min-h-screen p-6">
    <div class="mx-auto max-w-2xl mb-52 lg:mb-auto">
      <div class="mb-6 flex justify-between">
        <LevelIndicator />
        <CoinDisplay />
      </div>

      <QuestionCard v-if="currentQuestion" />
      <div v-else class="py-10 text-center dark:text-gray-300">
        <p class="text-lg">Cargando pregunta...</p>
      </div>

      <StreakDisplay />

      <!-- Solo para profesores -->
      <CreateQuestionForm v-if="user?.role === 'profesor'" />
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
import CreateQuestionForm from '../components/CreateQuestionForm.vue'
import { useAuthStore } from '@/modules/auth/stores/auth-store'

const quizStore = useQuizStore()
const { currentQuestion } = storeToRefs(quizStore)

const authStore = useAuthStore()
const user = authStore.user

quizStore.loadQuestion()
</script>
