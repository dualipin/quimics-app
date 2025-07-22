<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logo from '@/assets/logo/logo.webp'

gsap.registerPlugin(ScrollTrigger)

const footerLinks = ref([
  {
    title: 'Producto',
    links: [
      // { name: 'Características', href: '#features' },
      { name: 'Cómo funciona', href: 'how-it-works' },
      // { name: 'Precios', href: '#pricing' },
      // { name: 'Demo', href: '#demo' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { name: 'Linea del Tiempo', href: 'timeline' },
      // { name: 'Blog Educativo', href: '#' },
      // { name: 'Guías de Química', href: '#' },
      // { name: 'Webinars', href: '#' },
      // { name: 'Centro de Ayuda', href: '#' },
    ],
  },
  {
    title: 'Compañía',
    links: [
      // { name: 'Sobre Nosotros', href: '#' },
      // { name: 'Equipo', href: '#' },
      // { name: 'Socios', href: '#' },
      // { name: 'Contacto', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      // { name: 'Política de Privacidad', href: '#' },
      // { name: 'Términos de Servicio', href: '#' },
      // { name: 'Cookies', href: '#' },
      // { name: 'Aviso Legal', href: '#' },
    ],
  },
])

const socialLinks = ref([
  { name: 'Twitter', icon: '🐦', href: '#' },
  { name: 'LinkedIn', icon: '🔗', href: '#' },
  { name: 'Instagram', icon: '📷', href: '#' },
  { name: 'YouTube', icon: '▶️', href: '#' },
])

const email = ref('')
const emailError = ref(false)

const validateEmail = () => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  emailError.value = !re.test(email.value)
}

const submitNewsletter = () => {
  validateEmail()
  if (!emailError.value && email.value) {
    // Lógica para enviar el newsletter
    console.log('Email submitted:', email.value)
    email.value = ''
  }
}
</script>

<template>
  <footer class="bg-black text-gray-300 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        <!-- Logo y descripción -->
        <div class="lg:col-span-2">
          <div class="flex items-center mb-6">
            <span class="text-2xl mr-2">
              <img :src="logo" alt="ChemPlay Logo" class="size-20 rounded-full" />
            </span>
            <span class="text-2xl font-bold text-white">Studying Chemistry</span>
          </div>
          <p class="text-gray-400 mb-6">
            Transformando el aprendizaje de química a través de la gamificación y tecnología
            innovadora.
          </p>

          <!-- Newsletter -->
          <div class="mb-8">
            <!-- <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Suscríbete a nuestro newsletter
            </h3>
            <div class="flex">
              <input
                v-model="email"
                @blur="validateEmail"
                type="email"
                placeholder="Tu email"
                class="px-4 py-2 w-full rounded-l-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                :class="{ 'border-red-500': emailError }"
              />
              <button
                @click="submitNewsletter"
                class="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition-colors"
              >
                Enviar
              </button>
            </div>
            <p v-if="emailError" class="mt-1 text-sm text-red-400">
              Por favor ingresa un email válido
            </p> -->
          </div>

          <!-- Redes sociales -->
          <div>
            <!-- <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Síguenos</h3>
            <div class="flex space-x-4">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.href"
                class="text-gray-400 hover:text-white transition-colors"
              >
                <span class="sr-only">{{ social.name }}</span>
                <span class="text-xl">{{ social.icon }}</span>
              </a>
            </div> -->
          </div>
        </div>

        <!-- Links de navegación -->
        <div v-for="(column, index) in footerLinks" :key="index" class="footer-column">
          <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            {{ column.title }}
          </h3>
          <ul class="space-y-3">
            <li v-for="link in column.links" :key="link.name">
              <RouterLink
                :to="{ name: link.href }"
                class="text-gray-400 hover:text-white transition-colors"
              >
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-800 mt-12 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">
            © {{ new Date().getFullYear() }} Studying Chemistry. Todos los derechos reservados.
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-white text-sm"> Política de Privacidad </a>
            <a href="#" class="text-gray-400 hover:text-white text-sm"> Términos de Servicio </a>
            <a href="#" class="text-gray-400 hover:text-white text-sm">
              Configuración de Cookies
            </a>
          </div>
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
