<template>
  <section id="timeline" class="py-20">
    <motion.div
      :initial="{ opacity: 0, y: 50 }"
      :whileInView="{ opacity: 1, y: 0, transition: { duration: 0.8 } }"
      :inViewOptions="{ once: true }"
      class="max-w-6xl mx-auto px-4"
    >
      <h2
        class="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
      >
        Línea de Tiempo Histórica
      </h2>
    </motion.div>

    <div class="relative overflow-hidden">
      <!-- Línea central -->
      <div
        class="absolute left-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-600 transform -translate-x-1/2"
      ></div>

      <!-- Eventos -->
      <motion.div
        class="mb-12 w-full"
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
          :class="['flex items-center w-full', index % 2 === 0 ? 'flex-row' : 'flex-row-reverse']"
        >
          <div class="w-1/2 px-8">
            <div
              :class="[
                'p-6 rounded-xl shadow-lg',
                index % 2 === 0 ? 'bg-blue-800/50' : 'bg-cyan-800/50',
              ]"
            >
              <h3 class="text-xl font-bold mb-2">{{ event.title }}</h3>
              <p class="text-gray-300 mb-2">{{ event.description }}</p>
              <span class="text-sm text-cyan-300">{{ event.period }}</span>
            </div>
          </div>
          <div class="w-1/2 flex justify-center">
            <div class="relative">
              <div class="w-6 h-6 rounded-full bg-cyan-400 border-4 border-blue-900 z-10"></div>
              <div
                class="absolute top-1/2 w-32 h-1"
                :class="
                  index % 2 === 0
                    ? 'bg-gradient-to-r from-cyan-400 to-transparent right-0'
                    : 'bg-gradient-to-l from-cyan-400 to-transparent left-0'
                "
              ></div>
            </div>
          </div>
          <div class="w-1/2 px-8">
            <img
              :src="event.image"
              :alt="event.title"
              class="rounded-lg shadow-xl h-40 w-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'

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
