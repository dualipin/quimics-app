<template>
  <div
    class="mx-auto grid max-w-xl grid-cols-4 gap-4 rounded-xl bg-gray-50 p-3 shadow-sm dark:bg-gray-900 dark:shadow-none"
  >
    <div
      v-for="element in elements"
      :key="element"
      :class="[
        'flex aspect-[3/4] items-center justify-center rounded-lg border-2 transition-all duration-300',
        'text-xl font-medium',
        drawn.includes(element)
          ? 'scale-105 transform border-indigo-700 bg-indigo-600 text-white shadow-md dark:border-indigo-800 dark:bg-indigo-700 dark:shadow-indigo-900/50'
          : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-indigo-400 dark:hover:shadow-gray-600/20',
      ]"
    >
      {{ element }}
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  elements: string[]
  drawn: string[]
}>()
</script>
