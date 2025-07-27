import { ref, onMounted, onUnmounted } from 'vue'
import { elementos } from '../data/elements'
import { compuestos } from '../data/compounds'

type Direction = 'up' | 'down' | 'left' | 'right'
type Position = { x: number; y: number }

const gridSize = 24

export function useSnakeGame() {
  const snake = ref<Position[]>([{ x: 10, y: 10 }])
  const direction = ref<Direction>('right')
  const interval = ref<number | null>(null)

  const comida = ref<{ position: Position; simbolo: string }>(generateComida())
  const comidas = ref<{ position: Position; simbolo: string }[]>([])
  const elementosRecolectados = ref<string[]>([])

  function generateComida(): { position: Position; simbolo: string } {
    const x = Math.floor(Math.random() * gridSize)
    const y = Math.floor(Math.random() * gridSize)
    const simbolo = elementos[Math.floor(Math.random() * elementos.length)].simbolo
    return { position: { x, y }, simbolo }
  }

  function generateComidas(cantidad: number) {
    const nuevas: { position: Position; simbolo: string }[] = []
    for (let i = 0; i < cantidad; i++) {
      const x = Math.floor(Math.random() * gridSize)
      const y = Math.floor(Math.random() * gridSize)
      const simbolo = elementos[Math.floor(Math.random() * elementos.length)].simbolo
      nuevas.push({ position: { x, y }, simbolo })
    }
    return nuevas
  }

  const moveSnake = () => {
    const head = { ...snake.value[0] }

    switch (direction.value) {
      case 'up':
        head.y -= 1
        break
      case 'down':
        head.y += 1
        break
      case 'left':
        head.x -= 1
        break
      case 'right':
        head.x += 1
        break
    }

    // Colisión con bordes
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
      stopGame()
      alert('¡Game Over!')
      return
    }

    // Colisión con comida
    const comidaIndex = comidas.value.findIndex(
      (c) => c.position.x === head.x && c.position.y === head.y,
    )

    if (comidaIndex !== -1) {
      snake.value.unshift(head)
      elementosRecolectados.value.push(comidas.value[comidaIndex].simbolo)
      comidas.value.splice(comidaIndex, 1)
      comidas.value.push(...generateComidas(1)) // agregar una nueva comida
      verificarCompuesto()
    } else {
      snake.value.unshift(head)
      snake.value.pop()
    }
  }

  const changeDirection = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        if (direction.value !== 'down') direction.value = 'up'
        break
      case 'ArrowDown':
        if (direction.value !== 'up') direction.value = 'down'
        break
      case 'ArrowLeft':
        if (direction.value !== 'right') direction.value = 'left'
        break
      case 'ArrowRight':
        if (direction.value !== 'left') direction.value = 'right'
        break
    }
  }

  const compuestoFormado = ref<string | null>(null)

  const puntuacion = ref(0)

  function verificarCompuesto() {
    for (const compuesto of compuestos) {
      const copiaRecolectados = [...elementosRecolectados.value]
      const esValido = compuesto.elementos.every((el) => {
        const index = copiaRecolectados.indexOf(el)
        if (index !== -1) {
          copiaRecolectados.splice(index, 1)
          return true
        }
        return false
      })

      if (esValido) {
        const head = { ...snake.value[0] }
        compuestoFormado.value = `${compuesto.nombre} (${compuesto.formula})`
        elementosRecolectados.value = []
        snake.value = head ? [head] : []

        // Asignar puntos (ejemplo: 10 puntos por elemento)
        puntuacion.value += compuesto.elementos.length * 10
        break
      }
    }
  }

  const intervalComida = ref<number | null>(null)

  const startGame = () => {
    interval.value = setInterval(moveSnake, 200)
    intervalComida.value = setInterval(() => {
      comidas.value.push(...generateComidas(2))
    }, 5000)

    window.addEventListener('keydown', changeDirection)
    comidas.value = generateComidas(5) // Genera 5 comidas al inicio
  }

  const stopGame = () => {
    if (interval.value) clearInterval(interval.value)
    if (intervalComida.value) clearInterval(intervalComida.value)
    window.removeEventListener('keydown', changeDirection)
  }

  const resetGame = () => {
    snake.value = [{ x: 10, y: 10 }]
    direction.value = 'right'
    comida.value = generateComida()
    elementosRecolectados.value = []
    compuestoFormado.value = null
    puntuacion.value = 0
    stopGame()
  }

  onUnmounted(stopGame)

  return {
    snake,
    comida,
    elementosRecolectados,
    gridSize,
    compuestoFormado,
    puntuacion,
    startGame,
    stopGame,
    resetGame,
    comidas,
  }
}
