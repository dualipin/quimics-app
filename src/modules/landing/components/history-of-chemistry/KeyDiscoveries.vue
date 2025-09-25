<template>
  <section id="discoveries" class="py-20">
    <motion.div
      :initial="{ opacity: 0, y: 50 }"
      :while-in-view="{ opacity: 1, y: 0, transition: { duration: 0.8 } }"
    >
      <h2
        class="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
      >
        Descubrimientos Clave
      </h2>
    </motion.div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <motion.div
        v-for="(discovery, index) in discoveries"
        :key="discovery.id"
        class="bg-gray-200 dark:bg-gray-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-700/50 dark:border-gray-300/50 hover:border-cyan-500/30"
        :initial="{ opacity: 0, scale: 0.9 }"
        :while-in-view="{ opacity: 1, scale: 1, transition: { delay: 0.1 * index, duration: 0.5 } }"
        :hovered="{ scale: 1.03 }"
      >
        <div class="h-48 overflow-hidden">
          <img
            :src="discovery.image"
            :alt="discovery.title"
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
            {{ discovery.title }}
          </h3>
          <p class="text-gray-700 dark:text-gray-500 mb-4">{{ discovery.description }}</p>
          <div class="flex justify-between items-center">
            <span class="text-sm text-cyan-400 dark:text-cyan-600">{{ discovery.year }}</span>
            <span class="text-xs px-3 py-1 bg-blue-900/50 dark:bg-blue-200/50 rounded-full">
              {{ discovery.field }}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
interface Discovery {
  id: number
  title: string
  description: string
  year: string
  field: string
  image: string
}

const discoveries: Discovery[] = [
  {
    id: 1,
    title: 'Ley de las Proporciones Definidas',
    description:
      'Proust establece que los compuestos químicos siempre contienen los mismos elementos en la misma proporción de masa.',
    year: '1794',
    field: 'Química Cuantitativa',
    image:
      'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 2,
    title: 'Teoría Atómica de Dalton',
    description:
      'John Dalton propone que la materia está compuesta de átomos indivisibles y que los elementos difieren en sus masas atómicas.',
    year: '1803',
    field: 'Teoría Atómica',
    image:
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 3,
    title: 'Síntesis de la Urea',
    description:
      'Friedrich Wöhler sintetiza urea a partir de compuestos inorgánicos, derribando la barrera entre química orgánica e inorgánica.',
    year: '1828',
    field: 'Química Orgánica',
    image:
      'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 4,
    title: 'Estructura del Benceno',
    description:
      'Kekulé propone la estructura hexagonal del benceno, fundamento de la química aromática.',
    year: '1865',
    field: 'Química Orgánica',
    image:
      'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 5,
    title: 'Descubrimiento del Electrón',
    description: 'J.J. Thomson descubre el electrón, demostrando que el átomo es divisible.',
    year: '1897',
    field: 'Física Química',
    image:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 6,
    title: 'Modelo Atómico de Bohr',
    description:
      'Niels Bohr propone un modelo cuántico del átomo con electrones en órbitas definidas.',
    year: '1913',
    field: 'Química Cuántica',
    image:
      'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
]
</script>
