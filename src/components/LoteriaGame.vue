<script setup lang="ts">
import {
  carton,
  elementoActual,
  elementosLanzados,
  estaMarcado,
  ganador,
  hayUnGanador,
  seleccionarElemento,
  soyUnGanador,
} from '@/composables/loteria-composable'
import { adminSocket, reiniciarJuego, tirarCarta } from '@/composables/admin-loteria-composable'
import { manejarCambiarCarton, jugadorSocket } from '@/composables/jugador-loteria-composable'
import { onBeforeUnmount, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const puedeJugar = ref(auth.user?.role == 'profesor' || auth.user?.role == 'administrador')

const recargarPagina = () => {
  window.location.reload()
}

onBeforeUnmount(() => {
  adminSocket.value?.close()
  jugadorSocket.value?.close()
})
</script>

<template>
  <!-- ganador -->
  <div v-if="ganador" class="my-2 relative">
    <span class="text-3xl font-bold animate-bounce animation-delay-200 text-gray-600"
      >Ganador: {{ ganador }}</span
    >
  </div>

  <button
    class="transition-colors bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mb-4"
    @click="recargarPagina"
  >
    Reconectar
  </button>
  <!-- controles profesor/administrador -->
  <div v-if="puedeJugar" class="flex gap-4">
    <button
      class="transition-colors bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="() => tirarCarta()"
    >
      Tirar carta
    </button>

    <button
      class="transition-colors bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      @click="() => reiniciarJuego()"
    >
      Reiniciar Juego
    </button>
  </div>

  <!-- elemento actual -->
  <div
    v-if="elementoActual"
    class="my-4 p-4 bg-blue-100 border-2 border-blue-500 rounded-lg text-center"
  >
    <div class="text-lg font-bold mb-1">Elemento actual:</div>
    <div class="flex flex-col items-center">
      <span class="text-3xl font-bold text-blue-700">{{ elementoActual.simbolo }}</span>
      <span class="text-xl">{{ elementoActual.nombre }}</span>
      <span class="text-sm text-gray-600">Número atómico: {{ elementoActual.numeroAtomico }}</span>
    </div>
  </div>

  <!-- elementos lanzados -->
  <div class="my-4">
    <h3 class="text-lg font-bold mb-1">
      Elementos lanzados: {{ elementosLanzados.length }} de 118
    </h3>
    <ul class="flex flex-wrap gap-2">
      <li
        class="border-2 border-gray-300 rounded-lg p-2 bg-gray-100 aspect-square w-10 flex justify-center items-center"
        v-for="elemento in elementosLanzados"
        :key="elemento.numeroAtomico"
      >
        {{ elemento.simbolo }}
      </li>
    </ul>
  </div>

  <!-- notificaciones -->
  <div class="my-4">
    <span
      v-if="soyUnGanador && ganador"
      class="text-6xl font-bold"
      :class="{ 'text-emerald-600': soyUnGanador, 'text-gray-600': !soyUnGanador }"
      >{{
        soyUnGanador ? '¡Felicidades! ¡Has completado tu cartón!' : 'Sigue jugando para ganar'
      }}</span
    >
    <span v-if="hayUnGanador && !soyUnGanador" class="text-6xl text-red-600">
      ¡Alguien más ha ganado! Mejor suerte para la próxima.
    </span>
  </div>

  <!-- jugador estudiante -->
  <div v-if="!puedeJugar">
    <div class="flex justify-end items-center mb-4">
      <button
        class="transition-colors bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
        @click="() => manejarCambiarCarton()"
      >
        Cambiar Cartón
      </button>
    </div>

    <div class="grid grid-cols-4 gap-2">
      <div
        v-for="elemento in carton"
        :key="elemento.numeroAtomico"
        class="aspect-square flex flex-col items-center justify-center p-2 rounded-lg shadow-md border-2"
        :class="{
          'border-emerald-500 bg-white': !estaMarcado(elemento),
          'border-emerald-600 bg-emerald-100': estaMarcado(elemento),
        }"
        @click="seleccionarElemento(elemento)"
      >
        <div
          class="text-2xl font-bold"
          :class="{
            'text-emerald-600': !estaMarcado(elemento),
            'text-emerald-800': estaMarcado(elemento),
          }"
        >
          {{ elemento.simbolo }}
        </div>
        <div class="text-sm mt-1">{{ elemento.nombre }}</div>
        <div class="text-xs text-gray-600">{{ elemento.numeroAtomico }}</div>
      </div>
    </div>
  </div>
</template>
