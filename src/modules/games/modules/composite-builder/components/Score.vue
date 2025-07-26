<template>
  <div
    ref="scoreContainer"
    class="flex items-center gap-3 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-3 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-600 dark:from-gray-800 dark:to-gray-700"
  >
    <span ref="icon" class="text-2xl">🧪</span>
    <div class="flex flex-col">
      <span class="text-xs font-medium tracking-wider text-blue-500 dark:text-blue-400"
        >PUNTUACIÓN</span
      >
      <span ref="scoreText" class="text-2xl font-bold text-gray-800 dark:text-white">
        {{ score }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps<{ score: number }>()
const scoreContainer = ref<HTMLElement | null>(null)
const icon = ref<HTMLElement | null>(null)
const scoreText = ref<HTMLElement | null>(null)

// Animación de entrada
onMounted(() => {
  if (scoreContainer.value && icon.value && scoreText.value) {
    gsap.set([scoreContainer.value, icon.value], { opacity: 0, y: 10 })

    gsap.to(scoreContainer.value, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    })

    gsap.to(icon.value, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      delay: 0.2,
      ease: 'back.out(1.4)',
      rotation: 360,
    })
  }
})

// Animación cuando el puntaje cambia
watch(
  () => props.score,
  (newVal, oldVal) => {
    if (scoreText.value) {
      gsap.from(scoreText.value, {
        duration: 0.5,
        scale: 1.3,
        y: -10,
        ease: 'elastic.out(1, 0.5)',
        color: '#3b82f6',
      })

      if (newVal > oldVal) {
        gsap.to(icon.value, {
          duration: 0.3,
          y: -5,
          scale: 1.2,
          yoyo: true,
          repeat: 1,
          ease: 'power1.inOut',
        })
      }
    }
  },
)
</script>

<style scoped>
/* Efecto de brillo al aumentar puntuación */
.score-increase {
  animation: glow 0.8s ease-out;
}

@keyframes glow {
  0% {
    text-shadow: 0 0 5px rgba(59, 130, 246, 0);
  }
  50% {
    text-shadow: 0 0 10px rgba(59, 130, 246, 0.7);
  }
  100% {
    text-shadow: 0 0 5px rgba(59, 130, 246, 0);
  }
}
</style>
