import { HSOverlay } from 'preline/dist'
import type { TChemicalElement } from '../types/ChemicalElement'
import { usePeriodicTableStore } from '../stores/periodic-table-store'
import { ref } from 'vue'

// let modal = null as HSOverlay | null

export const usePeriodicTableBoard = () => {
  const periodicTable = usePeriodicTableStore()
  const modal = ref<HSOverlay | null>(null)
  const audioRef = ref<HTMLAudioElement | null>(null)

  const orderInBoard = ({ atomicNumber, group, period }: TChemicalElement) => {
    if (atomicNumber >= 57 && atomicNumber <= 70) {
      return {
        gridRow: 9,
        gridColumn: group, // Adjust for lanthanides
      }
    }

    if (atomicNumber >= 89 && atomicNumber <= 102) {
      return {
        gridRow: 10,
        gridColumn: group,
      }
    }

    return {
      gridColumn: group,
      gridRow: period,
    }
  }

  async function playElementAudio() {
    if (!audioRef.value) {
      return
    }

    audioRef.value.src = periodicTable.currentElementAudio || ''

    // Detener el audio actual si hay uno reproduciéndose
    if (!audioRef.value.paused) {
      audioRef.value.pause()
      audioRef.value.currentTime = 0 // Reiniciar el tiempo de reproducción
    }

    // Si no hay un elemento actual, no hacer nada
    if (!periodicTable.currentElementAudio) {
      console.warn('No audio source available for the current element')
      return
    }

    // Asignar la fuente del audio y reproducir
    audioRef.value.src = periodicTable.currentElementAudio
    try {
      await audioRef.value.play()
    } catch (error) {
      console.error('Error al reproducir el audio:', error)
    }
  }

  const openModal = ({ element }: { element: TChemicalElement }) => {
    periodicTable.setCurrentElement(element)
    HSOverlay.open('#hs-scale-animation-modal-periodic-table')
    playElementAudio()
  }

  return { orderInBoard, openModal, modal, audioRef, playElementAudio }
}
