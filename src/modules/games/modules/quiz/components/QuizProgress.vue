<template>
  <div
    class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-800/80"
  >
    <div class="mb-2 flex items-center justify-between">
      <h3 class="font-medium text-gray-700 dark:text-gray-300">Progreso del Nivel</h3>
      <span class="text-sm font-medium text-indigo-600 dark:text-indigo-400">
        Pregunta {{ currentQuestion + 1 }} de {{ totalQuestions }}
      </span>
    </div>

    <div class="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        class="h-2.5 rounded-full bg-indigo-600 transition-all duration-500"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>

    <div class="mt-4 flex justify-between">
      <span class="text-sm text-gray-500 dark:text-gray-400">Nivel {{ currentLevel }}</span>
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
        {{ correctAnswers }}/{{ totalQuestions }} correctas
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentQuestion: number
  totalQuestions: number
  currentLevel: number
  correctAnswers: number
}

const props = defineProps<Props>()

const progress = computed(() => {
  return ((props.currentQuestion + 1) / props.totalQuestions) * 100
})
</script>
