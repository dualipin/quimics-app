<script setup lang="ts">
import MoleculeContainer from './MoleculeContainer.vue'
import { motion } from 'motion-v'
</script>

<template>
  <section class="py-20 min-h-dvh relative grid place-content-center">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <motion.h1
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

    <div class="inset-0 absolute w-full overflow-hidden dark:bg-black bg-white -z-10">
      <span
        v-for="key in 20"
        :key="key"
        class="blur-2xl absolute aspect-square"
        :style="{
          height: `${Math.random() * 200}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `pulsing 1s ${Math.random() * 5}s ease-in-out both infinite`,
          borderRadius: `${Math.random() * 100}% ${Math.random() * 100}% ${Math.random() * 100}% ${Math.random() * 100}% / ${Math.random() * 100}% ${Math.random() * 100}% ${Math.random() * 100}% ${Math.random() * 100}%`,
          background: `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)}, 0.8)`,
        }"
      ></span>
    </div>
  </section>
</template>
