<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-black"
  >
    <!-- Hero Section -->
    <header class="animate-fade-in-down relative overflow-hidden">
      <div
        class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Y2EzY2MiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMjEgMy4zQzExLjYgMy43IDQuMSAxMS4yIDMuNyAyMC42Yy0uNCA5LjQgNi4xIDE3LjEgMTUuMSAxOC4yIDkgMS4xIDE3LjItMy45IDIwLjgtMTEuOCAzLjYtNy45IDEuOC0xNy41LTMuNy0yNC4zLTUuNS02LjgtMTQuMi05LjQtMjIuMi03Ljl6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10 dark:opacity-5"
      ></div>
      <div class="relative z-10 mx-auto max-w-7xl px-6 py-24 text-center sm:py-32 lg:px-8">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
          <span class="block">Los Gigantes de</span>
          <span
            class="mt-3 block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
            >la Química</span
          >
        </h1>
        <p class="mx-auto mt-6 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
          Descubre a las mentes brillantes que dieron forma al mundo moderno a través de sus
          descubrimientos químicos
        </p>
      </div>
    </header>

    <!-- Timeline Section -->
    <section class="relative py-20">
      <div
        class="absolute top-28 left-1/2 h-[calc(100%-25px)] w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-500 to-teal-500 md:block"
      ></div>

      <div class="mx-auto max-w-7xl px-6">
        <h2 class="mb-16 text-center text-3xl font-bold text-gray-900 dark:text-white">
          <span class="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
            >Línea de Tiempo</span
          >
          Histórica
        </h2>

        <!-- Antoine Lavoisier -->
        <div class="timeline-item mb-20 md:flex md:items-center md:justify-between">
          <div class="mb-8 md:mb-0 md:w-5/12 md:pr-10 md:text-right">
            <div
              class="inline-block rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Antoine Lavoisier</h3>
              <p class="mb-2 text-blue-600 dark:text-blue-400">1743-1794</p>
              <p class="text-gray-600 dark:text-gray-300">
                Conocido como el "Padre de la Química Moderna", estableció la ley de conservación de
                la masa y ayudó a reformar la nomenclatura química.
              </p>
              <div class="mt-4">
                <span
                  class="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                >
                  Ley de Conservación de la Masa
                </span>
              </div>
            </div>
          </div>
          <div class="flex justify-center md:block md:w-2/12">
            <div
              class="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-teal-500 text-3xl text-white dark:border-gray-800"
            >
              🔬
            </div>
          </div>
          <div class="md:w-5/12 md:pl-10">
            <div
              @mouseenter="playElementAudio(1)"
              @click="playElementAudio(1)"
              @mouseleave="stopAudio()"
              class="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <img
                :src="Lavoisier"
                alt="Antoine Lavoisier"
                class="mb-4 h-64 w-full rounded-lg object-cover"
              />
              <blockquote class="text-gray-600 italic dark:text-gray-300">
                "Nada se crea, nada se pierde, todo se transforma"
              </blockquote>
            </div>
          </div>
        </div>

        <!-- Dmitri Mendeleev -->
        <div
          class="timeline-item mb-20 md:flex md:flex-row-reverse md:items-center md:justify-between"
        >
          <div class="mb-8 md:mb-0 md:w-5/12 md:pl-10">
            <div
              class="inline-block rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Dmitri Mendeleev</h3>
              <p class="mb-2 text-blue-600 dark:text-blue-400">1834-1907</p>
              <p class="text-gray-600 dark:text-gray-300">
                Creador de la Tabla Periódica de los Elementos, predijo las propiedades de elementos
                aún no descubiertos.
              </p>
              <div class="mt-4">
                <span
                  class="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                >
                  Tabla Periódica
                </span>
              </div>
            </div>
          </div>
          <div class="flex justify-center md:block md:w-2/12">
            <div
              class="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-teal-500 text-3xl text-white dark:border-gray-800"
            >
              ⚗️
            </div>
          </div>
          <div class="md:w-5/12 md:pr-10">
            <div
              @mouseenter="playElementAudio(2)"
              @click="playElementAudio(2)"
              @mouseleave="stopAudio()"
              class="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <img
                :src="Mendeleev"
                alt="Dmitri Mendeleev"
                class="mb-4 h-64 w-full rounded-lg object-cover object-top"
              />
              <blockquote class="text-gray-600 italic dark:text-gray-300">
                "Las propiedades de los elementos son función periódica de sus pesos atómicos"
              </blockquote>
            </div>
          </div>
        </div>

        <!-- Marie Curie -->
        <div class="timeline-item mb-20 md:flex md:items-center md:justify-between">
          <div class="mb-8 md:mb-0 md:w-5/12 md:pr-10 md:text-right">
            <div
              class="inline-block rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Marie Curie</h3>
              <p class="mb-2 text-blue-600 dark:text-blue-400">1867-1934</p>
              <p class="text-gray-600 dark:text-gray-300">
                Pionera en el estudio de la radioactividad, primera mujer en ganar un Premio Nobel y
                única en ganarlo en dos categorías diferentes.
              </p>
              <div class="mt-4">
                <span
                  class="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                >
                  Radioactividad
                </span>
              </div>
            </div>
          </div>
          <div class="flex justify-center md:block md:w-2/12">
            <div
              class="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-teal-500 text-3xl text-white dark:border-gray-800"
            >
              ☢️
            </div>
          </div>
          <div class="md:w-5/12 md:pl-10">
            <div
              @mouseenter="playElementAudio(3)"
              @click="playElementAudio(3)"
              @mouseleave="stopAudio()"
              class="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Marie_Curie_c._1920s.jpg"
                alt="Marie Curie"
                class="mb-4 h-64 w-full rounded-lg object-cover"
              />
              <blockquote class="text-gray-600 italic dark:text-gray-300">
                "Nada en la vida debe ser temido, solamente comprendido"
              </blockquote>
            </div>
          </div>
        </div>

        <!-- Linus Pauling -->
        <div
          class="timeline-item mb-20 md:flex md:flex-row-reverse md:items-center md:justify-between"
        >
          <div class="mb-8 md:mb-0 md:w-5/12 md:pl-10">
            <div
              class="inline-block rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Linus Pauling</h3>
              <p class="mb-2 text-blue-600 dark:text-blue-400">1901-1994</p>
              <p class="text-gray-600 dark:text-gray-300">
                Premio Nobel de Química y de la Paz, revolucionó el entendimiento de los enlaces
                químicos y la estructura molecular.
              </p>
              <div class="mt-4">
                <span
                  class="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                >
                  Enlace Químico
                </span>
              </div>
            </div>
          </div>
          <div class="flex justify-center md:block md:w-2/12">
            <div
              class="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-teal-500 text-3xl text-white dark:border-gray-800"
            >
              🧪
            </div>
          </div>
          <div class="md:w-5/12 md:pr-10">
            <div
              @mouseenter="playElementAudio(4)"
              @click="playElementAudio(4)"
              @mouseleave="stopAudio()"
              class="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <img
                :src="LinusPauling"
                alt="Linus Pauling"
                class="mb-4 h-64 w-full rounded-lg object-cover"
              />
              <blockquote class="text-gray-600 italic dark:text-gray-300">
                "La mejor manera de tener una buena idea es tener muchas ideas"
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section
      class="bg-gradient-to-t from-blue-50 to-teal-50 py-20 dark:from-gray-800 dark:to-black"
    >
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="mb-16 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Más
          <span class="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
            >Contribuyentes</span
          >
          Notables
        </h2>

        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Robert Boyle -->
          <div
            class="chemist-card overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
          >
            <img :src="RobertBoyle" alt="Robert Boyle" class="h-48 w-full object-cover" />
            <div class="p-6">
              <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Robert Boyle</h3>
              <p class="mb-3 text-blue-600 dark:text-blue-400">1627-1691</p>
              <p class="mb-4 text-gray-600 dark:text-gray-300">
                Considerado el primer químico moderno, formuló la ley de Boyle sobre el
                comportamiento de los gases.
              </p>
              <span
                class="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
              >
                Ley de Boyle
              </span>
            </div>
          </div>

          <!-- Rosalind Franklin -->
          <div
            class="chemist-card overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
          >
            <img :src="RosalindFranklin" alt="Rosalind Franklin" class="h-48 w-full object-cover" />
            <div class="p-6">
              <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Rosalind Franklin
              </h3>
              <p class="mb-3 text-blue-600 dark:text-blue-400">1920-1958</p>
              <p class="mb-4 text-gray-600 dark:text-gray-300">
                Sus trabajos con difracción de rayos X fueron fundamentales para el descubrimiento
                de la estructura del ADN.
              </p>
              <span
                class="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
              >
                Difracción de Rayos X
              </span>
            </div>
          </div>

          <!-- Fritz Haber -->
          <div
            class="chemist-card overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
          >
            <img :src="FritzHaber" alt="Fritz Haber" class="h-48 w-full object-cover" />
            <div class="p-6">
              <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Fritz Haber</h3>
              <p class="mb-3 text-blue-600 dark:text-blue-400">1868-1934</p>
              <p class="mb-4 text-gray-600 dark:text-gray-300">
                Desarrolló el proceso Haber-Bosch para la síntesis de amoníaco, revolucionando la
                producción de fertilizantes.
              </p>
              <span
                class="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
              >
                Proceso Haber
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="bg-gradient-to-r from-blue-600 to-teal-500 py-20 text-white">
      <div class="mx-auto max-w-7xl px-6 text-center">
        <h2 class="mb-6 text-3xl font-bold md:text-4xl">
          ¿Inspirado por estos grandes científicos?
        </h2>
        <p class="mx-auto mb-8 max-w-3xl text-xl">
          Descubre más sobre la historia de la química y cómo sus descubrimientos dieron forma al
          mundo moderno.
        </p>
        <div class="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            @click="$router.push({ name: 'auth.login' })"
            class="rounded-full bg-white px-8 py-3 font-bold text-blue-600 transition hover:bg-gray-100"
          >
            Explorar más
          </button>
        </div>
      </div>
    </section>
  </div>

  <audio ref="audioRef" />
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
import { useLandingAudio } from '../composables/useLandingAudio'

gsap.registerPlugin(ScrollTrigger)

const { audioRef, playElementAudio, stopAudio } = useLandingAudio('timeline')

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
