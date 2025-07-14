<template>
  <div
    class="flex-1 object-center bg-center min-h-dvh dark:brightness-75 flex items-center justify-center from-blue-300 to-blue-500 bg-gradient-to-r dark:from-gray-800 dark:to-gray-900"
    :style="{ backgroundImage: 'url(' + imagenfondo + ')', backgroundSize: 'cover' }"
  >
    <div
      class="relative bg-gradient-to-r from-blue-300/30 to-blue-500/30 dark:from-gray-800/30 dark:to-gray-900/30 rounded-3xl shadow-lg p-8 max-w-md w-full backdrop-filter backdrop-blur-lg"
    >
      <div class="flex flex-col items-center mb-6">
        <img
          src="@/assets/logo.jpeg"
          alt="Logo"
          class="w-32 h-32 mx-auto animate-pulse mb-4 rounded-full shadow-lg object-cover"
        />
        <p class="text-lg text-center text-gray-300 dark:text-gray-200 mt-2">
          Tu portal para aprender química de forma divertida
        </p>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-300 dark:text-gray-200"
            >Usuario</label
          >
          <input
            type="text"
            id="username"
            v-model="username"
            class="placeholder:text-gray-400 mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-black/30 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            placeholder="Ingresa tu usuario"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-300 dark:text-gray-200"
            >Contraseña</label
          >
          <div class="relative">
            <input
              type="password"
              id="password"
              v-model="password"
              class="placeholder:text-gray-400 mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-black/30 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Ingresa tu contraseña"
              required
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 focus:outline-none"
            >
              <svg
                v-if="!showPassword"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M1 12s5-9 11-9 11 9 11 9-5 9-11 9-11-9-11-9z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M17.94 17.94a10.05 10.05 0 0 1-5.94 2.06c-5.52 0-10-4.48-10-10s4.48-10 10-10c2.21 0 4.23.73 5.88 1.96m2.06 2.06A10.05 10.05 0 0 1 22 12c0 .35-.02.69-.05 1.02m-2.06-2.06A10.05 10.05 0 0 1 12 22c-2.21 0-4.23-.73-5.88-1.96m2.06-2.06A10.05 10.05 0 0 1 2 12c0-.35.02-.69.05-1.02m2.06-2.06A10.05 10.05 0 0 1 12 .01c5.52-.01 10 .01 10 .01s4.48-.01 10 .01a10.05 10.05 0 0 1 .01-.
01m-2.06 2.06A10.05 10.05 0 0 1 12 2c-2.21 0-4.23.73-5.88 1.96m2.06 2.06A10.05 10.05 0 0 1 22 12c0 .35-.02.69-.05 1.02m-2.06-2.06A10.05 10.05 0 0 1 12 22c-5.52-.01-10-.01-10-.01s-4.48.01-10-.01a10.05 10.05 0 0 1 .01-.01z"
                />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            </button>
          </div>
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Iniciar sesión
        </button>

        <div class="mt-4 text-center">
          <p class="text-sm text-gray-300 dark:text-gray-200">
            ¿No tienes una cuenta?
            <router-link to="/register" class="text-blue-300 hover:underline">
              Regístrate
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import imagenfondo from '@/assets/login.gif'
import { useToast } from 'vuestic-ui'

const toast = useToast()
const authStore = useAuthStore()
const router = useRouter()
const username = ref('')
const password = ref('')
const errorResponse = ref('')
const showPassword = ref(false)
const isLoading = ref(false)

const handleSubmit = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + '/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })

    if (!response.ok) {
      throw new Error('Error en la autenticación')
    }
    isLoading.value = true
    const data = await response.json()
    if (data) {
      authStore.setUser(data)
      router.push({ name: 'periodica' })
    } else {
      errorResponse.value = 'Error en la autenticación'
      toast.init({
        title: 'Error',
        message: 'Error en la autenticación',
        color: 'danger',
      })
    }

    isLoading.value = false
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      errorResponse.value = error.message
    } else {
      errorResponse.value = 'Error desconocido'
    }
  }
}

onMounted(() => {
  window.addEventListener('resize', adjustElementsPosition)
})

function adjustElementsPosition() {
  const isMobile = window.innerWidth < 640
  const elements = document.querySelectorAll('.periodic-element') as NodeListOf<HTMLElement>

  if (isMobile) {
    elements.forEach((el) => {
      el.style.display = 'none'
    })
  } else {
    elements.forEach((el) => {
      el.style.display = 'flex'
    })
  }
}
</script>
