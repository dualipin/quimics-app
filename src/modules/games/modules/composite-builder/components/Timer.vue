<template>
  <div
    ref="timerContainer"
    class="flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium"
    :class="{
      'bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200': timeLeft > 10,
      'bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200':
        timeLeft <= 10 && timeLeft > 5,
      'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-200': timeLeft <= 5,
      'pulse-animation': timeLeft <= 10,
    }"
  >
    <span ref="icon" class="text-lg">⏱</span>
    <span class="font-mono tracking-tighter">
      Tiempo restante: <span ref="timeText" class="font-bold">{{ timeLeft }}s</span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps<{ timeLeft: number }>()
const timerContainer = ref<HTMLElement | null>(null)
const icon = ref<HTMLElement | null>(null)
const timeText = ref<HTMLElement | null>(null)

// Animación de entrada
onMounted(() => {
  if (timerContainer.value && icon.value && timeText.value) {
    gsap.from([timerContainer.value, icon.value, timeText.value], {
      duration: 0.6,
      opacity: 0,
      y: 10,
      stagger: 0.1,
      ease: 'back.out(1.2)',
    })
  }
})

// Animación cuando el tiempo cambia
watch(
  () => props.timeLeft,
  (newVal, oldVal) => {
    if (timeText.value) {
      gsap.from(timeText.value, {
        duration: 0.3,
        scale: 1.2,
        y: -5,
        ease: 'power2.out',
        color: newVal < oldVal ? '#ef4444' : '#ffff',
      })
    }

    if (newVal <= 5 && icon.value) {
      gsap.to(icon.value, {
        duration: 0.5,
        rotation: 10,
        yoyo: true,
        repeat: 3,
        ease: 'power1.inOut',
      })
    }
  },
)
</script>
