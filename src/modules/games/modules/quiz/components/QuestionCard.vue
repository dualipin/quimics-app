<template>
  <div
    class="animate-sink animate-iteration-count-infinite animate-duration-[2s] relative overflow-hidden rounded-xl bg-white p-8 shadow-xl dark:bg-gray-800"
  >
    <!-- Elementos decorativos (ya ocultos inicialmente) -->
    <div
      ref="decor1"
      class="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-blue-100/30 blur-xl dark:bg-blue-900/20"
    ></div>
    <div
      ref="decor2"
      class="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-purple-100/30 blur-xl dark:bg-purple-900/20"
    ></div>

    <!-- Encabezado -->
    <div class="relative mb-6 flex items-center justify-between">
      <span
        ref="difficultyBadge"
        class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium shadow-sm"
        :class="difficultyClass"
      >
        <span class="mr-1.5 h-2 w-2 rounded-full" :class="difficultyDotClass"></span>
        {{ difficultyText }}
      </span>

      <div ref="headerRight" class="flex items-center space-x-3">
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
          {{ currentQuestion?.created_by }}
        </span>
        <HintButton
          v-if="hasHintAvailable"
          @hint-used="showHint"
          class="transition-transform hover:scale-110"
        />
      </div>
    </div>

    <!-- Pregunta -->
    <h2
      ref="questionText"
      class="mb-6 text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100"
    >
      {{ currentQuestion?.question }}
    </h2>

    <!-- Pista -->
    <div
      v-if="hintShown"
      ref="hintBox"
      class="mb-6 overflow-hidden rounded-lg border-l-4 border-yellow-400 bg-yellow-50/80 p-4 backdrop-blur-sm dark:bg-yellow-900/20"
    >
      <p class="text-yellow-700 dark:text-yellow-300">{{ currentQuestion?.answer }}</p>
    </div>

    <!-- Opciones -->
    <div class="space-y-3">
      <button
        v-for="(option, index) in currentQuestion?.options"
        :key="index"
        ref="optionButtons"
        @click="selectAnswer(option)"
        class="group relative w-full overflow-hidden rounded-xl border px-5 py-3 text-left transition-all duration-300 hover:shadow-md dark:text-white"
        :class="{
          'border-green-300/80 bg-green-50/50 shadow-green-100 dark:border-green-700/50 dark:bg-green-900/20 dark:shadow-green-900/30':
            selectedAnswer === option && isCorrect,
          'border-red-300/80 bg-red-50/50 shadow-red-100 dark:border-red-700/50 dark:bg-red-900/20 dark:shadow-red-900/30':
            selectedAnswer === option && !isCorrect,
          'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600':
            !answerSubmitted,
          'pointer-events-none': answerSubmitted,
        }"
      >
        <span
          class="absolute inset-0 h-full w-0 bg-gray-100/50 transition-all duration-500 group-hover:w-full dark:bg-gray-700/30"
        ></span>
        <span class="relative z-10 flex items-center">
          <span
            class="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-sm font-medium group-hover:bg-gray-200 dark:bg-gray-700 dark:group-hover:bg-gray-600"
          >
            {{ String.fromCharCode(65 + index) }}
          </span>
          {{ option }}
        </span>
      </button>
    </div>

    <!-- Retroalimentación -->
    <div v-if="answerSubmitted" ref="feedbackBox" class="mt-6">
      <div class="mb-6 text-center">
        <p v-if="isCorrect" class="text-xl font-semibold text-green-600 dark:text-green-400">
          <span class="mr-2">🎉</span> ¡Correcto! {{ streakMessage }}
        </p>
        <p v-else class="text-xl font-semibold text-red-600 dark:text-red-400">
          <span class="mr-2">😕</span> Incorrecto. La respuesta correcta es:
          {{ currentQuestion?.answer }}
        </p>
      </div>
      <button
        ref="nextButton"
        @click="nextQuestion"
        class="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-600 hover:shadow-xl"
      >
        <span class="relative z-10 flex items-center justify-center">
          Siguiente Pregunta
          <svg
            class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </span>
        <span
          class="absolute inset-0 h-full w-0 bg-white/20 transition-all duration-500 group-hover:w-full"
        ></span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuizStore } from '../stores/quiz-store'
import HintButton from './HintButton.vue'
import gsap from 'gsap'

const quizStore = useQuizStore()
const { currentQuestion, hasHintAvailable, streakMessage } = storeToRefs(quizStore)

const selectedAnswer = ref<string | null>(null)
const answerSubmitted = ref(false)
const isCorrect = ref(false)
const hintShown = ref(false)

// Refs para animaciones
const decor1 = ref<HTMLElement | null>(null)
const decor2 = ref<HTMLElement | null>(null)
const difficultyBadge = ref<HTMLElement | null>(null)
const headerRight = ref<HTMLElement | null>(null)
const questionText = ref<HTMLElement | null>(null)
const optionButtons = ref<HTMLElement[] | null>(null)
const hintBox = ref<HTMLElement | null>(null)
const feedbackBox = ref<HTMLElement | null>(null)
const nextButton = ref<HTMLElement | null>(null)

const difficultyText = computed(() => {
  if (!currentQuestion.value) return ''
  const difficulty = currentQuestion.value.difficulty
  return difficulty === 'easy' ? 'Fácil' : difficulty === 'medium' ? 'Medio' : 'Difícil'
})

const difficultyClass = computed(() => {
  if (!currentQuestion.value) return ''
  const difficulty = currentQuestion.value.difficulty
  return difficulty === 'easy'
    ? 'bg-green-100/80 text-green-800 dark:bg-green-900/30 dark:text-green-200'
    : difficulty === 'medium'
      ? 'bg-yellow-100/80 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
      : 'bg-red-100/80 text-red-800 dark:bg-red-900/30 dark:text-red-200'
})

const difficultyDotClass = computed(() => {
  if (!currentQuestion.value) return ''
  const difficulty = currentQuestion.value.difficulty
  return difficulty === 'easy'
    ? 'bg-green-500'
    : difficulty === 'medium'
      ? 'bg-yellow-500'
      : 'bg-red-500'
})

function selectAnswer(option: string) {
  selectedAnswer.value = option
  isCorrect.value = quizStore.answerQuestion(option)
  answerSubmitted.value = true

  // Animación al seleccionar respuesta
  if (optionButtons.value) {
    const selectedIndex = currentQuestion.value?.options.indexOf(option) || 0
    const button = optionButtons.value[selectedIndex]

    gsap.fromTo(
      button,
      { scale: 0.98 },
      {
        scale: 1.02,
        boxShadow: isCorrect.value
          ? '0 0 15px 0 rgba(74, 222, 128, 0.5)'
          : '0 0 15px 0 rgba(248, 113, 113, 0.5)',
        duration: 0.3,
        yoyo: true,
        repeat: 1,
      },
    )
  }

  // Animación de feedback
  if (feedbackBox.value) {
    gsap.to(feedbackBox.value, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'back.out(1)',
    })
  }
}

function nextQuestion() {
  // Animación de salida
  const tl = gsap.timeline()

  if (questionText.value) {
    tl.to(
      questionText.value,
      {
        x: 0,
        opacity: 0,
        duration: 0.3,
      },
      0,
    )
  }

  if (optionButtons.value) {
    optionButtons.value.forEach((btn, i) => {
      tl.to(
        btn,
        {
          x: 0,
          opacity: 0,
          duration: 0.3,
          delay: i * 0.05,
        },
        0,
      )
    })
  }

  if (feedbackBox.value) {
    tl.to(
      feedbackBox.value,
      {
        y: -20,
        opacity: 0,
        duration: 0.3,
      },
      0,
    )
  }

  tl.then(() => {
    // Resetear estado
    selectedAnswer.value = null
    answerSubmitted.value = false
    isCorrect.value = false
    hintShown.value = false
    quizStore.loadQuestion()

    // Animación de entrada para nueva pregunta
    nextTick(() => {
      animateQuestionIn()
    })
  })
}

function showHint(hint: string) {
  hintShown.value = true

  nextTick(() => {
    if (hintBox.value) {
      gsap.fromTo(
        hintBox.value,
        { height: 0, opacity: 0 },
        {
          height: 'auto',
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
      )
    }
  })
}

function animateQuestionIn() {
  const tl = gsap.timeline()

  // Elementos decorativos
  tl.fromTo(
    decor1.value,
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
  )
  tl.fromTo(
    decor2.value,
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
    0.2,
  )

  // Encabezado
  tl.fromTo(
    difficultyBadge.value,
    { y: -10, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.2)' },
    0.4,
  )
  tl.fromTo(
    headerRight.value,
    { x: 20, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.2)' },
    0.5,
  )

  // Pregunta
  tl.fromTo(
    questionText.value,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
    0.6,
  )

  // Opciones
  if (optionButtons.value) {
    optionButtons.value.forEach((btn, i) => {
      tl.fromTo(
        btn,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          delay: i * 0.05,
          ease: 'back.out(1.2)',
        },
        0.7,
      )
    })
  }
}

// Animar al montar el componente
onMounted(() => {
  // Inicializar todos los elementos como ocultos
  gsap.set(
    [
      decor1.value,
      decor2.value,
      difficultyBadge.value,
      headerRight.value,
      questionText.value,
      ...(optionButtons.value || []),
      feedbackBox.value,
    ],
    { opacity: 0 },
  )

  // Iniciar animación de entrada
  animateQuestionIn()
})

// Observar cambios en la pregunta para animar
watch(currentQuestion, () => {
  // Ocultar elementos antes de animar
  gsap.set([questionText.value, ...(optionButtons.value || [])], { opacity: 0 })

  animateQuestionIn()
})
</script>
