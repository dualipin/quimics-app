<script setup lang="ts">
import MovingBubbles from '@/components/MovingBubbles.vue'
import MoleculeContainer from '../components/MoleculeContainer.vue'
import { useRegisterUser } from '../composables/useRegiterUser'
import { watch } from 'vue'

const {
  confirmPasswordField,
  email,
  emailAttr,
  isSubmitting,
  meta,
  onSubmit,
  password,
  passwordAttr,
  isMatchingPassword,
  role,
  full_name,
  full_nameAttr,
} = useRegisterUser()
</script>

<template>
  <div
    class="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-950"
  >
    <!-- Fondo científico -->
    <div class="animate-zoom-in animate-delay-200 absolute inset-0 opacity-50">
      <MoleculeContainer molecule="lsd.pdb" />
    </div>

    <!-- Burbujas decorativas -->
    <MovingBubbles color="azul" />

    <!-- Contenido principal -->
    <div
      class="relative z-20 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 sm:py-2 lg:px-8"
    >
      <div
        class="hover:shadow-3xl animate-fade-in-up w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white/50 shadow-2xl backdrop-blur-sm transition-all duration-300 dark:border-gray-700 dark:bg-gray-900/50"
      >
        <!-- Encabezado con gradiente -->
        <div
          class="bg-gradient-to-r from-blue-600/60 to-teal-500/60 p-6 text-center dark:from-blue-900/60 dark:to-teal-800/60"
        >
          <div class="mb-3 flex justify-center">
            <div class="rounded-full bg-white/20 p-3">
              <span class="text-2xl">🔬</span>
            </div>
          </div>
          <h2 class="text-2xl font-bold text-white">Únete a nuestra comunidad científica</h2>
          <p class="mt-2 text-blue-100">Comienza tu viaje de aprendizaje gamificado</p>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="onSubmit" class="space-y-5 p-6">
          <!-- Tipo de usuario -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              ¿Cómo te identificas?
            </label>
            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                @click="role = 'alumno'"
                :class="{
                  'border-blue-500 bg-blue-100 text-blue-700 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-300':
                    role === 'alumno',
                  'border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600':
                    role !== 'alumno',
                }"
                class="flex items-center justify-center rounded-lg border p-3 transition-colors"
              >
                <span class="mr-2">🎓</span> Estudiante
              </button>
              <button
                type="button"
                @click="role = 'profesor'"
                :class="{
                  'border-blue-500 bg-blue-100 text-blue-700 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-300':
                    role === 'profesor',
                  'border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600':
                    role !== 'profesor',
                }"
                class="flex items-center justify-center rounded-lg border p-3 transition-colors"
              >
                <span class="mr-2">👩‍🏫</span> Educador
              </button>
            </div>
          </div>

          <!-- Nombre de usuario -->
          <div>
            <div class="mb-2 flex items-center justify-between">
              <label
                for="username"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Nombre de usuario
              </label>
              <span class="text-xs text-gray-500 dark:text-gray-400">Único y creativo</span>
            </div>
            <div class="relative">
              <input
                type="text"
                v-bind="full_nameAttr"
                id="username"
                v-model="full_name"
                placeholder="Ej. quantum_learner"
                required
                class="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              <span class="absolute top-3 right-3 text-gray-400">✨</span>
            </div>
          </div>

          <!-- Email -->
          <div>
            <label
              for="email"
              class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              v-bind="emailAttr"
              v-model="email"
              placeholder="tucorreo@ejemplo.com"
              required
              class="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          <!-- Contraseña -->
          <div>
            <div class="mb-2 flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Contraseña
              </label>
              <span class="text-xs text-gray-500 dark:text-gray-400">Mínimo 8 caracteres</span>
            </div>
            <div class="relative">
              <input
                type="password"
                id="password"
                v-model="password"
                v-bind="passwordAttr"
                placeholder="••••••••"
                required
                class="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              <span class="absolute top-3 right-3 text-gray-400">🔒</span>
            </div>
            <div class="mt-2 flex gap-1">
              <div
                v-for="i in 4"
                :key="i"
                class="h-1 flex-1 rounded-full"
                :class="{
                  'bg-red-500': password && password.length < 6 && i <= 1,
                  'bg-yellow-500': password && password.length >= 6 && i <= 2,
                  'bg-green-500': isMatchingPassword && i <= 3,
                  'bg-gray-300': !password || i > 3,
                }"
              ></div>
            </div>
          </div>

          <!-- Confirmar contraseña -->
          <div>
            <label
              for="confirm-password"
              class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirmar contraseña
            </label>
            <div class="relative">
              <input
                type="password"
                id="confirm-password"
                v-model="confirmPasswordField"
                placeholder="••••••••"
                required
                class="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              <span
                class="absolute top-3 right-3"
                :class="{
                  'text-green-500': confirmPasswordField && password === confirmPasswordField,
                  'text-red-500': confirmPasswordField && password !== confirmPasswordField,
                  'text-gray-400': !confirmPasswordField,
                }"
              >
                {{ confirmPasswordField && password === confirmPasswordField ? '✓' : '✗' }}
              </span>
            </div>
          </div>

          <!-- Términos y condiciones -->
          <!-- <div class="flex items-start">
            <div class="flex h-5 items-center">
              <input
                id="terms"
                type="checkbox"
                required
                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
            </div>
            <label for="terms" class="ml-2 text-sm text-gray-600 dark:text-gray-300">
              Acepto los
              <a href="#" class="text-blue-600 hover:underline dark:text-blue-400"
                >Términos de Servicio</a
              >
              y
              <a href="#" class="text-blue-600 hover:underline dark:text-blue-400"
                >Política de Privacidad</a
              >
            </label>
          </div> -->

          <!-- Botón de registro -->
          <button
            type="submit"
            :disabled="isSubmitting || !isMatchingPassword || !meta.valid"
            class="flex w-full transform items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 px-4 py-3 font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:to-teal-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            <span v-if="!isSubmitting" class="flex items-center">
              <span class="mr-2">🚀</span> Comenzar aventura científica
            </span>
            <span v-else class="flex items-center">
              <svg
                class="animate-spin-clockwise animate-iteration-count-infinite mr-2 -ml-1 h-4 w-4 text-white"
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
              Creando cuenta...
            </span>
          </button>
        </form>

        <!-- Enlace a login -->
        <div class="px-6 pb-6 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            ¿Ya tienes una cuenta?
            <RouterLink
              :to="{ name: 'auth.login' }"
              class="font-medium text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Inicia sesión aquí
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Efecto de borde sutil al hacer hover en el contenedor del formulario */
.form-container {
  transition: box-shadow 0.3s ease;
}

.form-container:hover {
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 5px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Animación para el indicador de fortaleza de contraseña */
@keyframes barGrow {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.password-strength div {
  animation: barGrow 0.5s ease-out forwards;
  transform-origin: left;
}
</style>
