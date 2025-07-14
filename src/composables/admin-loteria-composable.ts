import { ref } from 'vue'

export const adminSocket = ref<null | WebSocket>(null)
adminSocket.value = new WebSocket(`${import.meta.env.VITE_API_HOST}/admin/laloteria`)

adminSocket.value.onopen = () => {
  console.log('Conectado al socket del admin')
}

adminSocket.value.onclose = () => {
  console.log('Desconectado del socket del admin')
}

adminSocket.value.onmessage = (event) => manejarMensaje(event)

const manejarMensaje = (event: MessageEvent) => {
  const data = JSON.parse(event.data)
  console.log('Mensaje del socket del admin:', data)
  // Aquí puedes manejar el mensaje recibido
  // Por ejemplo, actualizar el estado de la aplicación o mostrar una notificación
}

export function tirarCarta() {
  if (adminSocket.value) {
    adminSocket.value.send(JSON.stringify({ accion: 'tirar_carta' }))
    console.log('Carta tirada')
  }
}

export function reiniciarJuego() {
  adminSocket.value?.send(JSON.stringify({ accion: 'reiniciar_juego' }))
  console.log('Juego reiniciado')
}
