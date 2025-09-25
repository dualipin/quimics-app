<template>
  <div class="mt-6 flex justify-center">
    <button
      @click="$emit('draw')"
      class="focus:ring-opacity-50 transform-gpu rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 hover:shadow-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none active:scale-95 dark:from-indigo-600 dark:to-purple-700 dark:hover:from-indigo-700 dark:hover:to-purple-800 dark:focus:ring-indigo-300"
    >
      <span class="flex items-center justify-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <span>Lanzar elemento</span>
      </span>
    </button>
  </div>
</template>

<script lang="ts" setup>
defineEmits(['draw'])
</script>
