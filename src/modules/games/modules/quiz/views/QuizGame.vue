<template>
  <div class="container mx-auto max-w-4xl px-4 py-8">
    <QuizProgress
      class="mb-8"
      :current-question="currentQuestionIndex"
      :total-questions="questions.length"
      :current-level="currentLevel"
      :correct-answers="correctAnswersCount"
    />

    <Transition name="fade" mode="out-in">
      <div v-if="currentQuestion" class="space-y-8">
        <QuizCard :question="currentQuestion" @answer-selected="handleAnswer" />

        <QuizStats class="mt-8" />
      </div>

      <div v-else-if="levelCompleted" class="py-12 text-center">
        <h2 class="mb-6 text-3xl font-bold dark:text-white">¡Nivel Completado!</h2>
        <p class="mb-8 text-xl dark:text-gray-300">
          Has ganado <span class="font-bold text-yellow-500">{{ levelReward }}</span> monedas
        </p>
        <button
          @click="nextLevel"
          class="rounded-full bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Siguiente Nivel
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useQuiz } from '../composables/useQuizGame'
import QuizCard from '../components/QuizCard.vue'
import QuizProgress from '../components/QuizProgress.vue'
import QuizStats from '../components/QuizStats.vue'
import { onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'

const {
  currentQuestion,
  levelCompleted,
  levelReward,
  handleAnswer,
  currentLevel,
  nextLevel,
  questions,
  currentQuestionIndex,
  correctAnswersCount,
  initializeQuiz,
} = useQuiz()

onMounted(async () => {
  await initializeQuiz()
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
