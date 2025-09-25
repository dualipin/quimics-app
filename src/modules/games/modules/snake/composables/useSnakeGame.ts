import { ref, onUnmounted, computed } from 'vue'
import { useToastStore } from '@/stores'
import { elementos } from '../data/elements'
import { compuestos } from '../data/compounds'
import { rankingServices } from '@/modules/games/services/ranking-services'
import { useAuthStore } from '@/modules/auth/stores/auth-store'
import { useSnakeStore } from '../stores/snake-store'
import type RankingGlobal from '@/modules/games/components/RankingGlobal.vue'

type Direction = 'up' | 'down' | 'left' | 'right'
type Position = { x: number; y: number }

const gridSize = 24

export function useSnakeGame() {
  const toast = useToastStore()
  const { sendRanking } = rankingServices()
  const user = useAuthStore()
  const snakeStore = useSnakeStore()
  const snake = ref<Position[]>([{ x: 10, y: 10 }])
  const direction = ref<Direction>('right')
  const interval = ref<number | null>(null)

  // Alimentos en el tablero
  const comidas = ref<{ position: Position; simbolo: string }[]>([])
  const elementosRecolectados = ref<string[]>([])

  // Progresión por niveles (cada nivel es un compuesto objetivo)
  const nivel = ref(0)
  const maxLevels = Math.min(compuestos.length, 10) // ajusta el límite si quieres un subconjunto
  const objetivo = computed(() => compuestos[nivel.value])
  const requeridos = computed(() => {
    const map = new Map<string, number>()
    objetivo.value.elementos.forEach((s) => map.set(s, (map.get(s) || 0) + 1))
    return map
  })
  const recolectadosPorElemento = ref<Map<string, number>>(new Map())
  const juegoGanado = ref(false)
  const juegoPerdido = ref(false)

  // Generar comidas con mezcla de válidos y distractores
  function generateComidas(cantidad: number, proporcionValidos = 0.6) {
    const nuevas: { position: Position; simbolo: string }[] = []
    const validos = Array.from(requeridos.value.keys())
    const distractores = elementos.map((e) => e.simbolo).filter((s) => !requeridos.value.has(s))

    for (let i = 0; i < cantidad; i++) {
      const x = Math.floor(Math.random() * gridSize)
      const y = Math.floor(Math.random() * gridSize)
      const usarValido =
        (Math.random() < proporcionValidos && validos.length > 0) || distractores.length === 0
      const pool = usarValido && validos.length ? validos : distractores
      const simbolo = pool[Math.floor(Math.random() * pool.length)]
      nuevas.push({ position: { x, y }, simbolo })
    }
    return nuevas
  }

  const moveSnake = async () => {
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
      toast.show('Chocaste con el borde. Fin del juego.', 'error')
      juegoPerdido.value = true
      return
    }

    // Colisión con sí misma
    const colisionaConSiMisma = snake.value.some((seg) => seg.x === head.x && seg.y === head.y)
    if (colisionaConSiMisma) {
      stopGame()
      toast.show('Choque contigo mismo. Fin del juego.', 'error')
      juegoPerdido.value = true
      return
    }

    // Colisión con comida
    const comidaIndex = comidas.value.findIndex(
      (c) => c.position.x === head.x && c.position.y === head.y,
    )

    if (comidaIndex !== -1) {
      const simbolo = comidas.value[comidaIndex].simbolo

      // Validación de elemento según objetivo del nivel
      if (!requeridos.value.has(simbolo)) {
        stopGame()
        toast.show('Elemento incorrecto para el compuesto objetivo. Fin del juego.', 'error')
        juegoPerdido.value = true
        return
      }

      snake.value.unshift(head)
      elementosRecolectados.value.push(simbolo)

      // Actualizar conteo por elemento
      const nuevoMapa = new Map(recolectadosPorElemento.value)
      nuevoMapa.set(simbolo, (nuevoMapa.get(simbolo) || 0) + 1)
      recolectadosPorElemento.value = nuevoMapa

      // Reponer comida
      comidas.value.splice(comidaIndex, 1)
      comidas.value.push(...generateComidas(1))

      await verificarCompuesto()
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

  async function verificarCompuesto() {
    // ¿Se cumplieron todos los requeridos del nivel actual?
    const completo = Array.from(requeridos.value.entries()).every(([simbolo, cant]) => {
      return (recolectadosPorElemento.value.get(simbolo) || 0) >= cant
    })

    if (completo) {
      compuestoFormado.value = `${objetivo.value.nombre} (${objetivo.value.formula})`

      // Puntaje por elementos del compuesto
      puntuacion.value += objetivo.value.elementos.length * 10

      // Recompensas por hitos
      const formedCount = nivel.value + 1
      if (formedCount === 1) snakeStore.addReward('Primer compuesto')
      if (formedCount === 3) {
        snakeStore.addReward('Tríada atómica')
        snakeStore.unlockSkin('quantum')
        toast.show('Skin Quantum desbloqueada', 'success')
      }
      if (formedCount === 5) {
        snakeStore.addReward('Maestro molecular')
        snakeStore.unlockSkin('molecular')
        toast.show('Skin Molecular desbloqueada', 'success')
      }
      if (formedCount === 7) {
        snakeStore.addReward('Colector estelar')
        snakeStore.unlockFoodCosmetic('orb')
        toast.show('Cosmético de comida "Orb" desbloqueado', 'success')
      }

      toast.show(`Compuesto formado: ${objetivo.value.nombre}`, 'success')

      try {
        const ranking = {
          name: 'snake',
          user: Number(user.user!.id),
          score: puntuacion.value,
          username: user.user!.full_name,
        }
        await sendRanking(ranking)
      } catch (err) {
        console.error('Error al enviar ranking de snake:', err)
      }

      if (rankingRef.value) rankingRef.value.loadRanking()

      // juegoGanado.value = false
      // juegoPerdido.value = false

      // Último nivel => ganar
      if (nivel.value >= maxLevels - 1) {
        stopGame()
        juegoGanado.value = true
        toast.show('¡Ganaste! Completaste todos los niveles.', 'success')
        // Skin legendaria por completar campaña
        snakeStore.addReward('Leyenda de la Química')
        snakeStore.unlockSkin('legendary')
        return
      }

      // Avanzar de nivel tras breve pausa visual
      setTimeout(() => {
        nivel.value += 1
  // Reiniciar estado del nivel (manteniendo el tamaño actual de la serpiente)
  elementosRecolectados.value = []
  recolectadosPorElemento.value = new Map()
  // La serpiente conserva su longitud acumulada; sólo se limpian las comidas
  // Refrescar comidas para el nuevo objetivo
        comidas.value = generateComidas(5)
        compuestoFormado.value = null
      }, 300)
    }
  }

  const intervalComida = ref<number | null>(null)

  const startGame = () => {
    juegoPerdido.value = false
    if (juegoGanado.value) return
    if (!interval.value) interval.value = setInterval(moveSnake, 200)
    if (!intervalComida.value)
      intervalComida.value = setInterval(() => {
        // Mantener un límite de comidas en tablero
        if (comidas.value.length < 15) {
          comidas.value.push(...generateComidas(2))
        }
      }, 5000)

    window.addEventListener('keydown', changeDirection)
    if (comidas.value.length === 0) comidas.value = generateComidas(5)
  }

  const stopGame = () => {
    if (interval.value) clearInterval(interval.value)
    if (intervalComida.value) clearInterval(intervalComida.value)
    window.removeEventListener('keydown', changeDirection)
    interval.value = null
    intervalComida.value = null
  }

  const resetGame = () => {
    snake.value = [{ x: 10, y: 10 }]
    direction.value = 'right'
    elementosRecolectados.value = []
    recolectadosPorElemento.value = new Map()
    compuestoFormado.value = null
    puntuacion.value = 0
    nivel.value = 0
    comidas.value = []
    juegoGanado.value = false
    juegoPerdido.value = false
    stopGame()
  }
  const rankingRef = ref<InstanceType<typeof RankingGlobal>>()

  onUnmounted(stopGame)

  return {
    snake,
    elementosRecolectados,
    gridSize,
    compuestoFormado,
    puntuacion,
    startGame,
    stopGame,
    resetGame,
    comidas,
    nivel,
    objetivo,
    requeridos,
    recolectadosPorElemento,
    juegoGanado,
    maxLevels,
    // Ranking helpers
    sendRanking,
    user,
    juegoPerdido,
    snakeStore,
    rankingRef,
  }
}
