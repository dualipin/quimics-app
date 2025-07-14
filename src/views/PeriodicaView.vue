<template>
  <div class="overflow-auto overflow-x-scroll">
    <div
      class="min-w-[110rem] mt-24 grid grid-cols-18 grid-rows-9 w-auto scale-none xl:scale-90 px-10"
      data-aos="fade-up"
    >
      <ElementoQuimicoItem
        v-for="elemento in elementos"
        :key="elemento.numeroAtomico"
        :elemento="{ ...elemento }"
        @click="openElement(elemento)"
        :style="elementsGridStyle(elemento)"
        data-aos="zoom-in"
      />
      <div class="div col-span-16 grid place-content-center" data-aos="fade-down">
        <h1 class="text-2xl md:text-5xl text-center font-bold dark:text-white">
          Tabla Periódica de los Elementos
        </h1>
      </div>
      <div class="col-span-10 px-10 grid row-span-2 row-start-2 grid-cols-2" data-aos="fade-right">
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-video bg-red-700 dark:bg-red-800"></div>
          <span class="dark:text-white">Metales Alcalinos</span>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-video bg-orange-700 dark:bg-orange-800"></div>
          <span class="dark:text-white">Alcalinotérreos</span>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-video bg-lime-500 dark:bg-lime-600"></div>
          <span class="dark:text-white">Otros Metales</span>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-video bg-amber-300 dark:bg-amber-400"></div>
          <span class="dark:text-white">Metales de Transición</span>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-video bg-yellow-600 dark:bg-yellow-700"></div>
          <span class="dark:text-white">Lantánidos</span>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-video bg-yellow-500 dark:bg-yellow-600"></div>
          <span class="dark:text-white">Actínidos</span>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-video bg-green-600 dark:bg-green-700"></div>
          <span class="dark:text-white">Metaloides</span>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-video bg-indigo-300 dark:bg-indigo-400"></div>
          <span class="dark:text-white">No Metal</span>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-video bg-indigo-200 dark:bg-indigo-300"></div>
          <span class="dark:text-white">Halógenos</span>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-8 aspect-video bg-slate-300 dark:bg-slate-400"></div>
          <span class="dark:text-white">Gases Nobles</span>
        </div>
      </div>
    </div>
  </div>

  <VaModal
    v-model="showModal"
    blur
    @close="closeElement"
    close-button
    hide-default-actions
    class="dark:bg-gray-800 dark:text-white"
  >
    <h3 class="va-h3 dark:text-white">{{ elementoSeleccionado?.nombre }}</h3>
    <div class="mt-5 flex w-full justify-between flex-col md:flex-row">
      <div class="grid grid-cols-2 gap-4">
        <div><strong>Número Atómico:</strong> {{ elementoSeleccionado?.numeroAtomico }}</div>
        <div><strong>Símbolo:</strong> {{ elementoSeleccionado?.simbolo }}</div>
        <div><strong>Peso Atómico:</strong> {{ elementoSeleccionado?.pesoAtomico }}</div>
        <div><strong>Valencia:</strong> {{ elementoSeleccionado?.valencia }}</div>
        <div><strong>Categoría:</strong> {{ elementoSeleccionado?.categoria }}</div>
        <div><strong>Grupo:</strong> {{ elementoSeleccionado?.grupo }}</div>
        <div><strong>Período:</strong> {{ elementoSeleccionado?.periodo }}</div>
        <div><strong>Punto de Fusión:</strong> {{ elementoSeleccionado?.puntoFusion }}</div>
        <div><strong>Punto de Ebullición:</strong> {{ elementoSeleccionado?.puntoEbullicion }}</div>
        <div><strong>Densidad:</strong> {{ elementoSeleccionado?.densidad }}</div>
        <div>
          <strong>Estructura Atómica:</strong> {{ elementoSeleccionado?.estructuraAtomica }}
        </div>
      </div>
      <hr class="block md:hidden my-10 dark:border-gray-600" />
      <div class="flex flex-col w-1/2 items-center gap-5">
        <p class="dark:text-white">{{ elementoSeleccionado?.datoCurioso }}</p>
        <img
          class="rounded-xl w-10/12 aspect-auto object-fit shadow-lg"
          :src="elementoSeleccionado?.imagen"
          :alt="elementoSeleccionado?.nombre"
        />
      </div>
    </div>
  </VaModal>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import type { ElementoQuimico } from '@/types/Elemento'
import ElementoQuimicoItem from '@/components/tabla-periodica/ElementoQuimicoItem.vue'
import api from '@/services/api'
import { getCookie } from '@/utils/getCookie'

const elementos = ref<ElementoQuimico[]>([])
const elementoSeleccionado = ref<ElementoQuimico | null>(null)
const showModal = ref(false)

function elementsGridStyle(elemento: ElementoQuimico) {
  const gridColumn = elemento.grupo!
  const gridRow = elemento.periodo!

  if (elemento.numeroAtomico! >= 57 && elemento.numeroAtomico! <= 70) {
    return {
      gridRow: 9,
      gridColumn: elemento.grupo!,
    }
  }

  if (elemento.numeroAtomico! >= 89 && elemento.numeroAtomico! <= 102) {
    return {
      gridRow: 10,
      gridColumn: elemento.grupo!,
    }
  }

  return {
    gridColumn: gridColumn,
    gridRow: gridRow,
  }
}

/**
 * @param texto Texto a hablar
 * @description Función que utiliza la API de SpeechSynthesis para hablar el texto proporcionado.
 * @returns {void}
 */
function hablarTexto(texto: string): void {
  const synth = window.speechSynthesis
  const voces = synth.getVoices()

  // Busca una voz de español de México
  const vozMexicana =
    // voces.find((v) => v.lang === 'es-MX') ||
    voces.find((v) => v.lang === 'es-ES') ||
    voces.find((v) => v.name.toLowerCase().includes('spanish'))

  const utterThis = new SpeechSynthesisUtterance(texto)
  utterThis.voice = vozMexicana || null
  utterThis.pitch = 1
  utterThis.rate = 0.95
  utterThis.lang = 'es-MX'

  synth.cancel()
  synth.speak(utterThis)
}

async function openElement(elemento: ElementoQuimico) {
  elementoSeleccionado.value = elemento
  showModal.value = true

  const texto =
    `Vamos a conocer a ${elemento.nombre}. ` +
    `Es un elemento químico con número atómico ${elemento.numeroAtomico}, y su símbolo es ${elemento.simbolo}. ` +
    `Pertenece a la categoría de ${elemento.categoria}, ` +
    `y lo encontramos en el grupo ${elemento.grupo}, período ${elemento.periodo}. ` +
    `Tiene un peso atómico de ${elemento.pesoAtomico}, una valencia de ${elemento.valencia}, y una densidad de ${elemento.densidad}. ` +
    `Su punto de fusión es de ${elemento.puntoFusion}, y su punto de ebullición es de ${elemento.puntoEbullicion}. ` +
    `En cuanto a su estructura atómica, es ${elemento.estructuraAtomica}. ` +
    `Y como dato curioso... ${elemento.datoCurioso}.`

  hablarTexto(texto)

  await api.post('/interaccion_periodica', {
    elemento: elemento.nombre,
    cookie_id: getCookie('usuario_cookie'),
  })
}

watch(
  () => showModal.value,
  (newValue) => {
    if (!newValue) {
      window.speechSynthesis.cancel()
    }
  },
  { immediate: true },
)

function closeElement() {
  elementoSeleccionado.value = null
}

const milisecond = ref<number>(0)

async function getElements() {
  try {
    const response = await api.get('/tabla_periodica')
    elementos.value = response.data.elementos
  } catch (error) {
    console.error('Error fetching elements:', error)
  }
}

onMounted(async () => {
  milisecond.value = new Date().getTime()

  await getElements()
})

onUnmounted(async () => {
  const time = new Date().getTime() - milisecond.value
  try {
    await api.post('/tiempo_pagina', {
      pagina: 'Tabla Periódica',
      tiempo: time,
      cookie_id: getCookie('usuario_cookie'),
    })
  } catch (error) {
    console.log(error)
  }
})
</script>
