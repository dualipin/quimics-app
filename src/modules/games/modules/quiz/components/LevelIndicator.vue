<template>
  <div class="flex items-center">
    <span class="mr-2 text-gray-700 dark:text-gray-300">Nivel:</span>
    <span
      class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    >
      {{ currentLevel }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useQuizStore } from '../stores/quiz-store'

const quizStore = useQuizStore()
const { currentLevel } = storeToRefs(quizStore)
</script>
