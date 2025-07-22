<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-black"
  >
    <!-- Hero Section -->
    <header class="relative overflow-hidden animate-fade-in-down">
      <div
        class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Y2EzY2MiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMjEgMy4zQzExLjYgMy43IDQuMSAxMS4yIDMuNyAyMC42Yy0uNCA5LjQgNi4xIDE3LjEgMTUuMSAxOC4yIDkgMS4xIDE3LjItMy45IDIwLjgtMTEuOCAzLjYtNy45IDEuOC0xNy41LTMuNy0yNC4zLTUuNS02LjgtMTQuMi05LjQtMjIuMi03Ljl6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10 dark:opacity-5"
      ></div>
      <div class="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 text-center relative z-10">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          <span class="block">Los Gigantes de</span>
          <span
            class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 mt-3"
            >la Química</span
          >
        </h1>
        <p class="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Descubre a las mentes brillantes que dieron forma al mundo moderno a través de sus
          descubrimientos químicos
        </p>
      </div>
    </header>

    <!-- Timeline Section -->
    <section class="relative py-20">
      <div
        class="absolute left-1/2 top-28 h-[calc(100%-25px)] w-0.5 bg-gradient-to-b from-blue-500 to-teal-500 -translate-x-1/2 md:block"
      ></div>

      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500"
            >Línea de Tiempo</span
          >
          Histórica
        </h2>

        <!-- Antoine Lavoisier -->
        <div class="timeline-item mb-20 md:flex md:items-center md:justify-between">
          <div class="md:w-5/12 md:pr-10 md:text-right mb-8 md:mb-0">
            <div
              class="inline-block bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Antoine Lavoisier</h3>
              <p class="text-blue-600 dark:text-blue-400 mb-2">1743-1794</p>
              <p class="text-gray-600 dark:text-gray-300">
                Conocido como el "Padre de la Química Moderna", estableció la ley de conservación de
                la masa y ayudó a reformar la nomenclatura química.
              </p>
              <div class="mt-4">
                <span
                  class="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                >
                  Ley de Conservación de la Masa
                </span>
              </div>
            </div>
          </div>
          <div class="md:block md:w-2/12 flex justify-center">
            <div
              class="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 border-4 border-white dark:border-gray-800 flex items-center justify-center text-white text-3xl"
            >
              🔬
            </div>
          </div>
          <div class="md:w-5/12 md:pl-10">
            <div
              class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <img
                :src="Lavoisier"
                alt="Antoine Lavoisier"
                class="w-full h-64 object-cover rounded-lg mb-4"
              />
              <blockquote class="text-gray-600 dark:text-gray-300 italic">
                "Nada se crea, nada se pierde, todo se transforma"
              </blockquote>
            </div>
          </div>
        </div>

        <!-- Dmitri Mendeleev -->
        <div
          class="timeline-item mb-20 md:flex md:flex-row-reverse md:items-center md:justify-between"
        >
          <div class="md:w-5/12 md:pl-10 mb-8 md:mb-0">
            <div
              class="inline-block bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Dmitri Mendeleev</h3>
              <p class="text-blue-600 dark:text-blue-400 mb-2">1834-1907</p>
              <p class="text-gray-600 dark:text-gray-300">
                Creador de la Tabla Periódica de los Elementos, predijo las propiedades de elementos
                aún no descubiertos.
              </p>
              <div class="mt-4">
                <span
                  class="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                >
                  Tabla Periódica
                </span>
              </div>
            </div>
          </div>
          <div class="md:block md:w-2/12 flex justify-center">
            <div
              class="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 border-4 border-white dark:border-gray-800 flex items-center justify-center text-white text-3xl"
            >
              ⚗️
            </div>
          </div>
          <div class="md:w-5/12 md:pr-10">
            <div
              class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <img
                :src="Mendeleev"
                alt="Dmitri Mendeleev"
                class="w-full h-64 object-cover rounded-lg mb-4 object-top"
              />
              <blockquote class="text-gray-600 dark:text-gray-300 italic">
                "Las propiedades de los elementos son función periódica de sus pesos atómicos"
              </blockquote>
            </div>
          </div>
        </div>

        <!-- Marie Curie -->
        <div class="timeline-item mb-20 md:flex md:items-center md:justify-between">
          <div class="md:w-5/12 md:pr-10 md:text-right mb-8 md:mb-0">
            <div
              class="inline-block bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Marie Curie</h3>
              <p class="text-blue-600 dark:text-blue-400 mb-2">1867-1934</p>
              <p class="text-gray-600 dark:text-gray-300">
                Pionera en el estudio de la radioactividad, primera mujer en ganar un Premio Nobel y
                única en ganarlo en dos categorías diferentes.
              </p>
              <div class="mt-4">
                <span
                  class="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                >
                  Radioactividad
                </span>
              </div>
            </div>
          </div>
          <div class="md:block md:w-2/12 flex justify-center">
            <div
              class="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 border-4 border-white dark:border-gray-800 flex items-center justify-center text-white text-3xl"
            >
              ☢️
            </div>
          </div>
          <div class="md:w-5/12 md:pl-10">
            <div
              class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Marie_Curie_c._1920s.jpg"
                alt="Marie Curie"
                class="w-full h-64 object-cover rounded-lg mb-4"
              />
              <blockquote class="text-gray-600 dark:text-gray-300 italic">
                "Nada en la vida debe ser temido, solamente comprendido"
              </blockquote>
            </div>
          </div>
        </div>

        <!-- Linus Pauling -->
        <div
          class="timeline-item mb-20 md:flex md:flex-row-reverse md:items-center md:justify-between"
        >
          <div class="md:w-5/12 md:pl-10 mb-8 md:mb-0">
            <div
              class="inline-block bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Linus Pauling</h3>
              <p class="text-blue-600 dark:text-blue-400 mb-2">1901-1994</p>
              <p class="text-gray-600 dark:text-gray-300">
                Premio Nobel de Química y de la Paz, revolucionó el entendimiento de los enlaces
                químicos y la estructura molecular.
              </p>
              <div class="mt-4">
                <span
                  class="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                >
                  Enlace Químico
                </span>
              </div>
            </div>
          </div>
          <div class="md:block md:w-2/12 flex justify-center">
            <div
              class="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 border-4 border-white dark:border-gray-800 flex items-center justify-center text-white text-3xl"
            >
              🧪
            </div>
          </div>
          <div class="md:w-5/12 md:pr-10">
            <div
              class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <img
                :src="LinusPauling"
                alt="Linus Pauling"
                class="w-full h-64 object-cover rounded-lg mb-4"
              />
              <blockquote class="text-gray-600 dark:text-gray-300 italic">
                "La mejor manera de tener una buena idea es tener muchas ideas"
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section
      class="py-20 bg-gradient-to-t from-blue-50 to-teal-50 dark:from-gray-800 dark:to-black"
    >
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
          Más
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500"
            >Contribuyentes</span
          >
          Notables
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Robert Boyle -->
          <div
            class="chemist-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <img :src="RobertBoyle" alt="Robert Boyle" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Robert Boyle</h3>
              <p class="text-blue-600 dark:text-blue-400 mb-3">1627-1691</p>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Considerado el primer químico moderno, formuló la ley de Boyle sobre el
                comportamiento de los gases.
              </p>
              <span
                class="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
              >
                Ley de Boyle
              </span>
            </div>
          </div>

          <!-- Rosalind Franklin -->
          <div
            class="chemist-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <img :src="RosalindFranklin" alt="Rosalind Franklin" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Rosalind Franklin
              </h3>
              <p class="text-blue-600 dark:text-blue-400 mb-3">1920-1958</p>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Sus trabajos con difracción de rayos X fueron fundamentales para el descubrimiento
                de la estructura del ADN.
              </p>
              <span
                class="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
              >
                Difracción de Rayos X
              </span>
            </div>
          </div>

          <!-- Fritz Haber -->
          <div
            class="chemist-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <img :src="FritzHaber" alt="Fritz Haber" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Fritz Haber</h3>
              <p class="text-blue-600 dark:text-blue-400 mb-3">1868-1934</p>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Desarrolló el proceso Haber-Bosch para la síntesis de amoníaco, revolucionando la
                producción de fertilizantes.
              </p>
              <span
                class="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
              >
                Proceso Haber
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          ¿Inspirado por estos grandes científicos?
        </h2>
        <p class="text-xl mb-8 max-w-3xl mx-auto">
          Descubre más sobre la historia de la química y cómo sus descubrimientos dieron forma al
          mundo moderno.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button
            @click="$router.push({ name: 'auth.login' })"
            class="px-8 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition"
          >
            Explorar más
          </button>
          <!-- <button
            class="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition"
          >
            Ver línea de tiempo
          </button> -->
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Lavoisier from '@/assets/actors/Lavoisier.jpg'
import Mendeleev from '@/assets/actors/Mendeleev.jpeg'
import LinusPauling from '@/assets/actors/LinusPauling.jpg'
import RobertBoyle from '@/assets/actors/RobertBoyle.jpeg'
import RosalindFranklin from '@/assets/actors/RosalindFranklin.webp'
import FritzHaber from '@/assets/actors/FritzHaber.jpg'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  // Animación para las tarjetas de la línea de tiempo
  gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    const element = item as HTMLElement
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: i * 0.2,
      ease: 'back.out(1)',
    })
  })

  gsap.utils.toArray('.chemist-card').forEach((card, i) => {
    const element = card as HTMLElement
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        // trigger: element,
        start: 'top 90%',
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: i * 0.1,
      ease: 'power2.out',
    })
  })
})
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.floating-icon {
  animation: float 4s ease-in-out infinite;
}
</style>
