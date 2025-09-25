<!-- src/components/game/HintButton.vue -->
<template>
  <button
    @click="useHint"
    class="flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 transition hover:bg-purple-200"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="mr-1 h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    Pista ({{ hintCost }})
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQuizStore } from '../stores/quiz-store'

const quizStore = useQuizStore()

const hintCost = computed(() => quizStore.getHintCost())

function useHint() {
  const hint = quizStore.useHint()
  if (hint) {
    emit('hint-used', hint)
  }
}

const emit = defineEmits(['hint-used'])
</script>
