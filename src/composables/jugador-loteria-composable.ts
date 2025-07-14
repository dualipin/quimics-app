import { ref } from 'vue'
import {
  carton,
  elementoActual,
  elementosLanzados,
  elementosSeleccionados,
  ganador,
  hayUnGanador,
  soyUnGanador,
} from './loteria-composable'
import { useAuthStore } from '@/stores/auth'

export const jugadorSocket = ref<WebSocket | null>(null)
const auth = useAuthStore()
jugadorSocket.value = new WebSocket(`${import.meta.env.VITE_API_HOST}/laloteria`)

jugadorSocket.value.onopen = () => {
  console.log('Conectado al socket del jugador')

  jugadorSocket.value?.send(
    JSON.stringify({
      accion: 'unirse',
    }),
  )
}

jugadorSocket.value.onclose = () => {
  console.log('Desconectado del socket del jugador')
}

jugadorSocket.value.onmessage = (event) => {
  const data = JSON.parse(event.data)
  // console.log('Datos recibidos del websocket jugador:', data)
  // carton.value = data.dato.carton

  if (data.tipo === 'carton') {
    carton.value = data.dato
    elementosLanzados.value = data.elementos_lanzados
  } else if (data.tipo === 'ganador') {
    console.log('Ganador:', data.dato)
  } else if (data.tipo === 'carton_cambiado' || data.tipo === 'carton_obtenido') {
    cambiarCarton(data)
    elementosLanzados.value = data.elementos_lanzados
  } else if (data.tipo === 'elemento_lanzado') {
    manejarElementoLanzado(data)
  } else if (data.tipo == 'elemento_actual') {
    manejarElementoLanzado(data)
    console.log('Existe un nuevo elemento actual', data.dato)
  } else if (data.tipo === 'juego_reiniciado') {
    elementosLanzados.value = []
    elementoActual.value = null
  } else if (data.tipo === 'juego_ganado') {
    console.log('Ganador:', data.dato)
    ganador.value = data.dato
    if (data.dato === auth.user?.username) {
      soyUnGanador.value = true
    } else {
      hayUnGanador.value = true
    }
  }
}

export function heGanado() {
  jugadorSocket.value?.send(JSON.stringify({ accion: 'he_ganado', ganador: auth.user?.username }))
}

function cambiarCarton(data: any) {
  carton.value = data.dato
  elementosSeleccionados.value = []
  elementosLanzados.value = data.elementos_lanzados
  console.log('Cartón cambiado:', data.dato)
}

function manejarElementoLanzado(data: any) {
  const elementoLanzado = data.dato
  elementoActual.value = elementoLanzado
  elementosLanzados.value.push(elementoLanzado)
  console.log('Elemento lanzado:', elementoLanzado)
}

export function manejarCambiarCarton() {
  jugadorSocket.value?.send(JSON.stringify({ accion: 'cambiar_carton' }))
  carton.value = []
  console.log('Cartón cambiado')
}
