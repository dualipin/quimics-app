<template>
  <div v-if="showStreak" ref="streakContainer" class="mt-4 opacity-0">
    <div class="flex items-center justify-center">
      <div
        ref="streakBadge"
        class="flex items-center rounded-lg border border-blue-200 bg-blue-50 p-3 shadow-sm dark:border-blue-800 dark:bg-blue-900"
      >
        <svg
          ref="streakIcon"
          xmlns="http://www.w3.org/2000/svg"
          class="mr-2 h-5 w-5 text-yellow-500 opacity-0 dark:text-yellow-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
            clip-rule="evenodd"
          />
        </svg>
        <span ref="streakText" class="font-medium text-blue-800 opacity-0 dark:text-blue-200">
          {{ streakMessage }} (Récord: {{ highestStreak }})
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useQuizStore } from '../stores/quiz-store'
import { computed, ref, watch, onMounted } from 'vue'
import { nextTick } from 'vue'
import gsap from 'gsap'

const gameStore = useQuizStore()
const { currentStreak, highestStreak, streakMessage } = storeToRefs(gameStore)

const showStreak = computed(() => currentStreak.value > 0)

// Refs para animaciones
const streakContainer = ref<HTMLElement | null>(null)
const streakBadge = ref<HTMLElement | null>(null)
const streakIcon = ref<HTMLElement | null>(null)
const streakText = ref<HTMLElement | null>(null)

// Animación de entrada
function animateStreakIn() {
  const tl = gsap.timeline()

  tl.to(streakContainer.value, {
    opacity: 1,
    duration: 0.3,
  })

  tl.fromTo(
    streakBadge.value,
    {
      y: 20,
      scale: 0.95,
      opacity: 0,
    },
    {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: 'back.out(1.2)',
    },
    0,
  )

  tl.fromTo(
    streakIcon.value,
    {
      scale: 0,
      opacity: 0,
      rotation: -30,
    },
    {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.4,
      ease: 'elastic.out(1, 0.5)',
    },
    0.2,
  )

  tl.fromTo(
    streakText.value,
    {
      x: 10,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.3,
    },
    0.3,
  )
}

// Animación de salida
function animateStreakOut() {
  const tl = gsap.timeline()

  tl.to([streakBadge.value, streakIcon.value, streakText.value], {
    opacity: 0,
    y: -10,
    duration: 0.3,
    stagger: 0.05,
  })

  tl.to(streakContainer.value, {
    opacity: 0,
    duration: 0.2,
  })
}

// Observar cambios en showStreak
watch(showStreak, (newVal) => {
  if (newVal) {
    nextTick(() => {
      animateStreakIn()
    })
  } else if (streakContainer.value) {
    animateStreakOut()
  }
})

// Inicializar animación al montar si hay racha
onMounted(() => {
  if (showStreak.value) {
    // Establecer estado inicial oculto
    gsap.set(streakContainer.value, { opacity: 0 })
    gsap.set(streakBadge.value, { opacity: 0, y: 20 })
    gsap.set(streakIcon.value, { opacity: 0, scale: 0 })
    gsap.set(streakText.value, { opacity: 0, x: 10 })

    // Animar entrada
    nextTick(() => {
      animateStreakIn()
    })
  }
})
</script>
