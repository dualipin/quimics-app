let socket: WebSocket

export function connectWebSocket(
  roomCode: string,
  playerId: string,
  onMessage: (data: any) => void,
) {
  socket = new WebSocket(
    `${import.meta.env.VITE_WEBSOCKET_HOST}/api/v1/games/lottery/ws/${roomCode}/${playerId}`,
  )

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    onMessage(data)
  }
}

export function sendMessage(message: any) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message))
  }
}
