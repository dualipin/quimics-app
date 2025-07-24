<script setup lang="ts">
import SimpleNav from '@/components/ui/SimpleNav.vue'
import { useQuizStore } from '../stores/quiz-store'
import { computed } from 'vue'

const quizStore = useQuizStore()

const buttonClasses = {
  base: 'rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50',
  inactive:
    'bg-gray-100 text-gray-700 hover:bg-gray-200/80 dark:bg-gray-800/60 dark:text-gray-300 dark:hover:bg-gray-700/80',
  active:
    'bg-blue-500 text-white shadow-md hover:bg-blue-600 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
}

const createdBy = computed(() => quizStore.createdBy)

function selectCreator(creator: 'system' | 'IA') {
  quizStore.createdBy = creator
  quizStore.loadQuestion() // Reload questions based on the selected creator
}
</script>

<template>
  <SimpleNav class="animate-fade-in-down">
    <div
      class="animate-fade-in flex flex-1 flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"
    >
      <h2 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
        Desafío de Preguntas
      </h2>

      <nav aria-label="Quiz creation options">
        <ul class="inline-flex space-x-2 rounded-xl bg-gray-100/60 p-1.5 dark:bg-gray-800/60">
          <li>
            <button
              @click="selectCreator('system')"
              :class="[
                buttonClasses.base,
                createdBy === 'system' ? buttonClasses.active : buttonClasses.inactive,
              ]"
              aria-current="page"
            >
              <span class="flex items-center space-x-1.5">
                <svg
                  v-if="createdBy === 'system'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                Del sistema
              </span>
            </button>
          </li>
          <li>
            <button
              @click="selectCreator('IA')"
              :class="[
                buttonClasses.base,
                createdBy === 'IA' ? buttonClasses.active : buttonClasses.inactive,
              ]"
            >
              <span class="flex items-center space-x-1.5">
                <svg
                  v-if="createdBy === 'IA'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                Con IA
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </SimpleNav>
</template>
