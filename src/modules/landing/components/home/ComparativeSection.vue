<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const comparisonItems = ref<
  {
    feature: string
    traditional: { value: number; unit: string }
    ourMethod: { value: number; unit: string }
    icon: 'brain' | 'clock' | 'chart' | 'smile'
    description: string
  }[]
>([
  {
    feature: 'Retención del conocimiento',
    traditional: { value: 28, unit: '%' },
    ourMethod: { value: 89, unit: '%' },
    icon: 'brain',
    description: 'Nuestro sistema utiliza repetición espaciada y contextos memorables',
  },
  {
    feature: 'Tiempo de estudio activo',
    traditional: { value: 18, unit: 'min/día' },
    ourMethod: { value: 52, unit: 'min/día' },
    icon: 'clock',
    description: 'Los desafíos gamificados mantienen la atención por más tiempo',
  },
  {
    feature: 'Resultados académicos',
    traditional: { value: 6.2, unit: '/10' },
    ourMethod: { value: 8.7, unit: '/10' },
    icon: 'chart',
    description: 'Mejores calificaciones en exámenes estandarizados',
  },
  {
    feature: 'Satisfacción estudiantil',
    traditional: { value: 58, unit: '%' },
    ourMethod: { value: 94, unit: '%' },
    icon: 'smile',
    description: 'Los estudiantes reportan mayor disfrute del aprendizaje',
  },
])

const icons = {
  brain: '🧠',
  clock: '⏱️',
  chart: '📈',
  smile: '😊',
}

const comparisonSection = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!comparisonSection.value) return

  // Animación del encabezado
  gsap.from('.section-header', {
    scrollTrigger: {
      trigger: comparisonSection.value,
      start: 'top 80%',
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  })

  // Animación de las tarjetas
  gsap.utils.toArray('.comparison-card').forEach((card: any, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.15,
      ease: 'back.out(1.2)',
    })
  })

  // Animación de las barras de progreso
  gsap.utils.toArray('.progress-bar').forEach((bar: any) => {
    gsap.from(bar, {
      scrollTrigger: {
        trigger: bar,
        start: 'top 80%',
      },
      scaleX: 0,
      duration: 1.5,
      ease: 'expo.out',
      transformOrigin: 'left center',
    })
  })
})
</script>

<template>
  <section ref="comparisonSection" class="py-24 bg-white dark:bg-gray-950">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Encabezado -->
      <div class="section-header text-center mb-16">
        <span
          class="text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase"
        >
          Evidencia Comparativa
        </span>
        <h2
          class="mt-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
        >
          Resultados que
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500"
            >hablan por sí solos</span
          >
        </h2>
        <p class="mt-5 max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          Datos recopilados de nuestro programa piloto con 1,200 estudiantes
        </p>
      </div>

      <!-- Tarjetas de comparación -->
      <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div
          v-for="(item, index) in comparisonItems"
          :key="index"
          class="comparison-card bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl hover:-translate-y-1"
        >
          <div class="p-6">
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-indigo-50 dark:bg-gray-700 p-3 rounded-lg">
                <span class="text-2xl">{{ icons[item.icon] }}</span>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                  {{ item.feature }}
                </h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {{ item.description }}
                </p>
              </div>
            </div>

            <div class="mt-6 space-y-4">
              <!-- Método tradicional -->
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="font-medium text-gray-500 dark:text-gray-400">Tradicional</span>
                  <span class="font-bold"
                    >{{ item.traditional.value }}{{ item.traditional.unit }}</span
                  >
                </div>
                <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    class="progress-bar h-full bg-gray-400 dark:bg-gray-600"
                    :style="{ '--width': `${item.traditional.value}%` }"
                    :data-value="item.traditional.value"
                  ></div>
                </div>
              </div>

              <!-- Nuestro método -->
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="font-medium text-indigo-600 dark:text-indigo-400">Gamificado</span>
                  <span class="font-bold text-indigo-600 dark:text-indigo-400">
                    {{ item.ourMethod.value }}{{ item.ourMethod.unit }}
                  </span>
                </div>
                <div class="h-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full overflow-hidden">
                  <div
                    class="progress-bar h-full bg-gradient-to-r from-indigo-600 to-teal-500"
                    :style="{ '--width': `${item.ourMethod.value}%` }"
                    :data-value="item.ourMethod.value"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Nota estadística -->
      <div
        class="mt-16 text-center max-w-3xl mx-auto px-4 py-5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
      >
        <p class="text-sm text-gray-500 dark:text-gray-400">
          <span class="font-semibold text-indigo-600 dark:text-indigo-400">Nota:</span> Los datos
          reflejan promedios de 6 estudios independientes realizados entre 2022-2023 con estudiantes
          de secundaria y universidad.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.progress-bar {
  width: calc(var(--width) * 1%);
}

.bg-gradient-to-r {
  background-size: 200% auto;
}

.hover\:shadow-xl:hover {
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.dark .hover\:shadow-xl:hover {
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.25),
    0 10px 10px -5px rgba(0, 0, 0, 0.1);
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

.bg-gradient-to-r {
  animation: gradient-shift 3s ease infinite;
}
</style>
