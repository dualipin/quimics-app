import { defineStore } from 'pinia'
import type { Question } from '../types/Quiz'
import { ref } from 'vue'

export const useUserQuizStore = defineStore(
  'userQuiz',
  () => {
    const coins = ref(50)
    const unlockedLevels = ref(1)
    const purchasedQuestions = ref<Question[]>([])

    function addCoins(amount: number) {
      coins.value += amount
    }

    function spendCoins(amount: number): boolean {
      if (coins.value >= amount) {
        coins.value -= amount
        return true
      }
      return false
    }

    function unlockNextLevel() {
      unlockedLevels.value += 1
    }

    function addPurchasedQuestions(questions: Question[]) {
      purchasedQuestions.value.push(...questions)
    }

    return {
      coins,
      unlockedLevels,
      purchasedQuestions,
      addCoins,
      spendCoins,
      unlockNextLevel,
      addPurchasedQuestions,
    }
  },
  {
    persist: true,
  },
)
