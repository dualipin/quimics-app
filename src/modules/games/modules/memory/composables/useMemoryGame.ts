import { computed, ref } from 'vue'
import { type TGameCard } from '../types/Card'

const gameCards: TGameCard[] = [
  // Elementos químicos
  { name: 'Hidrógeno', symbol: 'H', atomicNumber: 1, type: 'element', icon: '💧' },
  { name: 'Oxígeno', symbol: 'O', atomicNumber: 8, type: 'element', icon: '🌬️' },
  { name: 'Carbono', symbol: 'C', atomicNumber: 6, type: 'element', icon: '🖤' },
  { name: 'Sodio', symbol: 'Na', atomicNumber: 11, type: 'element', icon: '🧂' },
  { name: 'Cloro', symbol: 'Cl', atomicNumber: 17, type: 'element', icon: '☣️' },
  { name: 'Hierro', symbol: 'Fe', atomicNumber: 26, type: 'element', icon: '🛡️' },

  // Compuestos químicos
  { name: 'Agua', formula: 'H₂O', type: 'compound', icon: '💦' },
  { name: 'Dióxido de Carbono', formula: 'CO₂', type: 'compound', icon: '☁️' },
  { name: 'Cloruro de Sodio', formula: 'NaCl', type: 'compound', icon: '🧂' },
  { name: 'Amoníaco', formula: 'NH₃', type: 'compound', icon: '🧴' },
  { name: 'Metano', formula: 'CH₄', type: 'compound', icon: '🔥' },
  { name: 'Glucosa', formula: 'C₆H₁₂O₆', type: 'compound', icon: '🍬' },
]

export const useMemoryGame = () => {
  // Estado del juego
  const cards = ref<TGameCard[]>([])
  const flippedCards = ref<TGameCard[]>([])
  const matchedPairs = ref(0)
  const attempts = ref(0)
  const gameWon = ref(false)

  // Computed
  const totalPairs = computed(() => gameCards.length)

  // Inicializar juego
  const initializeGame = () => {
    // Duplicar y mezclar las cartas
    let gameCardsDuplicated = [...gameCards, ...gameCards]
      .map((card) => ({ ...card, id: Math.random(), isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5)

    cards.value = gameCardsDuplicated
    flippedCards.value = []
    matchedPairs.value = 0
    attempts.value = 0
    gameWon.value = false
  }

  // Voltear carta
  const flipCard = (index: number) => {
    const card = cards.value[index]

    // No hacer nada si la carta ya está volteada o emparejada
    if (card.isFlipped || card.isMatched || flippedCards.value.length === 2) return

    // Voltear la carta
    card.isFlipped = true
    flippedCards.value.push({ ...card, id: index })

    // Verificar si hay un par
    if (flippedCards.value.length === 2) {
      attempts.value++

      const [firstIndex, secondIndex] = flippedCards.value
      const firstCard = cards.value[firstIndex.id!]
      const secondCard = cards.value[secondIndex.id!]

      // Verificar si es un par
      if (firstCard.name === secondCard.name) {
        // Emparejado correctamente
        firstCard.isMatched = true
        secondCard.isMatched = true
        matchedPairs.value++
        flippedCards.value = []

        // Verificar si el juego terminó
        if (matchedPairs.value === totalPairs.value) {
          setTimeout(() => {
            gameWon.value = true
          }, 500)
        }
      } else {
        // No es un par, voltear de nuevo después de un tiempo
        setTimeout(() => {
          firstCard.isFlipped = false
          secondCard.isFlipped = false
          flippedCards.value = []
        }, 1000)
      }
    }
  }

  // Reiniciar juego
  const resetGame = () => {
    initializeGame()
  }

  return {
    cards,
    flippedCards,
    matchedPairs,
    attempts,
    gameWon,
    totalPairs,
    initializeGame,
    flipCard,
    resetGame,
    gameCards,
  }
}
