import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStore = defineStore('lotteryGame', () => {
  const roomCode = ref('')
  const playerId = ref('')
  const playerName = ref('')
  const isHost = ref(false)
  const card = ref<string[]>([])
  const drawnElements = ref<string[]>([])
  const players = ref<{ player_id: string; player_name: string }[]>([])
  const winner = ref<string | null>(null)

  function resetGame() {
    roomCode.value = ''
    playerId.value = ''
    playerName.value = ''
    isHost.value = false
    card.value = []
    drawnElements.value = []
    players.value = []
    winner.value = null
  }

  return {
    roomCode,
    playerId,
    playerName,
    isHost,
    card,
    drawnElements,
    players,
    winner,
    resetGame,
  }
})
