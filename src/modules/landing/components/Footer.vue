<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logo from '@/assets/logo/logo.webp'

gsap.registerPlugin(ScrollTrigger)

const footerLinks = ref([
  {
    title: 'Recursos',
    links: [
      { name: 'Linea del Tiempo', href: 'timeline' },
      { name: 'Historia de la Química', href: 'history' },
      { name: 'Historia de la Tabla Periódica', href: 'periodic-table-review' },
    ],
  },
])
</script>

<template>
  <footer class="bg-black pt-16 pb-8 text-gray-300">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
        <!-- Logo y descripción -->
        <div class="lg:col-span-2">
          <div class="mb-6 flex items-center">
            <span class="mr-2 text-2xl">
              <img :src="logo" alt="ChemPlay Logo" class="size-20 rounded-full" />
            </span>
            <span class="text-2xl font-bold text-white"> Quimics App </span>
          </div>
          <p class="mb-6 text-gray-400">
            Transformando el aprendizaje de química a través de la gamificación y tecnología
            innovadora.
          </p>
        </div>

        <!-- Links de navegación -->
        <div v-for="(column, index) in footerLinks" :key="index" class="footer-column">
          <h3 class="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
            {{ column.title }}
          </h3>
          <ul class="space-y-3">
            <li v-for="link in column.links" :key="link.name">
              <RouterLink
                :to="{ name: link.href }"
                class="text-gray-400 transition-colors hover:text-white"
              >
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="mt-12 border-t border-gray-800 pt-8">
        <div class="flex flex-col items-center justify-between md:flex-row">
          <p class="text-sm text-gray-400">
            © {{ new Date().getFullYear() }} Quimics App. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-column {
  opacity: 0;
  transform: translateY(20px);
}

.footer-column:nth-child(1) {
  animation: fadeInUp 0.6s ease-out 0.1s forwards;
}
.footer-column:nth-child(2) {
  animation: fadeInUp 0.6s ease-out 0.2s forwards;
}
.footer-column:nth-child(3) {
  animation: fadeInUp 0.6s ease-out 0.3s forwards;
}
.footer-column:nth-child(4) {
  animation: fadeInUp 0.6s ease-out 0.4s forwards;
}

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

input::placeholder {
  color: #9ca3af;
  opacity: 1;
}
</style>
