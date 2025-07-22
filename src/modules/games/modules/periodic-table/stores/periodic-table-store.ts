import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TChemicalElement } from '../types/ChemicalElement'
import { getChemicalElementAudio, getChemicalsElements } from '../services/periodic-table-services'

export const usePeriodicTableStore = defineStore(
  'periodic-table',
  () => {
    const elements = ref<TChemicalElement[]>([])
    const currentElement = ref<TChemicalElement | null>(null)
    const currentElementAudio = ref<string | null>(null)
    const isLoading = ref(false)
    const error = ref<Error | null>(null)

    async function fetchElements(force = false) {
      if (!force && elements.value.length > 0) return

      try {
        isLoading.value = true
        error.value = null

        const response = await getChemicalsElements()
        elements.value = response
      } catch (err) {
        error.value = err instanceof Error ? err : new Error(String(err))
      } finally {
        isLoading.value = false
      }
    }

    function fetchElementAudio(number: number) {
      currentElementAudio.value = getChemicalElementAudio(number)
    }

    function setCurrentElement(element: TChemicalElement | null) {
      currentElement.value = element
      if (element) {
        fetchElementAudio(element.atomicNumber)
      } else {
        currentElementAudio.value = null
      }
    }

    return {
      elements,
      isLoading,
      error,
      fetchElements,
      currentElement,
      setCurrentElement,
      currentElementAudio,
    }
  },
  {
    persist: {
      serializer: {
        serialize: JSON.stringify,
        deserialize: JSON.parse,
      },
    },
  },
)
