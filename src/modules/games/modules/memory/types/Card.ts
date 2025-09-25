export type TGameCard = Partial<{
  id: number
  name: string
  formula: string
  symbol?: string
  atomicNumber?: number
  category?: string
  funFact?: string
  type: 'element' | 'compound'
  icon: string
  isFlipped?: boolean
  isMatched?: boolean
  /** Color asignado al par (ambas cartas comparten este color) */
  pairColor?: string
  /** Color acento para crear un degradado vibrante */
  pairAccent?: string
  /** Indica si el color base del par es oscuro (para contraste de texto) */
  pairIsDark?: boolean
}>
