<template>
  <div
    class="relative overflow-hidden group rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600"
    :style="`transform: translateY(${hover ? '0' : '0'}) scale(${hover ? 1.02 : 1}); transition-delay: ${delay}ms`"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <!-- Efecto de fondo sutil al hover -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-transparent to-primary-50 dark:to-primary-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    ></div>

    <!-- Icono con animación -->
    <div
      class="relative z-10 w-16 h-16 mb-5 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white text-3xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
      :style="`transform: rotate(${hover ? '5deg' : '0'})`"
    >
      {{ icon }}
    </div>

    <!-- Contenido -->
    <div class="relative z-10 space-y-3">
      <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
        {{ title }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
        {{ description }}
      </p>

      <!-- Enlace/acción opcional -->
      <a
        v-if="actionText"
        href="#"
        class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors mt-2"
      >
        {{ actionText }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  icon: string
  title: string
  description: string
  delay?: number
  actionText?: string
}>()

const hover = ref(false)
</script>
