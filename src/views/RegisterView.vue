<script setup lang="ts">
import BurbujasMovimiento from '@/components/BurbujasMovimiento.vue'
import api from '@/services/api'
import { ref } from 'vue'
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const submit = ref(false)
const message = ref<null | string>()

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
</script>

<template>
  <div
    class="relative px-4 py-12 min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-black to-indigo-900 dark:from-indigo-950 dark:to-black overflow-hidden"
  >
    <BurbujasMovimiento color="blanco" />

    <div class="absolute inset-0 backdrop-blur-sm opacity-20"></div>

    <div
      class="relative z-10 w-full max-w-md bg-indigo-800 dark:bg-indigo-700 rounded-2xl shadow-xl p-8"
    >
      <h2
        class="text-3xl font-extrabold text-center text-indigo-100 mb-6 dark:text-indigo-200 tracking-wide"
      >
        🧬 Crea tu cuenta
      </h2>

      <form @submit.prevent="onSubmit" class="space-y-5">
        <div>
          <label
            for="username"
            class="block text-sm font-medium text-blue-300 mb-1 dark:text-blue-400"
          >
            Nombre de usuario
          </label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Ej. atomoPro"
            required
            class="w-full px-4 py-2 rounded-lg placeholder:text-indigo-300 bg-indigo-700 border border-indigo-600 text-indigo-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-indigo-800 dark:border-indigo-500 dark:text-indigo-200"
          />
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium text-blue-300 mb-1 dark:text-blue-400"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="********"
            required
            class="w-full px-4 py-2 rounded-lg placeholder:text-indigo-300 bg-indigo-700 border border-indigo-600 text-indigo-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-indigo-800 dark:border-indigo-500 dark:text-indigo-200"
          />
        </div>

        <div>
          <label
            for="confirm-password"
            class="block text-sm font-medium text-blue-300 mb-1 dark:text-blue-400"
          >
            Confirmar contraseña
          </label>
          <input
            type="password"
            id="confirm-password"
            v-model="confirmPassword"
            placeholder="********"
            required
            class="w-full px-4 py-2 rounded-lg placeholder:text-indigo-300 bg-indigo-700 border border-indigo-600 text-indigo-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-indigo-800 dark:border-indigo-500 dark:text-indigo-200"
          />
        </div>

        <button
          type="submit"
          :disabled="submit"
          class="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold py-2 px-4 rounded-lg transition hover:from-purple-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50 disabled:pointer-events-none"
        >
          🌟 Crear cuenta
        </button>

        <div
          v-if="message"
          class="text-center text-sm mt-3"
          :class="{
            'text-purple-300': message === 'Usuario registrado',
            'text-red-400': message !== 'Usuario registrado',
          }"
        >
          {{ message }}
        </div>
      </form>

      <p class="mt-6 text-sm text-center text-blue-300 dark:text-blue-400">
        ¿Ya tienes una cuenta?
        <RouterLink
          :to="{ name: 'login' }"
          class="font-semibold text-purple-300 hover:text-purple-200 dark:text-purple-400 dark:hover:text-purple-300 transition"
        >
          Inicia sesión
        </RouterLink>
      </p>
    </div>
  </div>
</template>
