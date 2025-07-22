<script setup lang="ts">
import BurbujasMovimiento from '@/components/BurbujasMovimiento.vue'
import api from '@/services/api'
import { ref } from 'vue'
import MoleculeContainer from '../components/MoleculeContainer.vue'

async function registrarEstudiante(usuario: string, contrasena: string) {
  const data = await api.post('/crear_estudiante/', {
    username: usuario,
    password: contrasena,
  })

  return data
}

async function onSubmit() {
  submit.value = true
  function checkUser() {
    if (username.value.length < 3) {
      message.value = 'El nombre de usuario debe tener al menos 3 caracteres'
      console.error('El nombre de usuario debe tener al menos 3 caracteres')
      return false
    }
    if (username.value.length > 20) {
      console.error('El nombre de usuario no puede tener más de 20 caracteres')
      message.value = 'El nombre de usuario no puede tener más de 20 caracteres'
      return false
    }
    if (password.value.length < 6) {
      console.error('La contraseña debe tener al menos 6 caracteres')
      message.value = 'La contraseña debe tener al menos 6 caracteres'
      return false
    }
    if (password.value.length > 20) {
      console.error('La contraseña no puede tener más de 20 caracteres')
      message.value = 'La contraseña no puede tener más de 20 caracteres'
      return false
    }
    if (password.value !== confirmPassword.value) {
      console.error('Las contraseñas no coinciden')
      message.value = 'Las contraseñas no coinciden'
      return false
    }
    if (!/^[a-zA-Z0-9]+$/.test(username.value)) {
      console.error('El nombre de usuario solo puede contener letras y números')
      message.value = 'El nombre de usuario solo puede contener letras y números'
      return false
    }
    return true
  }

  if (!checkUser()) {
    console.error('Error en los datos de registro')
    submit.value = true
    return
  }

  message.value = null

  try {
    // Simulación de registro
    submit.value = false
    const data = await registrarEstudiante(username.value, password.value)

    if (!data) message.value = 'Usuario ya existe'
    message.value = 'Usuario registrado'
  } catch (error) {
    console.error('Error al registrar el usuario:', error)
    message.value = 'Error al registrar el usuario'
    submit.value = false
  }
}

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const userType = ref('student')
const submit = ref(false)
const message = ref<null | string>('')
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
    <BurbujasMovimiento color="azul" />

    <!-- Contenido principal -->
    <div class="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div
        class="w-full max-w-md bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl border border-gray-200 dark:border-gray-700 animate-fade-in-up"
      >
        <!-- Encabezado con gradiente -->
        <div
          class="bg-gradient-to-r from-blue-600/60 to-teal-500/60 dark:from-blue-900/60 dark:to-teal-800/60 p-6 text-center"
        >
          <div class="flex justify-center mb-3">
            <div class="bg-white/20 p-3 rounded-full">
              <span class="text-2xl">🔬</span>
            </div>
          </div>
          <h2 class="text-2xl font-bold text-white">Únete a nuestra comunidad científica</h2>
          <p class="text-blue-100 mt-2">Comienza tu viaje de aprendizaje gamificado</p>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="onSubmit" class="p-6 space-y-5">
          <!-- Tipo de usuario -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ¿Cómo te identificas?
            </label>
            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                @click="userType = 'student'"
                :class="{
                  'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-300':
                    userType === 'student',
                  'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600':
                    userType !== 'student',
                }"
                class="flex items-center justify-center p-3 border rounded-lg transition-colors"
              >
                <span class="mr-2">🎓</span> Estudiante
              </button>
              <button
                type="button"
                @click="userType = 'teacher'"
                :class="{
                  'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-300':
                    userType === 'teacher',
                  'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600':
                    userType !== 'teacher',
                }"
                class="flex items-center justify-center p-3 border rounded-lg transition-colors"
              >
                <span class="mr-2">👩‍🏫</span> Educador
              </button>
            </div>
          </div>

          <!-- Nombre de usuario -->
          <div>
            <div class="flex justify-between items-center mb-2">
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
                id="username"
                v-model="username"
                placeholder="Ej. quantum_learner"
                required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all"
              />
              <span class="absolute right-3 top-3 text-gray-400">✨</span>
            </div>
          </div>

          <!-- Email -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="tucorreo@ejemplo.com"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all"
            />
          </div>

          <!-- Contraseña -->
          <div>
            <div class="flex justify-between items-center mb-2">
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
                placeholder="••••••••"
                required
                minlength="8"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all"
              />
              <span class="absolute right-3 top-3 text-gray-400">🔒</span>
            </div>
            <div class="mt-2 flex gap-1">
              <div
                v-for="i in 4"
                :key="i"
                class="h-1 flex-1 rounded-full"
                :class="{
                  'bg-red-400': password.length > 0 && password.length < 4,
                  'bg-yellow-400': password.length >= 4 && password.length < 8,
                  'bg-green-400': password.length >= 8,
                  'bg-gray-200 dark:bg-gray-600': password.length < i * 2,
                }"
              ></div>
            </div>
          </div>

          <!-- Confirmar contraseña -->
          <div>
            <label
              for="confirm-password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Confirmar contraseña
            </label>
            <div class="relative">
              <input
                type="password"
                id="confirm-password"
                v-model="confirmPassword"
                placeholder="••••••••"
                required
                minlength="8"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all"
              />
              <span
                class="absolute right-3 top-3"
                :class="{
                  'text-green-500': confirmPassword && password === confirmPassword,
                  'text-red-500': confirmPassword && password !== confirmPassword,
                  'text-gray-400': !confirmPassword,
                }"
              >
                {{ confirmPassword && password === confirmPassword ? '✓' : '✗' }}
              </span>
            </div>
          </div>

          <!-- Términos y condiciones -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                required
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
          </div>

          <!-- Botón de registro -->
          <button
            type="submit"
            :disabled="submit"
            class="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-70 disabled:pointer-events-none"
          >
            <span v-if="!submit" class="flex items-center">
              <span class="mr-2">🚀</span> Comenzar aventura científica
            </span>
            <span v-else class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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

          <!-- Mensaje de estado -->
          <div
            v-if="message"
            class="p-3 rounded-lg text-center text-sm"
            :class="{
              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300':
                message === 'Registro exitoso!',
              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300':
                message !== 'Registro exitoso!',
            }"
          >
            {{ message }}
          </div>
        </form>

        <!-- Enlace a login -->
        <div class="px-6 pb-6 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            ¿Ya tienes una cuenta?
            <RouterLink
              :to="{ name: 'auth.login' }"
              class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
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
