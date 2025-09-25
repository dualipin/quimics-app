<script setup lang="ts">
import { ref } from 'vue'
import GameCanvas from '../components/GameCanvas.vue'
import { type CharacterKey } from '../types/Character'
const character = ref<CharacterKey>('antoine') // Default character
const currentDifficulty = ref(1) // Default difficulty

const reload = () => {
  window.location.reload()
}
</script>

<template>
  <section class="flex flex-1 flex-col">
    <!-- Header with improved design -->
    <div class="bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 shadow-xl">
      <div class="mx-auto max-w-6xl px-6 py-4">
        <!-- Title Section -->
        <div class="mb-2 text-center">
          <h1 class="mb-2 text-2xl font-extrabold text-white drop-shadow-lg md:text-3xl">
            🧪 Chemical Mario
          </h1>
          <p class="font-medium text-indigo-100 md:text-lg">
            ¡Aventura química con los grandes científicos!
          </p>
        </div>

        <!-- Controls Section -->
        <div class="rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-md">
          <div class="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <!-- Game Controls -->
            <div class="flex flex-col items-center gap-4 sm:flex-row">
              <!-- Character Selection -->
              <div class="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
                <div class="text-2xl">👨‍🔬</div>
                <div class="flex items-center justify-center gap-2">
                  <label class="mb-1 block text-sm font-semibold text-white">Personaje</label>
                  <select
                    v-model="character"
                    class="rounded-lg border border-white/30 bg-white/20 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all focus:bg-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none"
                  >
                    <option value="antoine" class="text-gray-800">🧪 Antoine</option>
                    <option value="marie" class="text-gray-800">⚛️ Marie</option>
                    <option value="dmitri" class="text-gray-800">🔬 Dmitri</option>
                  </select>
                </div>
              </div>

              <!-- Difficulty Selection -->
              <div class="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
                <div class="text-2xl">⚡</div>
                <div class="flex items-center justify-center gap-2">
                  <label class="mb-1 block text-sm font-semibold text-white">Dificultad</label>
                  <select
                    v-model="currentDifficulty"
                    class="rounded-lg border border-white/30 bg-white/20 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all focus:bg-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none"
                  >
                    <option :value="1" class="text-gray-800">🌟 Facilísimo</option>
                    <option :value="2" class="text-gray-800">🚀 Inténtalo</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Reload Button -->
            <button
              @click="reload"
              class="group flex transform items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl focus:ring-4 focus:ring-emerald-300 focus:outline-none"
            >
              <svg
                class="h-5 w-5 transition-transform duration-300 group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
              Reiniciar Juego
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-1">
      <GameCanvas :character="character" :difficulty="currentDifficulty" />
    </div>
  </section>
</template>
