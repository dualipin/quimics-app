import { ref } from 'vue'
import { getLandingElementAudio } from '../services'

export const useLandingAudio = (fromPath: string) => {
  const audioRef = ref<HTMLAudioElement | null>(null)

  async function playElementAudio(number: number) {
    if (!audioRef.value) {
      return
    }

    const currentAudioUrl = getLandingElementAudio(fromPath, number)

    audioRef.value.src = currentAudioUrl

    // Detener el audio actual si hay uno reproduciéndose
    if (!audioRef.value.paused) {
      audioRef.value.pause()
      audioRef.value.currentTime = 0 // Reiniciar el tiempo de reproducción
    }

    // Si no hay un elemento actual, no hacer nada
    if (!currentAudioUrl) {
      console.warn('No audio source available for the current element')
      return
    }

    // Asignar la fuente del audio y reproducir
    audioRef.value.src = currentAudioUrl
    try {
      await audioRef.value.play()
    } catch (error) {
      console.error('Error al reproducir el audio:', error)
    }
  }

  const stopAudio = () => {
    if (audioRef.value) {
      audioRef.value.pause()
      audioRef.value.currentTime = 0 // Reiniciar el tiempo de reproducción
    }
  }

  return {
    audioRef,
    playElementAudio,
    stopAudio,
  }
}
