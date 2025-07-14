<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import QuestionCard from '@/components/QuestionCard.vue'
import molecula from '@/assets/molecula.webp'

const value = ref('')
const profesor = ref<null | string>(null)
const loading = ref(false)
const correctas = ref(0)
const preguntas = ref<any[]>([])
// Track answered questions by their ID
const answeredQuestions = ref<Set<string>>(new Set())

const obtenerPreguntasProfesor = async () => {
  try {
    if (!value.value.trim()) {
      alert('Por favor, ingrese el usuario del profesor')
      return
    }

    loading.value = true
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/preguntas/profesor/${value.value.trim()}`,
    )

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    const data = await response.json()
    if (data.length === 0) {
      alert('No hay preguntas para este profesor')
      return
    }

    preguntas.value = data
    profesor.value = value.value
    correctas.value = 0 // Reset counter when loading new questions
    answeredQuestions.value = new Set() // Reset answered questions
  } catch (error) {
    console.error('Error fetching questions:', error)
    alert('Error al cargar las preguntas')
  } finally {
    loading.value = false
  }
}

function onNext(isCorrect: boolean, questionId: string) {
  // Mark the question as answered
  answeredQuestions.value.add(questionId)

  if (isCorrect) {
    correctas.value++

    if (correctas.value === preguntas.value.length) {
      setTimeout(() => {
        alert('¡Felicidades! Has respondido todas las preguntas correctamente.')
      }, 300)
    }
  }
}

// Check if a question has been answered
function isQuestionAnswered(id: string): boolean {
  return answeredQuestions.value.has(id)
}

// Watch for changes to automatically fetch questions when value changes
watch(value, (newValue) => {
  if (newValue && newValue.trim()) {
    profesor.value = null // Reset profesor when input changes
  }
})

onMounted(() => {
  if (value.value && value.value.trim()) {
    obtenerPreguntasProfesor()
  }
})
</script>

<template>
  <!-- Loading overlay with improved animation -->
  <div
    v-if="loading"
    class="fixed inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-50 flex justify-center items-center flex-col gap-4"
  >
    <div
      class="animate-bounce bg-blue-600 dark:bg-blue-400 p-2 w-16 h-16 ring-1 ring-blue-200 dark:ring-blue-500 shadow-lg rounded-full flex items-center justify-center"
    >
      <svg
        class="animate-spin h-8 w-8 text-white dark:text-gray-200"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
    <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">Cargando preguntas...</span>
  </div>
  <div class="relative min-h-dvh overflow-hidden">
    <img :src="molecula" alt="Molecula" class="molecula molecula1" />
    <img :src="molecula" alt="Molecula" class="molecula molecula2" />
    <img :src="molecula" alt="Molecula" class="molecula molecula3" />
    <img :src="molecula" alt="Molecula" class="molecula molecula4" />
    <img :src="molecula" alt="Molecula" class="molecula molecula5" />
    <img :src="molecula" alt="Molecula" class="molecula molecula6" />
    <img :src="molecula" alt="Molecula" class="molecula molecula7" />
    <img :src="molecula" alt="Molecula" class="molecula molecula8" />
    <img :src="molecula" alt="Molecula" class="molecula molecula9" />
    <div class="fondo-animado absolute inset-0 z-0">
      <div class="fondo-animado2 absolute inset-0 z-0"></div>
      <div class="fondo-animado3 absolute inset-0 z-0"></div>

      <div class="fondo-anime absolute inset-0 z-0"></div>
      <div class="fondo-anime2 absolute inset-0 z-0"></div>
      <div class="fondo-anime3 absolute inset-0 z-0"></div>
      <div class="fondo-anime4 absolute inset-0 z-0"></div>
    </div>
    <div class="flex flex-col gap-6 w-full max-w-6xl px-4 mx-auto py-8 z-30 min-h-dvh relative">
      <!-- Header section with gradient text -->
      <header class="mb-6">
        <h1 class="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span
            class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Juego de preguntas
          </span>
          <span
            v-if="profesor"
            class="text-xl md:text-2xl font-bold sm:ml-2 text-gray-700 dark:text-gray-300"
          >
            - Profesor: {{ profesor }}
          </span>
        </h1>
      </header>

      <!-- Input section with card style -->
      <div
        class="backdrop-blur-xs shadow-lg rounded-xl p-6 border border-gray-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50"
      >
        <div class="flex gap-3 flex-col sm:flex-row">
          <input
            type="text"
            v-model="value"
            placeholder="Ingrese el usuario de su profesor"
            label="Usuario del profesor que les dará las preguntas"
            class="text-black dark:text-white flex-grow border bg-white/80 dark:bg-black/80 border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
          />
          <VaButton
            @click="obtenerPreguntasProfesor"
            :loading="loading"
            class="w-full sm:w-auto sm:self-end hover:shadow-md transition-all"
          >
            Cargar preguntas
          </VaButton>
        </div>
      </div>

      <!-- Questions section -->
      <div
        class="backdrop-blur-xs shadow-lg rounded-xl p-6 border border-gray-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50"
      >
        <h2 class="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Preguntas
        </h2>

        <div
          v-if="preguntas.length === 0"
          class="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-inner"
        >
          <span class="text-lg md:text-xl font-medium text-gray-500 dark:text-gray-400">
            No hay preguntas disponibles
          </span>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <QuestionCard
            v-for="(pregunta, index) in preguntas"
            :key="index"
            :question="pregunta"
            :disabled="isQuestionAnswered(pregunta.id || pregunta._id)"
            @next="(isCorrect) => onNext(isCorrect, pregunta.id || pregunta._id)"
            class="transform transition-transform hover:-translate-y-1 hover:shadow-lg"
          />
        </div>

        <!-- Progress section -->
        <div
          v-if="preguntas.length > 0"
          class="mt-8 flex flex-col items-center p-4 rounded-lg shadow-sm"
        >
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
            <div
              class="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
              :style="`width: ${(correctas / preguntas.length) * 100}%`"
            ></div>
          </div>
          <span class="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-300">
            {{ correctas }} / {{ preguntas.length }} correctas
          </span>
          <span
            v-if="correctas === preguntas.length"
            class="text-lg md:text-xl font-bold text-green-600 dark:text-green-400 mt-2"
          >
            🎉 ¡Felicidades, completaste todas las preguntas! 🎉
          </span>
          <span v-else class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mt-2">
            ¡Sigue intentando!
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fondo-animado {
  background: linear-gradient(45deg, #f0c808, #06d6a0, #0091ad, #7209b7);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite alternate;
  /* z-index: -20; */
}

.fondo-animado2 {
  background: linear-gradient(-45deg, #9d4edd, #ff5400, #38b000, #0077b6);
  background-size: 400% 400%;
  animation: gradient 18s ease-in-out infinite alternate-reverse;
  animation-delay: 5s;
  opacity: 0.2;
  z-index: -20;
}

.fondo-animado3 {
  background: linear-gradient(125deg, #00b4d8, #4361ee, #7209b7, #ff9e00);
  background-size: 300% 300%;
  animation: gradient 20s ease infinite;
  animation-delay: 10s;
  opacity: 0.15;
  z-index: -20;
}

.fondo-anime {
  background: radial-gradient(circle, #ffd60a, transparent);
  background-size: 200% 200%;
  animation:
    pulse 8s ease-in-out infinite,
    move 25s linear infinite;
  opacity: 0.2;
  z-index: -20;
}

.fondo-anime2 {
  background: radial-gradient(circle, #d90429, transparent);
  background-size: 150% 150%;
  animation:
    pulse 12s ease infinite,
    move-right 20s linear infinite;
  animation-delay: 5s;
  opacity: 0.15;
  z-index: -20;
}

.fondo-anime3 {
  background: radial-gradient(circle, #00b4d8, transparent);
  background-size: 250% 250%;
  animation:
    pulse 15s ease-in infinite,
    move-diagonal 30s linear infinite;
  animation-delay: 10s;
  opacity: 0.2;
  z-index: -20;
}

.fondo-anime4 {
  background: radial-gradient(circle, #4cc9f0, transparent);
  background-size: 300% 300%;
  animation:
    pulse 10s ease-out infinite,
    move-up 22s linear infinite;
  animation-delay: 3s;
  opacity: 0.15;
  z-index: -20;
}

/* Estilos para las moléculas flotantes */

.molecula:hover {
  animation: float-rotate 20s infinite linear;
  filter: brightness(1.5);
}

.molecula1,
.molecula2,
.molecula3,
.molecula4,
.molecula5,
.molecula6,
.molecula7,
.molecula8,
.molecula9 {
  position: absolute;
  opacity: 0.9;
  filter: brightness(1.2);
  animation: float-rotate 20s infinite linear;
  width: 120px;
  height: 120px;
  z-index: 11;
  pointer-events: none;
}

.molecula1 {
  top: 10%;
  left: 5%;
  animation-duration: 25s;
  animation-delay: -5s;
}

.molecula2 {
  top: 30%;
  right: 8%;
  animation-duration: 22s;
  animation-delay: -2s;
  transform: scale(0.7);
}

.molecula3 {
  bottom: 15%;
  left: 15%;
  animation-duration: 28s;
  animation-delay: -8s;
  transform: scale(0.9);
}

.molecula4 {
  top: 60%;
  right: 15%;
  animation-duration: 20s;
  animation-delay: -12s;
  transform: scale(0.8);
}

.molecula5 {
  bottom: 25%;
  right: 30%;
  animation-duration: 24s;
  animation-delay: -15s;
  transform: scale(0.6);
}
.molecula6 {
  top: 40%;
  left: 20%;
  animation-duration: 26s;
  animation-delay: -10s;
}
.molecula7 {
  bottom: 10%;
  left: 5%;
  animation-duration: 30s;
  animation-delay: -20s;
}
.molecula8 {
  top: 20%;
  right: 10%;
  animation-duration: 18s;
  animation-delay: -5s;
}
.molecula9 {
  bottom: 5%;
  left: 10%;
  animation-duration: 32s;
  animation-delay: -25s;
}

@keyframes float-rotate {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(-15px) translateX(10px) rotate(90deg) scale(1.05);
  }
  50% {
    transform: translateY(0) translateX(20px) rotate(180deg) scale(1);
  }
  75% {
    transform: translateY(15px) translateX(10px) rotate(270deg) scale(0.95);
  }
  100% {
    transform: translateY(0) translateX(0) rotate(360deg) scale(1);
  }
}

@keyframes gradient {
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

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.2;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.3;
  }
}

@keyframes move {
  0% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(5%) translateX(3%);
  }
  50% {
    transform: translateY(0) translateX(5%);
  }
  75% {
    transform: translateY(-5%) translateX(3%);
  }
  100% {
    transform: translateY(0) translateX(0);
  }
}

@keyframes move-right {
  0% {
    transform: translateX(-5%);
  }
  50% {
    transform: translateX(5%);
  }
  100% {
    transform: translateX(-5%);
  }
}

@keyframes move-diagonal {
  0% {
    transform: translate(-3%, -3%);
  }
  50% {
    transform: translate(3%, 3%);
  }
  100% {
    transform: translate(-3%, -3%);
  }
}

@keyframes move-up {
  0% {
    transform: translateY(5%);
  }
  50% {
    transform: translateY(-5%);
  }
  100% {
    transform: translateY(5%);
  }
}
</style>
