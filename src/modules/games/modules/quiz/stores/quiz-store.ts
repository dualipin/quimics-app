import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { DifficultyQuestionCost, type Question } from '../types/Quiz'
import { getAllQuestions, getRandomQuizzes } from '../services/quiz-services'
import { all } from 'axios'

export const useQuizStore = defineStore(
  'quiz',
  () => {
    const currentLevel = ref(1)
    const points = ref(0)
    const coins = ref(30)
    const currentQuestion = ref<null | Question>(null)
    const questionsAnswered = ref<number>(0)
    const usedHints = ref<number[]>([])
    const questions = ref<Question[]>([])
    const currentStreak = ref<number>(0) // Preguntas correctas consecutivas actuales
    const highestStreak = ref<number>(0) // Récord de preguntas correctas consecutivas
    const createdBy = ref<Question['created_by'] | null>(null)
    const allQuestions = ref<Question[]>([])

    async function loadQuestion() {
      try {
        if (questions.value.length > 0) {
          questions.value = getQuestionsByCreator(createdBy.value)
          if (questions.value.length === 0) {
            questions.value = allQuestions.value
          }
          currentQuestion.value =
            questions.value[Math.floor(Math.random() * questions.value.length)]
        } else {
          await getRandomQuizzes(1) // Fetch a random question to start
          try {
            allQuestions.value = await getAllQuestions()
            createdBy.value = null // Reset creator filter
            questions.value = getQuestionsByCreator(createdBy.value)
          } catch (error) {
            console.error('Error fetching all questions:', error)
          }
          if (questions.value.length === 0) {
            questions.value = allQuestions.value
          }
          const levelQuestions = questions.value.filter(
            (q) => getDifficultyForLevel() === q.difficulty,
          )
          currentQuestion.value = levelQuestions[Math.floor(Math.random() * levelQuestions.length)]
        }
      } catch (error) {
        console.error('Error loading questions:', error)
      }
    }

    function getQuestionsByCreator(creatorId: string | null) {
      if (!creatorId) return allQuestions.value
      if (creatorId === 'community') {
        // Filtra todas las preguntas que NO sean de IA ni system
        console.log('preguntas de la comunidad')
        return allQuestions.value.filter((q) => q.created_by !== 'IA' && q.created_by !== 'system')
      }
      return allQuestions.value.filter((q) => q.created_by === creatorId)
    }

    function answerQuestion(selectedOption: string) {
      if (!currentQuestion.value) return false

      const isCorrect = selectedOption === currentQuestion.value.answer

      if (isCorrect) {
        points.value += getPointsForCurrentLevel()
        coins.value += getCoinsForCurrentLevel()
        questionsAnswered.value += 1
        currentStreak.value += 1

        if (currentStreak.value > highestStreak.value) {
          highestStreak.value = currentStreak.value
        }

        // Subir de nivel cada 5 preguntas correctas
        if (questionsAnswered.value % 5 === 0) {
          currentLevel.value += 1
        }
      } else {
        currentStreak.value = 0
      }

      return isCorrect
    }

    function useHint() {
      if (!currentQuestion.value || typeof currentQuestion.value.id !== 'number' || usedHints.value.includes(currentQuestion.value.id)) return

      const hintCost = getHintCost()
      if (coins.value >= hintCost) {
        coins.value -= hintCost
        usedHints.value.push(currentQuestion.value.id)
        return currentQuestion.value.answer
      }
      return null
    }

    function getDifficultyForLevel(): 'easy' | 'medium' | 'hard' {
      if (currentLevel.value <= 3) return 'easy'
      if (currentLevel.value <= 6) return 'medium'
      return 'hard'
    }

    function getPointsForCurrentLevel(): number {
      const difficulty = getDifficultyForLevel()
      return difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30
    }

    function getCoinsForCurrentLevel(): number {
      const difficulty = getDifficultyForLevel()
      return difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 15
    }

    function getHintCost(): number {
      const difficulty = getDifficultyForLevel()
      return difficulty === 'easy' ? 15 : difficulty === 'medium' ? 25 : 40
    }

    const hasHintAvailable = computed(() => {
      if (!currentQuestion.value || typeof currentQuestion.value.id !== 'number') return false
      return !usedHints.value.includes(currentQuestion.value.id) && coins.value >= getHintCost()
    })

    const streakMessage = computed(() => {
      if (currentStreak.value === 0) return '¡Inténtalo de nuevo!'
      if (currentStreak.value === 1) return '¡Bien hecho! Primera respuesta correcta.'
      if (currentStreak.value < 5) return `¡Sigue así! Respuestas correctas: ${currentStreak.value}`
      return `¡Increíble! Respuestas correctas: ${currentStreak.value}. ¡Récord personal!`
    })

    return {
      streakMessage,
      coins,
      currentLevel,
      currentQuestion,
      useHint,
      hasHintAvailable,
      loadQuestion,
      answerQuestion,
      points,
      questionsAnswered,
      usedHints,
      getDifficultyForLevel,
      getPointsForCurrentLevel,
      getCoinsForCurrentLevel,
      getHintCost,
      currentStreak,
      highestStreak,
      createdBy,
    }
  },
  {
    persist: true,
  },
)
