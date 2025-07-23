import { ref } from 'vue'
// import { SHOP_ITEMS } from '@/modules/quiz/shopItems'
import { useUserQuizStore } from '../stores/user-store'
import { useQuizStore } from '../stores/quiz-store'
import type { ShopItem } from '../types/Quiz'

export function useShop() {
  const userStore = useUserQuizStore()
  const quizStore = useQuizStore()

  const shopItems = ref<ShopItem[]>([])

  const buyItem = (item: (typeof shopItems.value)[0]) => {
    if (userStore.spendCoins(item.price)) {
      if (item.type === 'question' && item.content) {
        userStore.addPurchasedQuestions(item.content as any)
        quizStore.addAIQuestions(item.content as any)
      }
      return true
    }
    return false
  }

  return {
    shopItems,
    buyItem,
  }
}
