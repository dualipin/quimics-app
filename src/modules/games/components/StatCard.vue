<template>
  <motion.div
    :initial="{
      opacity: 0,
      y: -20,
      scale: 0.5,
    }"
    :whileInView="{
      opacity: 1,
      y: 0,
      scale: 1,
    }"
    :transition="{
      duration: 1,
      ease: 'easeInOut',
      delay: 0.2,
    }"
    class="stat-card rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
  >
    <div class="mb-2 text-4xl">{{ value }}</div>
    <div class="text-sm font-medium">{{ label }}</div>
    <div class="mt-3 text-2xl">{{ icon }}</div>
  </motion.div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
defineProps({
  value: String,
  label: String,
  icon: String,
})
</script>

<style scoped>
.stat-card {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.stat-card:nth-child(1) {
  animation-delay: 0.2s;
}
.stat-card:nth-child(2) {
  animation-delay: 0.3s;
}
.stat-card:nth-child(3) {
  animation-delay: 0.4s;
}
.stat-card:nth-child(4) {
  animation-delay: 0.5s;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
