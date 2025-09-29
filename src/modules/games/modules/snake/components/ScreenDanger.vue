<template>
  <div
    v-if="isMobile"
    class="fixed inset-0 z-[9999] h-dvh w-dvw overflow-hidden bg-gray-900/95 backdrop-blur-sm"
    @touchmove.prevent
  >
    <div class="flex h-full w-full flex-col items-center justify-center p-6 text-center">
      <!-- Icono de advertencia animado -->
      <div class="mb-6 animate-bounce text-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mx-auto h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <!-- Texto de advertencia -->
      <h2 class="mb-3 text-2xl font-bold text-white md:text-3xl">
        <span class="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          Pantalla no compatible
        </span>
      </h2>

      <p class="mb-4 max-w-md text-lg text-gray-300">
        Este juego está diseñado para pantallas más grandes para una experiencia óptima.
      </p>

      <div
        class="mb-6 h-px w-32 bg-gradient-to-r from-transparent via-gray-500 to-transparent"
      ></div>

      <p class="text-sm text-gray-400">
        Por favor, utiliza una tablet o computadora con teclado para disfrutar del juego.
      </p>

      <!-- Botón opcional para cerrar (si es necesario) -->
      <button
        class="mt-8 rounded-lg bg-gray-800 px-6 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-700"
        @click="handleClose"
      >
        Entendido
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const isMobile = ref(false)

// Detectar dispositivo móvil
onMounted(() => {
  const checkIfMobile = () => {
    isMobile.value = window.innerWidth < 768 // Cambia este valor según necesites
    if (isMobile.value) {
      document.body.style.overflow = 'hidden' // Bloquear scroll en móviles
    } else {
      document.body.style.overflow = '' // Restaurar scroll en escritorio
    }
  }

  checkIfMobile()
  window.addEventListener('resize', checkIfMobile)

  //   // Bloquear scroll cuando el mensaje está visible
  //   if (isMobile.value) {
  //     document.body.style.overflow = 'hidden'
  //   } else {
  //     document.body.style.overflow = ''
  //   }

  // Limpiar al desmontar
  return () => {
    window.removeEventListener('resize', checkIfMobile)
    document.body.style.overflow = ''
  }
})

const router = useRouter()

const handleClose = () => {
  isMobile.value = false
  document.body.style.overflow = ''
  router.push({ name: 'games' })
}
</script>

<style scoped>
/* Bloqueo del scroll en dispositivos móviles */

/* Animación personalizada para el icono */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.animate-bounce {
  animation: bounce 1.5s infinite;
}
</style>
