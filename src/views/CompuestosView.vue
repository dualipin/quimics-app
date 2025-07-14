<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import compuestoimg from '@/assets/compuesto.webp'
import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()
const confettiOptions = {
  emojis: ['🎉', '✨', '💫', '🌟', '🌈'],
  emojiSize: 50,
  confettiNumber: 100,
}
const compuesto = ref({
  nombre: '',
  formula: '',
  estructura: '',
})

const userInput = ref('')
const message = ref('')
const isCorrect = ref(false)
const attempts = ref(0)
const loading = ref(false)
const timeLeft = ref(30)
const timerId = ref<number | null>(null)

const timeLeftFormatted = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

function startTimer() {
  clearInterval(timerId.value || undefined)
  timeLeft.value = 30

  timerId.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timerId.value || undefined)
      if (!isCorrect.value) {
        message.value = 'Se acabó el tiempo. La respuesta correcta era: ' + compuesto.value.formula
      }
    }
  }, 1000) as unknown as number
}

async function fetchCompuesto() {
  loading.value = true
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + '/api/compuesto')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    compuesto.value = data.compuesto
    startTimer()
  } catch (error) {
    console.error('Error fetching compuesto:', error)
  } finally {
    loading.value = false
  }
}

function checkAnswer() {
  attempts.value++

  if (userInput.value.trim().toLowerCase() === compuesto.value.formula.toLowerCase()) {
    message.value = '¡Correcto! Has adivinado la fórmula.'
    isCorrect.value = true
    jsConfetti.addConfetti(confettiOptions)
    clearInterval(timerId.value || undefined)
  } else {
    message.value = 'Incorrecto. Intenta de nuevo.'
  }
}

function getNewCompuesto() {
  userInput.value = ''
  message.value = ''
  isCorrect.value = false
  attempts.value = 0
  clearInterval(timerId.value || undefined)
  fetchCompuesto()
}

onMounted(async () => {
  await fetchCompuesto()
})
</script>

<template>
  <div
    class="min-h-dvh overflow-hidden bg-gradient-to-b from-blue-50 to-purple-100 dark:from-gray-800 dark:to-gray-900"
  >
    <!-- Animated background particles -->
    <div class="fondo-compuesto">
      <img v-for="i in 12" :key="i" :src="compuestoimg" alt="compuesto" :class="`compuesto${i}`" />
    </div>

    <div class="max-w-4xl mx-auto p-8 text-center flex-grow relative mt-24 z-10">
      <h1
        class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-400 dark:to-purple-500 mb-8 animate-title"
      >
        Adivina la fórmula del compuesto
      </h1>

      <div class="mb-8 transition-transform duration-300 transform hover:scale-102">
        <button
          @click="getNewCompuesto"
          class="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center mx-auto justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Cambiar compuesto</span>
        </button>
      </div>
      <div v-if="loading" class="flex justify-center items-center mb-8 animate-pulse">
        <svg
          class="animate-spin h-8 w-8 text-blue-500 dark:text-blue-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 17.93A8.001 8.001 0 014.07 13H6a1 1 0 110-2H4.07A8.001 8.001 0 0113 4.07V6a1 1 0 102 0V4.07A8.001 8.001 0 0113 19.93z"
          />
        </svg>
        <p class="text-gray-700 dark:text-gray-300 ml-4">Cargando compuesto...</p>
      </div>

      <!-- Timer display -->
      <div class="mb-4 flex justify-center">
        <div
          class="text-xl font-mono bg-white/80 dark:bg-gray-700/80 px-4 py-2 rounded-lg shadow-md inline-flex items-center gap-2"
          :class="{ 'text-red-600 dark:text-red-400 animate-pulse': timeLeft < 10 }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{{ timeLeftFormatted }}</span>
        </div>
      </div>

      <div
        class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 transform transition-all duration-500 hover:shadow-[0_20px_50px_rgba(8,112,184,0.2)] border border-blue-100 dark:border-gray-600 animate-card"
      >
        <div class="absolute -right-2 -top-2">
          <div class="bg-blue-500 dark:bg-blue-400 text-white text-xs px-2 py-1 rounded-full">
            Compuesto actual
          </div>
        </div>
        <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          {{ compuesto.nombre }}
        </h2>
        <div
          v-if="compuesto.estructura"
          class="text-gray-700 dark:text-gray-300 italic bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 p-4 rounded-xl border border-blue-100 dark:border-gray-600"
        >
          {{ compuesto.estructura }}
        </div>
      </div>

      <div v-if="!isCorrect && timeLeft > 0" class="mb-8 animate-fade-in">
        <p class="text-gray-700 dark:text-gray-300 mb-5 text-xl">
          ¿Cuál es la fórmula química de este compuesto?
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input
            type="text"
            v-model="userInput"
            placeholder="Fórmula química (ej: H2O)"
            @keyup.enter="checkAnswer"
            class="border-2 backdrop-blur-2xl bg-white/10 dark:bg-gray-800/10 border-blue-200 dark:border-gray-600 rounded-lg py-3 px-5 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-gray-600 focus:border-blue-500 dark:focus:border-gray-400 shadow-sm w-full sm:w-auto text-lg transition-all duration-300"
          />
          <button
            @click="checkAnswer"
            class="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            Comprobar
          </button>
        </div>
        <div class="mt-6 flex justify-center items-center gap-2">
          <p
            v-if="attempts > 0"
            class="text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-1"
          >
            Intentos: <span class="font-bold text-blue-600 dark:text-blue-400">{{ attempts }}</span>
          </p>
          <p
            v-if="message"
            class="font-bold text-lg px-4 py-1 rounded-full animate-bounce"
            :class="
              isCorrect
                ? 'bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-400'
                : 'bg-red-100 dark:bg-red-800 text-red-500 dark:text-red-400'
            "
          >
            {{ message }}
          </p>
        </div>
      </div>

      <div
        v-else-if="timeLeft <= 0 && !isCorrect"
        class="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-800 border-2 border-amber-300 dark:border-gray-600 rounded-2xl p-8 shadow-2xl animate-success"
      >
        <div class="flex justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-amber-500 dark:text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p class="text-amber-700 dark:text-amber-400 font-bold mb-4 text-2xl">
          ¡Se acabó el tiempo!
        </p>
        <div
          class="p-4 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl mb-6 inline-block"
        >
          <p class="mb-2 text-gray-700 dark:text-gray-300">La fórmula correcta era:</p>
          <strong class="text-amber-700 dark:text-amber-400 text-3xl font-mono tracking-wide">{{
            compuesto.formula
          }}</strong>
        </div>
        <button
          @click="getNewCompuesto"
          class="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center mx-auto justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
          Próximo compuesto
        </button>
      </div>

      <div
        v-else
        class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 border-2 border-green-300 dark:border-gray-600 rounded-2xl p-8 shadow-2xl animate-success"
      >
        <div class="flex justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-green-500 dark:text-green-400 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p class="text-green-700 dark:text-green-400 font-bold mb-4 text-2xl">{{ message }}</p>
        <div
          class="p-4 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl mb-6 inline-block"
        >
          <p class="mb-2 text-gray-700 dark:text-gray-300">La fórmula correcta es:</p>
          <strong class="text-emerald-700 dark:text-emerald-400 text-3xl font-mono tracking-wide">{{
            compuesto.formula
          }}</strong>
        </div>
        <button
          @click="getNewCompuesto"
          class="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center mx-auto justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
          Siguiente compuesto
        </button>
      </div>

      <!-- Progress indicator -->
      <div
        class="mt-8 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-4 rounded-xl shadow-md inline-block"
      >
        <p class="text-gray-600 dark:text-gray-400">¡Sigue aprendiendo química!</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:math';

.fondo-compuesto {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.fondo-compuesto img {
  position: absolute;
  opacity: 0.15;
  animation-duration: 25s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  filter: drop-shadow(0 0 5px rgba(79, 70, 229, 0.3));
}

/* Generate positions and animations for all 12 particles */
@for $i from 1 through 12 {
  .compuesto#{$i} {
    top: calc(#{math.random(100)}vh - 50px);
    left: calc(#{math.random(100)}vw - 50px);
    width: calc(40px + #{math.random(60)}px);
    animation-name: float#{$i};
    animation-delay: #{math.random(5)}s;
  }

  @keyframes float#{$i} {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg) scale(1);
    }
    33% {
      transform: translate(#{math.random(150) - 75}px, #{math.random(150) - 75}px)
        rotate(#{math.random(180)}deg) scale(#{0.8 + math.random() * 0.4});
    }
    66% {
      transform: translate(#{math.random(150) - 75}px, #{math.random(150) - 75}px)
        rotate(#{math.random(360)}deg) scale(#{0.8 + math.random() * 0.4});
    }
  }
}

/* Additional animations */
@keyframes pulse-border {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(79, 70, 229, 0);
  }
}

@keyframes title-gradient {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.animate-title {
  background-size: 200% auto;
  animation: title-gradient 3s linear infinite alternate;
}

.animate-card {
  animation: appear 0.6s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

.animate-success {
  animation: success-appear 0.6s ease-out forwards;
}

@keyframes appear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes success-appear {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
