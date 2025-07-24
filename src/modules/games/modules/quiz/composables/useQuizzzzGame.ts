// import { ref, computed } from 'vue'
// import { useRouter } from 'vue-router'
// import { useUserQuizStore } from '../stores/user-store'
// import { useQuizStore } from '../stores/quiz-store'
// import type { Question } from '../types/Quiz'

// export function useQuiz() {
//   const router = useRouter()
//   const userStore = useUserQuizStore()
//   const quizStore = useQuizStore()

//   // Inicializar el estado del juego

//   const currentLevel = ref(1)
//   const currentQuestionIndex = ref(0)
//   const questions = computed(() => quizStore.getQuestionsForLevel(currentLevel.value))
//   const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
//   const correctAnswersCount = ref(0)

//   const levelCompleted = computed(() => {
//     return currentQuestionIndex.value >= questions.value.length
//   })

//   const levelReward = computed(() => {
//     return currentLevel.value * 100
//   })

//   const handleAnswer = (selectedIndex: number) => {
//     if (currentQuestion.value.correctAnswer === selectedIndex) {
//       userStore.addCoins(10) // 10 monedas por respuesta correcta
//       correctAnswersCount.value++
//     }

//     // Pasar a la siguiente pregunta
//     setTimeout(() => {
//       currentQuestionIndex.value++

//       // Si se completó el nivel, dar recompensa
//       if (levelCompleted.value) {
//         userStore.addCoins(levelReward.value)
//       }
//     }, 1500)
//   }

//   const nextLevel = () => {
//     currentLevel.value++
//     currentQuestionIndex.value = 0
//   }

//   const initializeQuiz = async () => {
//     await quizStore.addAIQuestion()
//     await quizStore.addSystemQuestion()
//   }

//   return {
//     currentQuestion,
//     levelCompleted,
//     levelReward,
//     handleAnswer,
//     nextLevel,
//     currentLevel,
//     questions,
//     currentQuestionIndex,
//     correctAnswersCount,
//     initializeQuiz,
//   }
// }
