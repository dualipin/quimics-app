<template>
  <section id="timeline" class="py-20">
    <motion.div
      :initial="{ opacity: 0, y: 50 }"
      :whileInView="{ opacity: 1, y: 0, transition: { duration: 0.8 } }"
      :inViewOptions="{ once: true }"
      class="mx-auto max-w-6xl px-4"
    >
      <h2
        class="mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-center text-3xl font-bold text-transparent md:text-4xl"
      >
        Línea de Tiempo Histórica
      </h2>
    </motion.div>

    <div class="relative overflow-hidden">
      <!-- Línea central -->
      <div
        class="absolute left-1/2 h-full w-1 -translate-x-1/2 transform bg-gradient-to-b from-cyan-500 to-blue-600"
      ></div>

      <!-- Eventos -->
      <motion.div
        class="relative z-1 mb-12 w-full"
        v-for="(event, index) in timelineEvents"
        :key="event.id"
        :initial="{ opacity: 0.5, x: index % 2 === 0 ? -200 : 200 }"
        :transition="{ duration: 1 }"
        :while-in-view="{
          opacity: 1,
          x: 0,
        }"
      >
        <div
          :class="[
            'flex w-full flex-col items-center',
            index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse',
          ]"
        >
          <div class="px-8 sm:w-1/2">
            <div
              :class="[
                'rounded-xl p-6 shadow-lg',
                index % 2 === 0 ? 'bg-blue-500 dark:bg-blue-800' : 'bg-cyan-600 dark:bg-cyan-800',
              ]"
            >
              <h3 class="mb-2 text-xl font-bold text-white">{{ event.title }}</h3>
              <p class="mb-2 text-gray-300">{{ event.description }}</p>
              <span class="text-sm text-cyan-300">{{ event.period }}</span>
            </div>
          </div>
          <div class="flex w-1/2 justify-center">
            <div class="relative">
              <div class="z-10 h-6 w-6 rounded-full border-4 border-blue-900 bg-cyan-400"></div>
              <div
                class="absolute top-1/2 h-32 w-1 sm:h-1 sm:w-32"
                :class="
                  index % 2 === 0
                    ? 'from-cyan-400 to-transparent sm:right-0 sm:bg-gradient-to-r'
                    : 'from-cyan-400 to-transparent sm:left-0 sm:bg-gradient-to-l'
                "
              ></div>
            </div>
          </div>
          <div
            class="px-8 sm:w-1/2"
            @click="playElementAudio(index + 1)"
            @mouseenter="playElementAudio(index + 1)"
            @mouseleave="stopAudio"
          >
            <img
              :src="event.image"
              :alt="event.title"
              class="h-40 w-full rounded-lg object-cover shadow-xl"
            />
          </div>
        </div>
      </motion.div>
    </div>
  </section>

  <audio ref="audioRef" class="hidden"></audio>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import { useLandingAudio } from '../../composables/useLandingAudio'

const { audioRef, playElementAudio, stopAudio } = useLandingAudio('history')

interface TimelineEvent {
  id: number
  title: string
  description: string
  period: string
  image: string
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    title: 'Alquimia Antigua',
    description:
      'Los primeros intentos de transformar metales en oro y buscar el elixir de la vida.',
    period: '3000 a.C. - 1500 d.C.',
    image:
      'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 2,
    title: 'Teoría del Flogisto',
    description: 'Georg Ernst Stahl propone la teoría del flogisto para explicar la combustión.',
    period: '1667 - 1780',
    image:
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 3,
    title: 'Lavoisier y la Ley de Conservación',
    description:
      'Antoine Lavoisier establece la ley de conservación de la masa, refutando el flogisto.',
    period: '1789',
    image:
      'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 4,
    title: 'Tabla Periódica de Mendeleiev',
    description: 'Dmitri Mendeleev publica su tabla periódica organizando los elementos conocidos.',
    period: '1869',
    image:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 5,
    title: 'Descubrimiento de la Estructura Atómica',
    description: 'Rutherford, Bohr y otros científicos revelan la estructura del átomo.',
    period: '1900 - 1930',
    image:
      'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
]
</script>
