<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MoleculeContainer from '../components/MoleculeContainer.vue'

const router = useRouter()
const email = ref('')
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = () => {
  if (!email.value) {
    errorMessage.value = 'Por favor ingresa tu correo electrónico'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  // Simulación de envío
  setTimeout(() => {
    isLoading.value = false
    successMessage.value = `Hemos enviado un enlace de recuperación a ${email.value}`
    email.value = ''
  }, 2000)
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-black p-4"
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
      class="relative w-full max-w-md bg-white/50 animate-fade-in-up dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden z-10 transition-all duration-300 hover:shadow-3xl"
    >
      <!-- Encabezado -->
      <div class="bg-gradient-to-r from-blue-600/50 to-teal-500/50 p-8 text-center">
        <div class="flex justify-center mb-4">
          <div class="bg-white/20 p-4 rounded-full backdrop-blur-sm">
            <span class="text-3xl">🔑</span>
          </div>
        </div>
        <h1 class="text-2xl font-bold text-white">Recupera tu acceso</h1>
        <p class="text-blue-100 mt-2">Te ayudaremos a restablecer tu contraseña</p>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="handleSubmit" class="p-8 space-y-6">
        <!-- Mensajes de estado -->
        <div
          v-if="errorMessage"
          class="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg flex items-start"
        >
          <span class="mr-2">⚠️</span>
          <span>{{ errorMessage }}</span>
        </div>

        <div
          v-if="successMessage"
          class="p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg flex items-start"
        >
          <span class="mr-2">✅</span>
          <span>{{ successMessage }}</span>
        </div>

        <!-- Campo de email -->
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Correo electrónico registrado
          </label>
          <div class="relative">
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              required
              class="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
            />
            <span class="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500">✉️</span>
          </div>
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Ingresa el correo asociado a tu cuenta para recibir instrucciones
          </p>
        </div>

        <!-- Botón de envío -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-70 disabled:pointer-events-none"
        >
          <template v-if="!isLoading">
            <span class="mr-2">📨</span> Enviar enlace de recuperación
          </template>
          <template v-else>
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
        <div class="text-center pt-4">
          <router-link
            :to="{ name: 'auth.login' }"
            class="text-sm text-blue-600 flex justify-center items-center hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <arrow-left /> Volver al inicio de sesión
          </router-link>
        </div>
      </form>

      <!-- Mensaje de seguridad -->
      <div class="px-8 pb-6 bg-gray-50 dark:bg-gray-700/30">
        <div class="flex items-start p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <span class="mr-2 text-blue-500 dark:text-blue-400">ℹ️</span>
          <p class="text-xs text-blue-700 dark:text-blue-300">
            Por seguridad, el enlace de recuperación expirará en 1 hora y solo podrá usarse una vez.
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
