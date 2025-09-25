<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = ref([
  {
    title: 'Misiones Interactivas',
    description:
      'Desafíos gamificados que adaptan su dificultad según tu progreso, manteniendo el equilibrio entre reto y logro.',
    icon: '🕹️',
    stats: '+85% retención',
    color:
      'from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-300 dark:text-purple-300 text-purple-600',
  },
  {
    title: 'Laboratorio Virtual',
    description:
      'Simulaciones 3D de reacciones químicas con retroalimentación en tiempo real y guía inteligente.',
    icon: '🧪',
    stats: '24/7 disponible',
    color:
      'from-teal-500 to-emerald-600 dark:from-teal-700 dark:to-emerald-300 dark:text-teal-300 text-teal-600',
  },
  {
    title: 'Sistema de Logros',
    description:
      'Insignias y trofeos que validan tus competencias y motivan el dominio progresivo de conceptos.',
    icon: '🏆',
    stats: '92% engagement',
    color:
      'from-amber-500 to-orange-500 dark:from-amber-700 dark:to-orange-300 dark:text-amber-300 text-amber-600',
  },
  {
    title: 'Aprendizaje Social',
    description:
      'Ligas académicas y colaboraciones que fomentan el aprendizaje entre pares con propósito.',
    icon: '👥',
    stats: '3x más interacción',
    color:
      'from-rose-500 to-pink-600 dark:from-rose-700 dark:to-pink-300 dark:text-rose-300 text-rose-600',
  },
])

const featureSection = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!featureSection.value) return

  // Animación del encabezado
  gsap.from('.feature-header', {
    scrollTrigger: {
      trigger: featureSection.value,
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  })

  // Animación de las tarjetas
  gsap.utils.toArray('.feature-card').forEach((card: any, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.15,
      ease: 'back.out(1.4)',
    })

    // Efecto de levitación constante
    gsap.to(card, {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  })

  // Animación de los iconos
  gsap.utils.toArray('.feature-icon').forEach((icon: any) => {
    gsap.from(icon, {
      scrollTrigger: {
        trigger: icon,
        start: 'top 85%',
      },
      scale: 0,
      rotation: -15,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    })
  })
})
</script>

<template>
  <section ref="featureSection" class="py-24 bg-white dark:bg-gray-950 overflow-hidden">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Encabezado -->
      <div class="feature-header text-center mb-20">
        <span
          class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
        >
          Innovación Educativa
        </span>
        <h2
          class="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
        >
          Pedagogía
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500"
            >transformadora</span
          >
        </h2>
        <p class="mt-5 max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          Combinamos neurociencia cognitiva con mecánicas de juego para resultados excepcionales
        </p>
      </div>

      <!-- Grid de características -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="feature-card relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700/50"
        >
          <!-- Banda de color -->
          <div
            class="absolute top-0 left-0 right-0 h-1.5"
            :class="`bg-gradient-to-r ${feature.color}`"
          ></div>

          <div class="p-6">
            <!-- Icono -->
            <div
              class="feature-icon mb-5 w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
              :class="`bg-gradient-to-br ${feature.color} text-white`"
            >
              {{ feature.icon }}
            </div>

            <!-- Contenido -->
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-5">
              {{ feature.description }}
            </p>

            <!-- Estadística -->
            <div class="flex items-center text-sm font-medium" :class="feature.color">
              <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                ></path>
              </svg>
              {{ feature.stats }}
            </div>
          </div>
        </div>
      </div>

      <!-- Nota al pie -->
      <div class="mt-20 text-center">
        <p class="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
          <span class="font-semibold text-indigo-600 dark:text-indigo-400"
            >Basado en evidencia:</span
          >
          Nuestro método ha sido validado por estudios independientes que demuestran mejoras
          significativas en retención y desempeño académico.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feature-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 5px 10px -5px rgba(0, 0, 0, 0.04);
}

.dark .feature-card:hover {
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.25),
    0 5px 10px -5px rgba(0, 0, 0, 0.1);
}

.bg-gradient-to-r {
  background-size: 200% auto;
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.text-gradient-animate {
  animation: gradient-shift 3s ease infinite;
}
</style>
