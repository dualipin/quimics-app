<template>
  <div
    class="quiz-card rounded-2xl border border-gray-200 bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-neutral-700 dark:bg-neutral-800/90 dark:backdrop-blur-sm"
  >
    <div class="mb-6 flex items-start justify-between">
      <h3 class="text-2xl leading-snug font-semibold text-gray-800 dark:text-gray-100">
        {{ question.text }}
      </h3>
      <span
        class="ml-3 inline-flex h-7 items-center rounded-full bg-indigo-100 px-3 text-sm font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200"
      >
        Nivel {{ question.level }}
      </span>
    </div>

    <ul class="space-y-3">
      <li
        v-for="(option, index) in question.options"
        :key="index"
        @click="() => emit('answer-selected', index)"
        class="cursor-pointer rounded-xl border border-gray-200 p-4 transition-all duration-200 hover:scale-[1.01] hover:border-indigo-300 hover:bg-gray-50 dark:border-neutral-700 dark:hover:bg-neutral-700/50"
        :class="{
          'border-green-300 bg-green-100 dark:border-green-700 dark:bg-green-900/30':
            selectedAnswer === index && isCorrect,
          'border-red-300 bg-red-100 dark:border-red-700 dark:bg-red-900/30':
            selectedAnswer === index && selectedAnswer !== correctAnswer,
          'border-indigo-300 bg-indigo-100 dark:border-indigo-700 dark:bg-indigo-900/30':
            selectedAnswer === null,
        }"
      >
        <div class="flex items-center">
          <span
            class="mr-3 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
          >
            {{ String.fromCharCode(65 + index) }}
          </span>
          <span class="text-gray-700 dark:text-gray-300">{{ option }}</span>

          <span
            v-if="selectedAnswer !== null && index === correctAnswer"
            class="ml-auto text-green-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </div>
      </li>
    </ul>

    <div
      v-if="selectedAnswer !== null"
      class="mt-6 border-t border-gray-200 pt-4 dark:border-neutral-700"
    >
      <p class="text-gray-600 dark:text-gray-400">
        <span v-if="isCorrect" class="font-medium text-green-600 dark:text-green-400"
          >¡Correcto!</span
        >
        <span v-else class="font-medium text-red-600 dark:text-red-400">Incorrecto</span>
        {{ question.explanation }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Question } from '../types/Quiz'

interface Props {
  question: Question
}

interface Emits {
  (e: 'answer-selected', answerIndex: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selectedAnswer = ref<number | null>(null)
const correctAnswer = computed(() => props.question.correctAnswer)

const isCorrect = computed(() => {
  return selectedAnswer.value === correctAnswer.value
})

const handleAnswer = (index: number) => {
  if (selectedAnswer.value === null) {
    selectedAnswer.value = index
    emit('answer-selected', index)
  }
}
</script>
