<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import MoleculeContainer from '../components/MoleculeContainer.vue'
import { useRecoveryPassword } from '../composables/useRecoveryPassword'

const { errors, isSubmitting, errorMessage, email, onSubmit, message, emailAttr, meta } =
  useRecoveryPassword()
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4 dark:from-gray-900 dark:to-black"
  >
    <!-- Fondo decorativo -->
    <div class="absolute inset-0 opacity-10 dark:opacity-50">
      <MoleculeContainer class="animate-zoom-in animate-delay-200" molecule="nacl.pdb" />
      <!-- <div
        class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Y2EzY2MiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMjEgMy4zQzExLjYgMy43IDQuMSAxMS4yIDMuNyAyMC42Yy0uNCA5LjQgNi4xIDE3LjEgMTUuMSAxOC4yIDkgMS4xIDE3LjItMy45IDIwLjgtMTEuOCAzLjYtNy45IDEuOC0xNy41LTMuNy0yNC4zLTUuNS02LjgtMTQuMi05LjQtMjIuMi03Ljl6Ii8+PC9nPjwvZz48L3N2Zz4=')]"
      ></div> -->
    </div>

    <!-- Tarjeta principal -->
    <div
      class="animate-fade-in-up hover:shadow-3xl relative z-10 w-full max-w-md overflow-hidden rounded-xl bg-white/50 shadow-2xl backdrop-blur-sm transition-all duration-300 dark:bg-gray-800/50"
    >
      <!-- Encabezado -->
      <div class="bg-gradient-to-r from-blue-600/50 to-teal-500/50 p-8 text-center">
        <div class="mb-4 flex justify-center">
          <div class="rounded-full bg-white/20 p-4 backdrop-blur-sm">
            <span class="text-3xl">🔑</span>
          </div>
        </div>
        <h1 class="text-2xl font-bold text-white">Recupera tu acceso</h1>
        <p class="mt-2 text-blue-100">Te ayudaremos a restablecer tu contraseña</p>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="onSubmit" class="space-y-6 p-8">
        <!-- Mensajes de estado -->
        <div
          v-if="errorMessage"
          class="flex items-start rounded-lg bg-red-100 p-3 text-red-700 dark:bg-red-900/30 dark:text-red-300"
        >
          <span class="mr-2">⚠️</span>
          <span>{{ errorMessage }}</span>
        </div>

        <div
          v-if="message"
          class="flex items-start rounded-lg bg-green-100 p-3 text-green-700 dark:bg-green-900/30 dark:text-green-300"
        >
          <span class="mr-2">✅</span>
          <span>{{ message }}</span>
        </div>

        <!-- Campo de email -->
        <div>
          <label
            for="email"
            class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Correo electrónico registrado
          </label>
          <div class="relative">
            <input
              id="email"
              v-model="email"
              type="email"
              v-bind="emailAttr"
              :class="{ 'border-red-500': errors.email }"
              placeholder="tucorreo@ejemplo.com"
              required
              class="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <span class="absolute top-3.5 left-3 text-gray-400 dark:text-gray-500">✉️</span>
          </div>
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Ingresa el correo asociado a tu cuenta para recibir instrucciones
          </p>
        </div>

        <!-- Botón de envío -->
        <button
          type="submit"
          :disabled="isSubmitting || !meta.valid"
          class="flex w-full transform items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 px-4 py-3 font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:to-teal-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          <template v-if="!isSubmitting">
            <span class="mr-2">📨</span> Enviar enlace de recuperación
          </template>
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
            Enviando...
          </template>
        </button>

        <!-- Enlace para volver a login -->
        <div class="pt-4 text-center">
          <router-link
            :to="{ name: 'auth.login' }"
            class="flex items-center justify-center gap-2 text-sm text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <arrow-left /> Volver al inicio de sesión
          </router-link>
        </div>
      </form>

      <!-- Mensaje de seguridad -->
      <div class="bg-gray-50 px-4 py-2 dark:bg-gray-700/30">
        <div
          class="flex items-start justify-center gap-2 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20"
        >
          <span class="text-blue-500 dark:text-blue-400">ℹ️</span>
          <p class="my-auto text-xs text-blue-700 dark:text-blue-300">
            Si no recibes el correo, revisa tu carpeta de spam.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animación para la tarjeta */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Aplicar animación al cargar */
.form-card {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Efecto de hover para el botón */
.btn-hover-effect:hover {
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
