<template>
  <div class="stats-grid grid grid-cols-2 gap-4 md:grid-cols-4">
    <div
      class="stat-card rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800/80"
    >
      <div class="mb-1 text-sm text-gray-500 dark:text-gray-400">Nivel Actual</div>
      <div class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{{ currentLevel }}</div>
    </div>

    <div
      class="stat-card rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800/80"
    >
      <!-- <div class="mb-1 text-sm text-gray-500 dark:text-gray-400">Preguntas Acertadas</div>
      <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ correctAnswers }}</div> -->
    </div>

    <div
      class="stat-card rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800/80"
    >
      <div class="mb-1 text-sm text-gray-500 dark:text-gray-400">Recompensas</div>
      <div class="text-2xl font-bold text-yellow-500 dark:text-yellow-400">{{ coins }}</div>
    </div>

    <div
      class="stat-card rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800/80"
    >
      <div class="mb-1 text-sm text-gray-500 dark:text-gray-400">Niveles Desbloqueados</div>
      <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">
        {{ unlockedLevels }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserQuizStore } from '../stores/user-store'
import { computed } from 'vue'

const userStore = useUserQuizStore()

const currentLevel = computed(() => userStore.unlockedLevels)

const coins = computed(() => userStore.coins)
const unlockedLevels = computed(() => userStore.unlockedLevels)
</script>
