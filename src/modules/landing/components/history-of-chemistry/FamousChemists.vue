<template>
  <section id="chemists" class="py-20">
    <motion.div
      :initial="{ opacity: 0, y: 50 }"
      :while-in-view="{ opacity: 1, y: 0, transition: { duration: 0.8 } }"
    >
      <h2
        class="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 dark:from-cyan-300 dark:to-blue-400"
      >
        Químicos Destacados
      </h2>
    </motion.div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <motion.div
        v-for="(chemist, index) in chemists"
        :key="chemist.id"
        class="group relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 dark:shadow-gray-900"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0, transition: { delay: 0.1 * index, duration: 0.5 } }"
        :hovered="{ scale: 1.05 }"
      >
        <div class="relative h-64 overflow-hidden">
          <img
            :src="chemist.image"
            :alt="chemist.name"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent dark:from-black/60"
          ></div>
          <div class="absolute bottom-0 left-0 p-4">
            <h3 class="text-xl font-bold text-white">{{ chemist.name }}</h3>
            <p class="text-cyan-300 text-sm">{{ chemist.lifespan }}</p>
          </div>
        </div>
        <div class="bg-gray-200 p-4 dark:bg-gray-900 h-full">
          <p class="text-gray-800 text-sm mb-3 dark:text-gray-200">{{ chemist.contribution }}</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(field, idx) in chemist.fields"
              :key="idx"
              class="text-xs px-2 py-1 bg-cyan-900/30 rounded-full dark:bg-cyan-800/30"
            >
              {{ field }}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'

interface Chemist {
  id: number
  name: string
  lifespan: string
  contribution: string
  fields: string[]
  image: string
}

const chemists: Chemist[] = [
  {
    id: 1,
    name: 'Antoine Lavoisier',
    lifespan: '1743 - 1794',
    contribution: 'Padre de la química moderna, formuló la ley de conservación de la masa.',
    fields: ['Química Cuantitativa', 'Combustión', 'Elementos'],
    image: 'https://clickmica.fundaciondescubre.es/files/2016/12/Antoine_lavoisier-copy.jpg',
  },
  {
    id: 2,
    name: 'Dmitri Mendeleev',
    lifespan: '1834 - 1907',
    contribution:
      'Creó la tabla periódica de los elementos y predijo propiedades de elementos desconocidos.',
    fields: ['Tabla Periódica', 'Elementos Químicos'],
    image:
      'https://excursiones-en-rusia.com/wp-content/uploads/2024/01/Dmitry-Ivanovich-Mendeleev-3.jpg',
  },
  {
    id: 3,
    name: 'Marie Curie',
    lifespan: '1867 - 1934',
    contribution: 'Pionera en el estudio de la radiactividad, descubrió el radio y el polonio.',
    fields: ['Radiactividad', 'Radioquímica', 'Física'],
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Marie_Curie_c._1920s.jpg/800px-Marie_Curie_c._1920s.jpg',
  },
  {
    id: 4,
    name: 'Linus Pauling',
    lifespan: '1901 - 1994',
    contribution:
      'Desarrolló la teoría del enlace químico y la naturaleza de las moléculas complejas.',
    fields: ['Química Cuántica', 'Bioquímica', 'Cristalografía'],
    image:
      'https://cloudfront-us-east-1.images.arcpublishing.com/opb/UTFWRGZKQVHCXGXTZG43ELHQQM.jpg',
  },
]
</script>
