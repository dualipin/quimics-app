<template>
  <div class="p-6 text-gray-800 transition-colors duration-200 dark:text-gray-100">
    <!-- Encabezado -->
    <header class="mb-8 text-center">
      <h2 class="mb-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
        Sala:
        <span class="rounded-lg bg-gray-200 px-3 py-1 font-mono dark:bg-gray-700">{{
          store.roomCode
        }}</span>
      </h2>
      <h3 class="text-xl font-semibold">
        Jugador: <span class="text-indigo-500 dark:text-indigo-300">{{ store.playerName }}</span>
      </h3>
    </header>

    <!-- Botón de Lotería -->
    <div v-if="isCardComplete" class="mb-8 flex justify-center">
      <button
        @click="declareBingo"
        class="focus:ring-opacity-50 transform rounded-lg bg-green-600 px-6 py-3 font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-green-700 hover:shadow-lg focus:ring-2 focus:ring-green-500 focus:outline-none dark:bg-green-700 dark:hover:bg-green-800"
      >
        ¡Lotería!
      </button>
    </div>

    <!-- Componente para lanzar elementos (solo host) -->
    <ElementDrawer v-if="store.isHost" @draw="handleDraw" />

    <!-- Elementos lanzados -->
    <section class="mb-8 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-900">
      <h4 class="mb-4 text-center text-lg font-semibold">Elementos lanzados:</h4>
      <div class="flex flex-wrap justify-center gap-2">
        <span
          v-for="el in store.drawnElements"
          :key="el"
          class="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100"
        >
          {{ el }}
        </span>
      </div>
    </section>
    <!-- Tarjeta de jugador -->
    <section class="mb-10">
      <PlayerCard :elements="store.card" :drawn="store.drawnElements" />
    </section>

    <!-- Mensaje de ganador -->
    <div
      v-if="store.winner"
      class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div
        class="animate-bounce-in w-full max-w-md rounded-xl bg-white p-8 text-center dark:bg-gray-800"
      >
        <h2 class="mb-4 flex justify-center text-3xl font-bold text-green-600 dark:text-green-400">
          <span class="mr-2">🎉</span> ¡Ganó {{ store.winner }}! <span class="ml-2">🎉</span>
        </h2>
        <p class="mb-6 text-lg">Felicidades al ganador</p>
        <button
          @click="$router.push({ name: 'games.lottery' })"
          class="rounded-lg bg-indigo-600 px-6 py-2 text-white transition-colors duration-200 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
        >
          Nuevo juego
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useGameStore } from '../stores/game'
import { connectWebSocket, sendMessage } from '../services/socket'
import PlayerCard from '../components/PlayerCard.vue'
import ElementDrawer from '../components/ElementDrawer.vue'
import { useRouter } from 'vue-router'
import { useToastStore } from '@/stores'

const store = useGameStore()
const router = useRouter()
const toast = useToastStore()

const isCardComplete = computed(() => store.card.every((el) => store.drawnElements.includes(el)))

const handleDraw = () => {
  sendMessage({ action: 'draw' })
}

const declareBingo = () => {
  sendMessage({ action: 'bingo' })
}

onMounted(() => {
  if (!store.roomCode || !store.playerId) {
    toast.show('Debes unirte a una sala primero', 'error')
    router.push({ name: 'games.lottery' })
    return
  }

  connectWebSocket(store.roomCode, store.playerId, (data) => {
    if (data.event === 'draw') {
      store.drawnElements.push(data.element)
    } else if (data.event === 'winner') {
      store.winner = data.player_name
    } else if (data.event === 'player_left') {
      toast.show(`${data.player_name} ha abandonado la sala`, 'info')
    } else if (data.error) {
      toast.show(`Error: ${data.error}`, 'error')
    }
  })
})
</script>
