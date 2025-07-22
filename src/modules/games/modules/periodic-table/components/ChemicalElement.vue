<script setup lang="ts">
import { motion } from 'motion-v'
import clsx from 'clsx'
import type { TChemicalElement } from '../types/ChemicalElement'
import { ref } from 'vue'

const isHovered = ref(false)

const props = defineProps<{ element: TChemicalElement }>()

const backgroundColor = clsx({
  'bg-red-700 dark:bg-red-800': props.element.category === 'alcalinotérreos',
  'bg-orange-700 dark:bg-orange-800': props.element.category === 'metales alcalinos',
  'bg-lime-500 dark:bg-lime-600': props.element.category === 'otros metales',
  'bg-amber-300 dark:bg-amber-400': props.element.category === 'metales de transición',
  'bg-yellow-600 dark:bg-yellow-700': props.element.category === 'lantánidos',
  'bg-yellow-500 dark:bg-yellow-600': props.element.category === 'actínidos',
  'bg-green-600 dark:bg-green-700': props.element.category === 'metaloides',
  'bg-indigo-300 dark:bg-indigo-400': props.element.category === 'no metales',
  'bg-indigo-200 dark:bg-indigo-300': props.element.category === 'halógenos',
  'bg-slate-300 dark:bg-slate-400': props.element.category === 'gases nobles',
  'bg-gray-400': !props.element.category || props.element.category === 'desconocido',
})
</script>

<template>
  <motion.div
    :class="backgroundColor"
    class="animate-zoom-in relative flex aspect-[3/4] cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200/50 shadow-md transition-all duration-300 hover:scale-105 hover:rotate-3 hover:shadow-xl dark:border-gray-700/50"
    @click="$emit('element-clicked', props)"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    :whileHover="{ zIndex: 10 }"
  >
    <!-- Contenido principal -->
    <div class="flex h-full w-full flex-col items-center justify-center p-1">
      <span class="text-xs font-medium text-gray-800/90 dark:text-white/80">
        {{ props.element.atomicNumber }}
      </span>

      <motion.span
        class="text-3xl font-bold text-gray-900/90 dark:text-white"
        :animate="{ scale: isHovered ? 1.1 : 1 }"
        :transition="{ type: 'spring', stiffness: 300 }"
      >
        {{ props.element.symbol }}
      </motion.span>

      <span class="text-[0.65rem] font-medium text-gray-800/80 dark:text-white/70">
        {{ props.element.atomicWeight }}
      </span>

      <span class="mt-1 text-xs font-medium text-gray-900/90 dark:text-white/80">
        {{ props.element.name }}
      </span>
    </div>

    <!-- Tooltip flotante moderno -->
    <motion.div
      v-if="isHovered"
      class="absolute bottom-0 left-1/2 z-20 w-48 -translate-x-1/2 transform rounded-xl bg-white p-3 text-center text-xs text-gray-800 shadow-2xl ring-1 ring-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700"
      :style="{ y: 'calc(100% + 0.5rem)' }"
      :initial="{ opacity: 0, y: 'calc(100%/2)' }"
      :animate="{ opacity: 1, y: 'calc(100% + 0.5rem)', rotate: -3 }"
      :exit="{ opacity: 0, y: 0 }"
      :transition="{ type: 'spring', damping: 20, stiffness: 300 }"
    >
      <div
        class="mb-2 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600"
      ></div>

      <p class="text-sm leading-tight">{{ props.element.funFact }}</p>

      <img
        v-if="props.element.image"
        :src="props.element.image"
        alt="Element Image"
        class="mx-auto mt-2 h-16 w-16 rounded-lg object-cover shadow-sm"
      />

      <div
        class="pointer-events-none absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 transform bg-white dark:bg-gray-800"
      ></div>
    </motion.div>
  </motion.div>
</template>
