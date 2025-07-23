<script setup lang="ts">
import MoleculeContainer from '../components/MoleculeContainer.vue'
import { useLoginUser } from '../composables/useLoginUser'

const { email, emailAttr, password, passwordAttr, errors, isSubmitting, onSubmit, meta } =
  useLoginUser()
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4 dark:from-gray-950 dark:to-black"
  >
    <!-- Fondo molecular sutil -->
    <div class="absolute inset-0 opacity-10 dark:opacity-60">
      <MoleculeContainer
        class="animate-zoom-in animate-delay-200"
        molecule="cholesterol.pdb"
        :light="true"
      />
    </div>

    <!-- Tarjeta de login -->
    <div
      class="animate-fade-in-down hover:shadow-3xl relative z-10 w-full max-w-md overflow-hidden rounded-xl bg-white/50 shadow-2xl backdrop-blur-sm transition-all duration-300 dark:bg-gray-900/50"
    >
      <!-- Encabezado con gradiente -->
      <div class="bg-gradient-to-r from-blue-600/50 to-teal-500/50 p-8 text-center">
        <div class="mb-4 flex justify-center">
          <div class="rounded-full bg-white/20 p-4 backdrop-blur-sm">
            <span class="text-3xl">🔐</span>
          </div>
        </div>
        <h1 class="text-2xl font-bold text-white">Bienvenido de vuelta</h1>
        <p class="mt-2 text-blue-100">Inicia sesión para continuar tu aprendizaje</p>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="onSubmit" class="space-y-6 p-8">
        <!-- Campo Email -->
        <div>
          <label
            for="email"
            class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Correo electrónico
          </label>
          <div class="relative">
            <input
              v-bind="emailAttr"
              id="email"
              v-model="email"
              type="email"
              placeholder="tu@email.com"
              required
              class="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <span class="absolute top-3.5 left-3 text-gray-400 dark:text-gray-500">✉️</span>
          </div>
          <div v-if="errors.email" class="mt-2 text-sm text-red-600 dark:text-red-400">
            {{ errors.email }}
          </div>
        </div>

        <!-- Campo Contraseña -->
        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Contraseña
            </label>
            <router-link
              :to="{ name: 'auth.forgot-password' }"
              class="text-xs text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ¿Olvidaste tu contraseña?
            </router-link>
          </div>
          <div class="relative">
            <input
              id="password"
              v-bind="passwordAttr"
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
              class="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <span class="absolute top-3.5 left-3 text-gray-400 dark:text-gray-500">🔒</span>
          </div>
          <div v-if="errors.password" class="mt-2 text-sm text-red-600 dark:text-red-400">
            {{ errors.password }}
          </div>
        </div>

        <!-- Botón de login -->
        <button
          type="submit"
          :disabled="isSubmitting || !meta.valid"
          class="flex w-full transform items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 px-4 py-3 font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:to-teal-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50 disabled:hover:cursor-not-allowed"
        >
          <template v-if="!isSubmitting"> <span class="mr-2">🚀</span> Iniciar sesión </template>
          <template v-else>
            <svg
              class="animate-spin-clockwise animate-iteration-count-infinite mr-3 -ml-1 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Procesando...
          </template>
        </button>
      </form>

      <!-- Pie de formulario -->
      <div class="bg-gray-50/30 px-8 py-6 text-center dark:bg-gray-700/30">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          ¿No tienes una cuenta?
          <router-link
            :to="{ name: 'auth.register' }"
            class="font-medium text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Regístrate ahora
          </router-link>
        </p>
        <p>
          <router-link
            :to="{ name: 'home' }"
            class="font-medium text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Regresar al inicio
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animación para la tarjeta */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Aplicar animación al cargar */
.form-card {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Efecto de hover para botones sociales */
.social-btn:hover {
  transform: translateY(-2px);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
