<script setup lang="ts">
import MoleculeContainer from './MoleculeContainer.vue'
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText)

const estudiantesCount = ref(0) // Simulación de un contador de estudiantes
const heroTitle = ref<HTMLDivElement | null>(null)
const heroSubtitle = ref<HTMLDivElement | null>(null)
const moleculeContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!heroTitle.value || !heroSubtitle.value || !moleculeContainer.value) return

  // Animación de entrada
  gsap.from([heroTitle.value, heroSubtitle.value], {
    duration: 1.2,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'back.out(1.7)',
  })

  // Animación del contenedor de moléculas
  gsap.from(moleculeContainer.value, {
    duration: 1.5,
    scale: 0.8,
    opacity: 0,
    delay: 0.5,
    ease: 'elastic.out(1, 0.5)',
  })

  // Animación de las burbujas de fondo
  const bubbles = gsap.utils.toArray('.chemistry-bubble')
  bubbles.forEach((bubble: any) => {
    gsap.to(bubble, {
      y: () => Math.random() * 100 - 50,
      x: () => Math.random() * 100 - 50,
      duration: () => Math.random() * 10 + 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  })

  // Efecto de rotación para el título "Jugando"
  gsap.to('.chemistry-rotate', {
    rotation: 5,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })

  const split = SplitText.create('#hero-title', { type: 'chars' })

  gsap.from(split.chars, {
    y: 10,
    duration: 2,
    stagger: 0.2,
    repeat: -1,
    yoyo: true,
    ease: 'back.inOut',
    textShadow: '0px 0px 10px rgba(0, 0, 100, 0.5)',
    color: '#ff5722',
    scale: 1.2,
    onComplete: () => {
      split.revert()
    },
  })
})
</script>

<template>
  <section
    class="relative grid min-h-dvh place-content-center overflow-hidden py-12 pt-20 sm:pt-0 md:py-20"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <div ref="heroTitle">
          <h1
            class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100"
          >
            <span class="text-shadow-xs block">Aprende Química</span>
            <span id="hero-title" class="chemistry-rotate mx-auto mt-2 inline-block">
              Jugando
            </span>
          </h1>
        </div>

        <div ref="heroSubtitle">
          <p
            class="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl dark:text-gray-300"
          >
            Descubre la química a través de desafíos interactivos, recompensas y aventuras
            moleculares
          </p>
        </div>
      </div>

      <div ref="moleculeContainer" class="mt-8 md:mt-12">
        <MoleculeContainer />
      </div>

      <!-- Contenedor de botones con ref correcto -->
      <div class="mt-8 flex flex-col justify-center gap-4 px-4 sm:flex-row md:mt-12">
        <button
          @click="$router.push({ name: 'auth.register' })"
          class="animate-delay-200 animate-slide-up-fade flex transform items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-green-500 px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
          Comenzar Aventura
        </button>
        <!-- <button
          @click="$router.push({ name: 'how-it-works' })"
          class="animate-slide-up-fade px-8 py-4 rounded-full border-2 border-indigo-600 dark:border-indigo-300 text-indigo-600 dark:text-indigo-300 font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          Cómo Funciona
        </button> -->
      </div>

      <div class="mt-8 text-center">
        <div
          class="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 dark:bg-indigo-900/30"
        >
          <span class="relative flex h-3 w-3">
            <span
              class="animate-pulsing animate-iteration-count-infinite absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
            ></span>
            <span class="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </span>
          <span class="text-sm text-indigo-600 dark:text-indigo-300"
            >+{{ estudiantesCount }} estudiantes gamificando</span
          >
        </div>
      </div>
    </div>

    <!-- Elementos decorativos gamificados -->
    <div class="absolute inset-0 -z-10 w-full overflow-hidden bg-white dark:bg-black">
      <!-- Burbujas químicas animadas -->
      <span
        v-for="key in 15"
        :key="key"
        class="chemistry-bubble absolute aspect-square blur-xl"
        :style="{
          height: `${Math.random() * 200 + 50}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          borderRadius: `${Math.random() * 100}%`,
          background: `radial-gradient(circle, 
            rgba(${Math.floor(Math.random() * 100 + 155)},${Math.floor(Math.random() * 100 + 155)},${Math.floor(Math.random() * 255)}, 0.350) 0%, 
            rgba(${Math.floor(Math.random() * 100)},${Math.floor(Math.random() * 100 + 155)},${Math.floor(Math.random() * 100 + 155)}, 0.05) 100%)`,
          filter: `blur(${Math.random() * 20 + 10}px)`,
        }"
      ></span>

      <!-- Elementos de gamificación flotantes -->
      <template v-for="key in 10" :key="key">
        <div
          class="absolute flex h-12 w-12 items-center justify-center text-xl"
          :style="{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite both`,
          }"
        >
          <span class="emoji-bounce opacity-50" :style="{ fontSize: `${Math.random() * 50}px` }">
            {{ key % 2 == 0 ? '🧪' : '🔬' }}
          </span>
        </div>
      </template>
    </div>

    <!-- Scroll indicator -->
    <div
      class="animate-vertical-bounce animate-iteration-count-infinite animate-duration-[2s] absolute bottom-0 left-1/2 -translate-x-1/2 transform sm:bottom-8"
    >
      <svg
        class="h-8 w-8 text-indigo-600 dark:text-indigo-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        ></path>
      </svg>
    </div>
  </section>
</template>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes emoji-pulse {
  0%,
  100% {
    transform: scale(1);
    transform: rotate(0deg);
    transform: translate(0, 0);
  }
  50% {
    transform: scale(1.2);
    transform: translate(-10px, -10px);
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
}

.emoji-bounce {
  animation: emoji-pulse 5s ease-in-out infinite alternate-reverse;
  display: inline-block;
}

.text-shadow-xs {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.gradient-text {
  background-size: 200% auto;
  animation: gradient-shift 5s ease infinite;
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Estilos adicionales para asegurar visibilidad de botones */
button {
  min-width: 220px;
}

@media (max-width: 640px) {
  button {
    min-width: 100%;
    width: 100%;
  }
}
</style>
