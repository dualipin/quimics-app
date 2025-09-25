<script setup lang="ts">
import logo from '@/assets/logo/logo.webp'
import { ref } from 'vue'

const particles = ref(20)
</script>

<template>
  <div
    class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white dark:bg-neutral-900"
  >
    <!-- Floating Particles Background -->
    <div class="absolute inset-0 overflow-hidden">
      <template v-for="i in particles" :key="i">
        <div
          class="float__particle absolute rounded-full bg-blue-500/10 dark:bg-blue-400/10"
          :style="{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 20 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          }"
        ></div>
      </template>
    </div>

    <!-- Gradient Background Layers -->
    <div class="absolute inset-0">
      <div
        class="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-gray-100 dark:from-neutral-900 dark:via-blue-900/10 dark:to-black"
      ></div>
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-white/70 to-transparent dark:via-neutral-900/70"
      ></div>
    </div>

    <div class="relative z-10 mx-auto -mt-16 flex max-w-3xl flex-col">
      <!-- HEADER with subtle animation -->
      <header class="animate-fade-in-down flex justify-center py-4">
        <nav class="px-4 sm:px-6 lg:px-8">
          <RouterLink
            class="text-xl font-semibold text-gray-900 transition-transform duration-300 hover:scale-105 sm:text-3xl dark:text-white"
            to="/"
            aria-label="Brand"
          >
            <img class="h-16 sm:h-20" :src="logo" alt="Logo" />
          </RouterLink>
        </nav>
      </header>

      <!-- MAIN CONTENT with animations -->
      <main
        id="content"
        class="flex flex-grow flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <!-- 404 Text with glitch effect -->
        <div class="relative">
          <h1
            class="glitch animate-fade-in-up text-7xl font-bold text-gray-800 opacity-0 sm:text-9xl dark:text-white"
            data-text="404"
          >
            404
          </h1>
          <div
            class="animate-fade-in-up absolute inset-0 flex items-center justify-center opacity-0"
            style="animation-delay: 0.3s"
          >
            <div
              class="absolute h-full w-full animate-pulse rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-xl dark:from-blue-400/20 dark:to-purple-400/20"
              style="animation-duration: 3s"
            ></div>
          </div>
        </div>

        <!-- Message with typing animation -->
        <p
          class="animate-fade-in-up mt-3 max-w-md text-center text-lg text-gray-600 opacity-0 sm:text-xl dark:text-neutral-400"
          style="animation-delay: 0.6s"
        >
          Lo sentimos, la página que buscas no existe.
        </p>

        <!-- Button with hover animation -->
        <div
          class="animate-fade-in-up mt-8 flex flex-col gap-2 opacity-0 sm:flex-row sm:gap-3"
          style="animation-delay: 0.9s"
        >
          <RouterLink
            class="group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:from-blue-700 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-500/30 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none focus-visible:ring-2 dark:focus:ring-offset-neutral-900"
            to="/"
            aria-label="Regresar a la página de inicio"
          >
            <svg
              class="h-5 w-5 transition-transform group-hover:-translate-x-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Regresar a la página de inicio
          </RouterLink>
        </div>
      </main>

      <!-- FOOTER with fade-in animation -->
      <footer class="animate-fade-in-up py-5 text-center opacity-0" style="animation-delay: 1.2s">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p class="text-sm text-gray-500 dark:text-neutral-500">
            © Studying Chemistry. Todos los derechos reservados.
            {{ new Date().getFullYear() }}.
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<style>
/* Animations */
@keyframes float-particle {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) translateX(10px) rotate(5deg);
  }
  100% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Glitch effect */
.glitch {
  position: relative;
}
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}
.glitch::before {
  color: #0ea5e9;
  z-index: -1;
  animation: glitch-effect 3s infinite;
}
.glitch::after {
  color: #a855f7;
  z-index: -2;
  animation: glitch-effect 2s infinite reverse;
}

@keyframes glitch-effect {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-3px, 3px);
  }
  40% {
    transform: translate(-3px, -3px);
  }
  60% {
    transform: translate(3px, 3px);
  }
  80% {
    transform: translate(3px, -3px);
  }
  100% {
    transform: translate(0);
  }
}

/* Apply animations */
.float__particle {
  animation-name: float-particle;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.animate-fade-in-up {
  animation-name: fade-in-up;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1);
}

.animate-fade-in-down {
  animation-name: fade-in-down;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1);
}
</style>
