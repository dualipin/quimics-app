<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import QuestionCard from '@/components/QuestionCard.vue'
import { useAuthStore } from '@/stores/auth'
import BurbujasMovimiento from '@/components/BurbujasMovimiento.vue'

const authStore = useAuthStore()
const currentQuestionIndex = ref(0)
const score = ref(0)
const showModal = ref(false)
const useIA = ref(false)
const esProfesor = ref(authStore.user?.role === 'profesor')
const juegoTerminado = ref(false)

// Track user answers and results
const answeredQuestions = ref<
  {
    question: string
    userAnswer: string
    correctAnswer: string
    isCorrect: boolean
  }[]
>([])

const tiempoLimite = ref(60) // 60 seconds (1 minute)
const tiempoRestante = ref(tiempoLimite.value)
let timerInterval: ReturnType<typeof setInterval> | null = null

function startTimer() {
  // Clear any existing timer first
  if (timerInterval) clearInterval(timerInterval)

  tiempoRestante.value = tiempoLimite.value
  timerInterval = setInterval(() => {
    if (tiempoRestante.value > 0) {
      tiempoRestante.value--
    } else {
      clearInterval(timerInterval!)
      juegoTerminado.value = true
      showModal.value = true
    }
  }, 1000)
}

function resetTimer() {
  tiempoRestante.value = tiempoLimite.value
}

function stopTimer() {
  if (timerInterval) clearInterval(timerInterval)
}

const loading = ref(false)

const questions = ref([])

watch(useIA, async () => {
  loading.value = true
  await fetchQuestions()
  loading.value = false
})

const fetchQuestions = async () => {
  try {
    loading.value = true
    if (useIA.value) {
      // Fetch questions from the API
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/preguntas/ai/`)
      const data = await response.json()
      questions.value = data as []
      loading.value = false
      return
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/preguntas/aleatorias/`)
    const data = await response.json()
    questions.value = data as []
    loading.value = false
  } catch (error) {
    console.error('Error fetching questions:', error)
    loading.value = false
  } finally {
    loading.value = false
  }
}

const nextQuestion = async (isCorrect: boolean, userAnswer: string) => {
  // Save the answered question details
  answeredQuestions.value.push({
    question: questions.value[currentQuestionIndex.value],
    userAnswer: userAnswer,
    correctAnswer: questions.value[currentQuestionIndex.value],
    isCorrect: isCorrect,
  })

  if (isCorrect) {
    score.value++
  }
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
    resetTimer()
  } else {
    stopTimer()
    showModal.value = true
    juegoTerminado.value = true
  }
}

const resetGame = async () => {
  showModal.value = false
  currentQuestionIndex.value = 0
  score.value = 0
  answeredQuestions.value = []
  juegoTerminado.value = false
  await fetchQuestions()
  startTimer()
}

const pregunta = ref({
  pregunta: '',
  opciones: [],
  respuesta: '',
  creado_por: authStore.user?.username,
})

const opcion = ref('')

async function crearPregunta() {
  try {
    loading.value = true
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/preguntas/crear/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pregunta.value),
    })
    const data = await response.json()
    console.log('Pregunta creada:', data)
  } catch (error) {
    console.error('Error creating question:', error)
  } finally {
    loading.value = false
    pregunta.value = {
      pregunta: '',
      opciones: [],
      respuesta: '',
      creado_por: authStore.user?.username,
    }
    opcion.value = ''
  }
}

onMounted(async () => {
  // Simulate fetching questions from an API
  await fetchQuestions()
  // Start timer when questions are loaded
  if (!esProfesor.value && questions.value.length > 0) {
    startTimer()
  }
})
</script>

<template>
  <template v-if="loading">
    <div
      class="fixed inset-0 flex flex-col gap-10 items-center justify-center bg-white dark:bg-black z-50"
    >
      <span
        class="aspect-square w-16 border-2 border-gray-300 dark:border-gray-700 rounded-full animate-spin border-t-transparent"
      ></span>
      <span class="text-2xl font-bold text-gray-700 dark:text-gray-300">Cargando...</span>
    </div>
  </template>

  <!-- crear preguntas profesor  -->
  <div
    v-if="esProfesor"
    class="w-full h-full mt-32 max-w-5xl mb-8 p-4 md:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mx-auto"
  >
    <h2 class="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
      Crear Nueva Pregunta
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <VaInput
        v-model="pregunta.pregunta"
        placeholder="Ingrese la pregunta"
        label="Pregunta"
        class="mb-2"
      />
      <VaInput
        v-model="pregunta.respuesta"
        placeholder="Ingrese la respuesta correcta"
        label="Respuesta correcta"
        class="mb-2"
      />
    </div>

    <div class="mt-4 border-t border-gray-300 dark:border-gray-600 pt-4">
      <div class="flex flex-wrap justify-between items-center mb-3">
        <label class="font-semibold text-gray-700 dark:text-gray-300">Opciones existentes</label>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {{ pregunta.opciones.length }} opciones
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div v-for="(opcion, index) in pregunta.opciones" :key="index" class="flex items-center">
          <VaInput v-model="pregunta.opciones[index]" placeholder="Opción" class="flex-grow" />
          <VaButton
            @click="() => pregunta.opciones.splice(index, 1)"
            icon="delete"
            preset="danger"
            size="small"
            class="ml-2"
            flat
          />
        </div>
      </div>

      <div class="flex flex-col sm:flex-row mt-3 mb-4">
        <VaInput
          v-model="opcion"
          placeholder="Ingrese una nueva opción"
          class="flex-grow mb-2 sm:mb-0 sm:mr-2"
        />
        <VaButton
          @click="
            () => {
              if (opcion.trim().length > 0) {
                //@ts-ignore
                pregunta.opciones.push(opcion)
                opcion = ''
              }
            }
          "
          class="whitespace-nowrap"
          ><VaIcon icon="plus" class="mr-1" /> Agregar</VaButton
        >
      </div>
    </div>

    <div class="flex justify-center md:justify-end mt-6">
      <VaButton @click="crearPregunta" preset="primary" size="large" :loading="loading">
        <VaIcon icon="save" class="mr-2" /> Guardar Pregunta
      </VaButton>
    </div>
  </div>

  <!-- juego -->
  <div v-if="!esProfesor" class="fondo-movimiento relative min-h-dvh bg-transparent flex flex-col">
    <BurbujasMovimiento color="blanco" />
    <!-- opciones pregunta -->
    <div
      class="z-20 w-full mt-24 items-center justify-center md:justify-end flex-col md:flex-row flex gap-2 md:gap-5 p-2 py-3 md:p-6 bg-white/30 dark:bg-black/30 backdrop-blur-sm shadow-md"
    >
      <button
        @click="useIA = !useIA"
        :class="useIA ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'"
        class="transition-colors duration-300 text-white font-semibold rounded-lg shadow-md px-6 py-3 flex items-center gap-2"
      >
        <VaIcon :name="useIA ? 'check_circle' : 'cancel'" class="text-white" />
        <span>{{ useIA ? 'Preguntas con IA activada' : 'Preguntas con IA desactivada' }}</span>
      </button>

      <RouterLink
        :to="{ name: 'preguntas-profesor' }"
        class="transition-colors duration-300 text-white font-semibold rounded-lg shadow-md px-6 py-3 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600"
      >
        <VaIcon name="school" class="text-white" />
        <span>Contestar preguntas de un profesor</span>
      </RouterLink>

      <!-- Timer display -->
      <div
        class="transition-colors duration-300 text-white font-semibold rounded-lg shadow-md px-6 py-3 flex items-center gap-2 bg-purple-500"
      >
        <VaIcon name="timer" class="text-white" />
        <span>Tiempo: {{ tiempoRestante }}s</span>
      </div>
    </div>

    <!-- juego de preguntas -->
    <div class="flex flex-col items-center justify-center px-4 py-8">
      <div
        v-if="!esProfesor"
        class="w-full max-w-4xl backdrop-blur-sm bg-white/30 dark:bg-black/30 rounded-xl shadow-lg p-6 border border-white/30 dark:border-black/30"
      >
        <div class="w-full z-10">
          <h1 class="text-3xl font-extrabold text-center mb-6 text-white drop-shadow-md">
            <span
              class="bg-gradient-to-r dark:from-purple-300 dark:to-blue-300 from-purple-600 to-blue-500 text-transparent bg-clip-text"
              >🧪 Quiz de Química</span
            >
          </h1>

          <!-- Timer progress bar -->
          <div class="mb-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              class="bg-purple-600 h-2.5 rounded-full transition-all duration-1000"
              :style="{ width: `${(tiempoRestante / tiempoLimite) * 100}%` }"
              :class="{ 'bg-red-600': tiempoRestante <= 10 }"
            ></div>
          </div>

          <template v-if="loading">
            <div class="flex flex-col items-center py-12">
              <span
                class="aspect-square w-12 border-4 border-blue-300 dark:border-blue-700 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-800"
              ></span>
              <p class="text-center text-white mt-4 font-medium">Cargando preguntas...</p>
            </div>
          </template>
          <template v-else-if="questions.length == 0">
            <div class="bg-white/40 dark:bg-black/40 rounded-lg p-8 text-center">
              <VaIcon name="error_outline" size="large" class="mb-3 text-red-500" />
              <p class="text-center text-gray-800 dark:text-gray-300 font-medium">
                No hay preguntas disponibles.
              </p>
            </div>
          </template>
          <template v-else>
            <div class="transform transition-all hover:scale-[1.01] duration-300">
              <QuestionCard :question="questions[currentQuestionIndex]" :onNext="nextQuestion" />
            </div>
          </template>
        </div>

        <div class="mt-6 flex items-center justify-center">
          <div class="bg-white/50 dark:bg-black/50 px-4 py-2 rounded-full shadow-md">
            <span class="font-medium text-gray-800 dark:text-gray-300">
              Pregunta
              <span class="text-blue-700 dark:text-blue-400 font-bold">{{
                currentQuestionIndex + 1
              }}</span>
              de
              <span class="text-blue-700 dark:text-blue-400 font-bold">{{ questions.length }}</span>
            </span>
          </div>
        </div>

        <div class="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            class="bg-blue-600 dark:bg-blue-400 h-2.5 rounded-full"
            :style="{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>

  <VaModal v-model="showModal" hide-default-actions overlay-opacity="0.2" size="large" class="z-50">
    <div class="text-center text-lg font-semibold mb-6 text-gray-800 dark:text-gray-300">
      <p class="mb-2">¡Gracias por jugar!</p>
      <p>
        Puntuación final: <span class="text-green-500">{{ score }}</span> de
        <span class="text-blue-500">{{ questions.length }}</span>
      </p>
    </div>

    <!-- Resultados de las preguntas -->
    <div class="max-h-96 overflow-y-auto p-4">
      <h3 class="text-xl font-semibold mb-4 border-b pb-2 text-gray-800 dark:text-gray-300">
        Resultados
      </h3>

      <!-- Lista de preguntas respondidas -->
      <div
        v-for="(item, index) in answeredQuestions"
        :key="index"
        class="mb-4 p-3 rounded-lg"
        :class="
          item.isCorrect
            ? 'bg-green-50 border border-green-200 dark:bg-green-900 dark:border-green-700'
            : 'bg-red-50 border border-red-200 dark:bg-red-900 dark:border-red-700'
        "
      >
        <div class="flex items-start">
          <div class="mr-3 mt-1">
            <VaIcon
              :name="item.isCorrect ? 'check_circle' : 'cancel'"
              :class="item.isCorrect ? 'text-green-500' : 'text-red-500'"
            />
          </div>
          <div class="flex-grow">
            <p class="font-medium text-gray-800 dark:text-gray-300">
              {{ index + 1 }}. {{ item.question }}
            </p>
            <div class="mt-2 text-sm">
              <p class="flex items-center">
                <span class="font-semibold mr-2 text-gray-800 dark:text-gray-300"
                  >Tu respuesta:</span
                >
                <span :class="item.isCorrect ? 'text-green-600' : 'text-red-600'">
                  {{ item.isCorrect ? 'Es Correcto' : 'Es Incorrecto' }}
                </span>
              </p>
              <p v-if="!item.isCorrect" class="flex items-center mt-1">
                <span class="font-semibold mr-2 text-gray-800 dark:text-gray-300"
                  >Respuesta correcta:</span
                >
                <span class="text-green-600">{{ item.correctAnswer }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <VaButton @click="resetGame" preset="primary">
          <VaIcon name="replay" class="mr-2" /> Jugar de nuevo
        </VaButton>
      </div>
    </template>
  </VaModal>
</template>

<style scoped>
.fondo-movimiento {
  background: linear-gradient(
    -45deg,
    #ee7752,
    #e73c7e,
    #23a6d5,
    #23d5ab,
    #9b59b6,
    #3498db,
    #2ecc71,
    #f1c40f
  );
  background-size: 400% 400%;
  animation: gradient 20s ease infinite;
  position: relative;
  overflow: hidden;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 50% 100%;
  }
  50% {
    background-position: 100% 50%;
  }
  75% {
    background-position: 50% 0%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
