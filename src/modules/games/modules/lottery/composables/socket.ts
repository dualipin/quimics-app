import { ref } from 'vue'
import { useLotteryRoomStore } from '../stores/room'

interface SocketMessage {
  event: string
  data?: any
}

export const useSocket = () => {
  const socket = ref<WebSocket | null>(null)
  const listeners = ref<Record<string, (data: any) => void>>({})
  const roomStore = useLotteryRoomStore()

  const connect = (roomId: string, userId: number) => {
    socket.value = new WebSocket(
      `${import.meta.env.VITE_WEBSOCKET_HOST}/api/games/lottery/ws/${roomId}/${userId}`,
    )

    socket.value.onmessage = (event) => {
      const message: SocketMessage = JSON.parse(event.data)
      if (listeners.value[message.event]) {
        listeners.value[message.event](message.data)
      }

      console.log('Received message:', message)
    }

    socket.value.onerror = (error) => {
      if (socket.value) {
        socket.value.close()
      }
      roomStore.activeRoom = null
      console.error('WebSocket error:', error)
    }
  }

  const send = (data: any) => {
    if (socket.value?.readyState === WebSocket.OPEN) {
      socket.value.send(JSON.stringify(data))
    }
  }

  const on = (event: string, callback: (data: any) => void) => {
    listeners.value[event] = callback
  }

  return { connect, send, on }
}
