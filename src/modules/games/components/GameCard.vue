<template>
  <motion.div
    :initial="{
      opacity: 0,
      y: 20,
      scale: 0.95,
    }"
    :whileInView="{
      opacity: 1,
      y: 0,
      scale: 1,
    }"
    :inViewOptions="{ once: true }"
    @click="$emit('click')"
    class="cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
  >
    <div class="relative h-48 overflow-hidden">
      <div class="absolute inset-0" :class="`bg-gradient-to-r ${color}`"></div>
      <div class="absolute inset-0 flex items-center justify-center text-6xl">
        {{ icon }}
      </div>
    </div>
    <div class="p-6">
      <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">{{ title }}</h3>
      <p class="mb-4 text-gray-600 dark:text-gray-300">{{ description }}</p>
      <div class="flex items-center justify-between">
        <span class="text-xs text-gray-500 dark:text-gray-400">Haz clic para jugar</span>
        <span class="text-blue-500 dark:text-blue-400"><ArrowRight /> </span>
      </div>
    </div>
  </motion.div>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { motion } from 'motion-v'

defineProps({
  title: String,
  description: String,
  icon: String,
  color: String,
  delay: Number,
})

defineEmits(['click'])
</script>
