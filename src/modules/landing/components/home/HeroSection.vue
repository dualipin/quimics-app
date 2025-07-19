<script setup lang="ts">
import MoleculeContainer from './MoleculeContainer.vue'
import { motion } from 'motion-v'
</script>

<template>
  <section class="min-h-dvh py-20 dark:bg-black overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <motion.h1
          :initial="{ y: -100 }"
          :animate="{ y: 0 }"
          :transition="{ duration: 1 }"
          class="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl"
        >
          <span class="block">Studying</span>

          <span
            class="gradient-text mx-auto mt-2 bg-gradient-to-bl from-indigo-800 to-green-800 dark:from-indigo-300 dark:to-green-300 bg-clip-text text-transparent"
          >
            Chemistry
          </span>
        </motion.h1>
        <p
          class="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
        >
          Transformando el aprendizaje de la química a través de la innovación educativa
        </p>
      </div>
      <div>
        <MoleculeContainer />
      </div>
    </div>
  </section>
</template>
