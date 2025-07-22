<script setup lang="ts">
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { usePeriodicTableStore } from '../stores/periodic-table-store'
import { usePeriodicTableBoard } from '../composables/usePeriodicTableBoard'
import { HSOverlay } from 'preline'

const periodicTable = usePeriodicTableStore()
const { audioRef, playElementAudio } = usePeriodicTableBoard()

watch(
  () => periodicTable.currentElement,
  (newElement) => {
    if (newElement) {
      playElementAudio()
    }
  },
)

onMounted(() => {
  // Ensure the audio element is ready when the component mounts
  if (audioRef.value) {
    audioRef.value.load()
  }

  const modal = document.getElementById('hs-scale-animation-modal-periodic-table')!

  // Set up an event listener for when the modal is closed
  modal.addEventListener('close.hs.overlay', function () {
    audioRef.value?.pause()
  })
})
</script>

<template>
  <div
    id="hs-scale-animation-modal-periodic-table"
    class="hs-overlay pointer-events-none fixed inset-0 z-[80] hidden size-full overflow-x-hidden overflow-y-auto"
    role="dialog"
    tabindex="-1"
    aria-labelledby="hs-scale-animation-modal-periodic-table-label"
  >
    <div
      class="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex min-h-[calc(100%-3.5rem)] scale-95 items-center opacity-0 transition-all duration-300 ease-out sm:mx-auto sm:w-full sm:max-w-2xl"
    >
      <div
        class="pointer-events-auto flex w-full flex-col rounded-2xl border border-gray-200 bg-white/50 shadow-xl backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-900/50 dark:shadow-neutral-800/70"
      >
        <!-- Header con nombre del elemento -->
        <div class="px-6 pt-6">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {{ periodicTable.currentElement?.name }}
          </h2>
        </div>

        <!-- Contenido principal -->
        <div class="flex w-full flex-col p-6 md:flex-row">
          <!-- Columna izquierda - Datos -->
          <div class="w-full md:w-1/2">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Número Atómico</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ periodicTable.currentElement?.atomicNumber }}
                </p>
              </div>

              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Símbolo</p>
                <p class="text-2xl font-bold text-gray-600 dark:text-gray-100">
                  {{ periodicTable.currentElement?.symbol }}
                </p>
              </div>

              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Peso Atómico</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ periodicTable.currentElement?.atomicWeight }}
                </p>
              </div>

              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Valencia</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ periodicTable.currentElement?.valence }}
                </p>
              </div>

              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Categoría</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ periodicTable.currentElement?.category }}
                </p>
              </div>

              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Grupo</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ periodicTable.currentElement?.group }}
                </p>
              </div>

              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Período</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ periodicTable.currentElement?.period }}
                </p>
              </div>

              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Punto de Fusión</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ periodicTable.currentElement?.meltingPoint }}
                </p>
              </div>

              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Punto de Ebullición
                </p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ periodicTable.currentElement?.boilingPoint }}
                </p>
              </div>

              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Densidad</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ periodicTable.currentElement?.density }}
                </p>
              </div>
            </div>
          </div>

          <!-- Columna derecha - Imagen y curiosidad -->
          <div class="mt-8 w-full md:mt-0 md:w-1/2 md:pl-6">
            <div
              class="flex h-full flex-col items-center justify-between rounded-xl bg-gray-50 p-6 dark:bg-neutral-800/50"
            >
              <div class="mb-6 text-center">
                <p class="text-sm text-gray-600 italic dark:text-gray-300">
                  {{ periodicTable.currentElement?.funFact }}
                </p>
              </div>

              <div class="flex-1">
                <img
                  class="h-full max-h-48 w-auto rounded-lg object-contain shadow-md"
                  :src="periodicTable.currentElement?.image"
                  :alt="periodicTable.currentElement?.name"
                />
              </div>

              <div v-if="periodicTable.currentElement?.atomicStructure" class="mt-6 text-center">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Estructura Atómica
                </p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ periodicTable.currentElement?.atomicStructure }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer con botón -->
        <div
          class="flex items-center justify-end gap-x-2 border-t border-gray-200 px-6 py-4 dark:border-neutral-700"
        >
          <audio ref="audioRef" />
          <button
            type="button"
            class="rounded-lg bg-gray-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:focus:ring-offset-neutral-900"
            data-hs-overlay="#hs-scale-animation-modal-periodic-table"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
