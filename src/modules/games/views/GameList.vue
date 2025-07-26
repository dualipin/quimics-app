<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-black"
  >
    <!-- Hero Section -->
    <header class="relative overflow-hidden">
      <div class="relative z-10 mx-auto max-w-7xl px-6 pt-16 text-center sm:pt-20 lg:px-8">
        <div
          class="mb-5 rounded-lg bg-gradient-to-br from-blue-600/50 via-teal-500/50 to-indigo-700/10 p-6 text-gray-300 backdrop-blur-sm sm:p-10 lg:p-12 dark:bg-gradient-to-br dark:from-blue-800/20 dark:via-teal-700/30 dark:to-indigo-900/10"
        >
          <div class="relative z-10 flex h-full items-center justify-center"></div>
          <p class="animate-fade-in text-2xl font-light tracking-wide text-white/90 md:text-3xl">
            Hola {{ auth.user?.full_name }},<br class="hidden sm:block" />
            <span
              class="bg-gradient-to-r from-white to-blue-100 bg-clip-text font-medium text-transparent"
            >
              Bienvenido de vuelta
            </span>
          </p>
          <div class="top-5 right-5 mt-6 md:absolute md:mt-0">
            <button
              @click="auth.logout"
              class="rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg dark:from-red-800 dark:to-pink-700"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
        <div class="mb-6 flex justify-center">
          <div class="rounded-full bg-gradient-to-r from-blue-600 to-teal-500 p-3">
            <span class="text-3xl">🎮</span>
          </div>
        </div>
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
          <span class="block">Laboratorio de</span>
          <span
            class="mt-3 block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
            >Juegos Químicos</span
          >
        </h1>
        <p class="mx-auto mt-6 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
          Aprende química de forma divertida con nuestra colección de juegos educativos
        </p>
        <ToggleThemeButton class="mt-5 rounded-full border p-2 *:size-8 dark:text-white" />
      </div>
    </header>

    <!-- Game Grid Section -->
    <section class="pt-10 pb-20">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="mb-16 text-center text-3xl font-bold text-gray-900 dark:text-white">
          <span class="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
            >Explora</span
          >
          Nuestros Juegos
        </h2>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <!-- Periodic Table -->
          <GameCard
            title="Tabla Periódica"
            description="Explora los elementos químicos de forma interactiva"
            icon="🧪"
            color="from-blue-500 to-teal-600"
            :delay="0.1"
            @click="$router.push({ name: 'games.periodic-table' })"
          />
          <!-- Memorama -->
          <GameCard
            title="Memorama Químico"
            description="Encuentra las parejas de elementos y compuestos en este juego de memoria"
            icon="🧠"
            color="from-purple-500 to-indigo-600"
            :delay="0.1"
            @click="$router.push({ name: 'games.memory' })"
          />

          <!-- Lotería -->
          <GameCard
            title="Lotería de Elementos"
            description="Aprende la tabla periódica jugando esta versión química del tradicional juego"
            icon="🎲"
            color="from-amber-500 to-orange-500"
            :delay="0.2"
            @click="$router.push({ name: 'games.lottery' })"
          />

          <!-- Preguntas -->
          <GameCard
            title="Desafío de Preguntas"
            description="Pon a prueba tus conocimientos con nuestro quiz interactivo"
            icon="❓"
            color="from-blue-500 to-teal-500"
            :delay="0.3"
            @click="$router.push({ name: 'games.quiz' })"
          />

          <!-- Culebrita -->
          <GameCard
            title="Culebrita Atómica"
            description="Controla una serpiente de electrones y recolecta partículas"
            icon="🐍"
            color="from-green-500 to-emerald-600"
            :delay="0.4"
            @click="$router.push({ name: 'games.snake' })"
          />

          <!-- Creación de compuestos -->
          <GameCard
            title="Constructor Molecular"
            description="Combina átomos para formar compuestos en este simulador interactivo"
            icon="⚛️"
            color="from-red-500 to-pink-600"
            :delay="0.5"
            @click="navigateTo('compuestos')"
          />

          <!-- Mario Bross -->
          <GameCard
            title="Mario Químico"
            description="Salta entre orbitales atómicos en esta aventura estilo plataforma"
            icon="👨‍🔬"
            color="from-yellow-400 to-red-500"
            :delay="0.6"
            @click="navigateTo('mario')"
          />
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="bg-gradient-to-br from-blue-600 to-teal-500 py-20 text-white">
      <div class="mx-auto max-w-7xl px-6">
        <div class="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          <StatCard value="6+" label="Juegos educativos" icon="🎮" />
          <StatCard value="120+" label="Conceptos químicos" icon="🧪" />
          <StatCard value="5k+" label="Estudiantes activos" icon="👨‍🎓" />
          <StatCard value="98%" label="Satisfacción" icon="😊" />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20">
      <div class="mx-auto max-w-7xl px-6 text-center">
        <h2 class="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
          ¿Listo para aprender jugando?
        </h2>
        <p class="mx-auto mb-8 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
          Nuestros juegos combinan diversión con aprendizaje efectivo de conceptos químicos
          fundamentales
        </p>
        <button
          @click="$router.push({ name: 'games.memory' })"
          class="transform rounded-full bg-gradient-to-r from-blue-600 to-teal-500 px-8 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          Comenzar a jugar ahora
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import GameCard from '../components/GameCard.vue'
import StatCard from '../components/StatCard.vue'
import ToggleThemeButton from '@/components/ToggleThemeButton.vue'
import { useAuthStore } from '@/modules/auth/stores/auth-store'

const router = useRouter()
const auth = useAuthStore()

const navigateTo = (game: string) => {
  router.push(`/games/${game}`)
}
</script>
