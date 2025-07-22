<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-black"
  >
    <!-- Hero Section -->
    <header class="relative overflow-hidden">
      <div
        class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Y2EzY2MiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMjEgMy4zQzExLjYgMy43IDQuMSAxMS4yIDMuNyAyMC42Yy0uNCA5LjQgNi4xIDE3LjEgMTUuMSAxOC4yIDkgMS4xIDE3LjItMy45IDIwLjgtMTEuOCAzLjYtNy45IDEuOC0xNy41LTMuNy0yNC4zLTUuNS02LjgtMTQuMi05LjQtMjIuMi03Ljl6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10 dark:opacity-5"
      ></div>
      <div class="relative z-10 mx-auto max-w-7xl px-6 py-24 text-center sm:py-32 lg:px-8">
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
    <section class="py-20">
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
            @click="navigateTo('culebrita')"
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
          @click="navigateTo('memorama')"
          class="transform rounded-full bg-gradient-to-r from-blue-600 to-teal-500 px-8 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          Comenzar a jugar ahora
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GameCard from '../components/GameCard.vue'
import StatCard from '../components/StatCard.vue'
import ToggleThemeButton from '@/components/ToggleThemeButton.vue'

const router = useRouter()

const navigateTo = (game: string) => {
  router.push(`/games/${game}`)
}
</script>
