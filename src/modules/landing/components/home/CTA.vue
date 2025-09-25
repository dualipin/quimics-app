<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <!-- CTA -->
  <div class="py-20 text-center bg-white dark:bg-gray-950">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
      ¿Listo para transformar tu experiencia de aprendizaje?
    </h3>
    <div class="flex flex-col sm:flex-row justify-center gap-4">
      <button
        @click="$router.push({ name: 'auth.register' })"
        class="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02]"
      >
        Comenzar prueba gratuita
        <span class="ml-2">
          <ArrowRight class="inline-block size-5" />
        </span>
      </button>
      <!-- <button
        class="px-8 py-3.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        Ver demostración
      </button> -->
    </div>
  </div>
</template>
