// src/composables/usePageTimeTracker.ts
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/services/api'

export default function usePageTimeTracker() {
  const route = useRoute()
  const pageEnterTime = ref<Date | null>(null)
  const currentPage = ref<string>('')

  const trackPageTime = () => {
    pageEnterTime.value = new Date()
  }

  const sendPageTime = async () => {
    if (!pageEnterTime.value) return

    const exitTime = new Date()
    const timeSpent = (exitTime.getTime() - pageEnterTime.value.getTime()) / 1000 // en segundos

    try {
      await axios.post('tiempo-pagina', {
        page: currentPage.value,
        duration: timeSpent,
      })
    } catch (error) {
      console.error('Error al darle seguimiento al tiempo en pagina:', error)
    }
  }

  // Iniciar tracking cuando el componente se monta
  onMounted(() => {
    trackPageTime()
    currentPage.value = route.path
  })

  // Enviar datos cuando el componente se desmonta
  onBeforeUnmount(() => {
    sendPageTime()
  })

  // Manejar cambios de ruta
  watch(
    () => route.path,
    (newPath) => {
      sendPageTime() // Enviar tiempo de la página anterior
      currentPage.value = newPath
      trackPageTime() // Iniciar tiempo para la nueva página
    },
  )

  return {
    currentPage,
    pageEnterTime,
  }
}
