<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MoleculeContainer from '../components/MoleculeContainer.vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Por favor completa todos los campos'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  // Simulación de autenticación
  setTimeout(() => {
    isLoading.value = false
    router.push('/dashboard')
  }, 1500)
}

const handleSocialLogin = (provider: string) => {
  console.log(`Iniciando sesión con ${provider}`)
  // Lógica para autenticación social
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-black p-4"
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
      class="relative w-full animate-fade-in-down max-w-md bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl z-10"
    >
      <!-- Encabezado con gradiente -->
      <div class="bg-gradient-to-r from-blue-600/50 to-teal-500/50 p-8 text-center">
        <div class="flex justify-center mb-4">
          <div class="bg-white/20 p-4 rounded-full backdrop-blur-sm">
            <span class="text-3xl">🔐</span>
          </div>
        </div>
        <h1 class="text-2xl font-bold text-white">Bienvenido de vuelta</h1>
        <p class="text-blue-100 mt-2">Inicia sesión para continuar tu aprendizaje</p>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="handleLogin" class="p-8 space-y-6">
        <!-- Mensaje de error -->
        <div
          v-if="errorMessage"
          class="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg flex items-start"
        >
          <span class="mr-2">⚠️</span>
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Campo Email -->
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Correo electrónico
          </label>
          <div class="relative">
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="tu@email.com"
              required
              class="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
            />
            <span class="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500">✉️</span>
          </div>
        </div>

        <!-- Campo Contraseña -->
        <div>
          <div class="flex justify-between items-center">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Contraseña
            </label>
            <router-link
              :to="{ name: 'auth.forgot-password' }"
              class="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </router-link>
          </div>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
              minlength="8"
              class="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
            />
            <span class="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500">🔒</span>
          </div>
        </div>

        <!-- Recordar sesión -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="rememberMe"
              type="checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label for="remember-me" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Recordar mi sesión
            </label>
          </div>
        </div>

        <!-- Botón de login -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-70 disabled:pointer-events-none"
        >
          <template v-if="!isLoading"> <span class="mr-2">🚀</span> Iniciar sesión </template>
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
            Procesando...
          </template>
        </button>

        <!-- Divisor -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span
              class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300 rounded-2xl"
            >
              O continúa con
            </span>
          </div>
        </div>

        <!-- Login social -->
        <!-- <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            @click="handleSocialLogin('google')"
            class="flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            <span class="mr-2">🔍</span> Google
          </button>
          <button
            type="button"
            @click="handleSocialLogin('microsoft')"
            class="flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            <span class="mr-2">🪟</span> Microsoft
          </button>
        </div> -->
      </form>

      <!-- Pie de formulario -->
      <div class="px-8 py-6 text-center bg-gray-50/30 dark:bg-gray-700/30">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          ¿No tienes una cuenta?
          <router-link
            :to="{ name: 'auth.register' }"
            class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Regístrate ahora
          </router-link>
        </p>
        <p>
          <router-link
            :to="{ name: 'home' }"
            class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
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
