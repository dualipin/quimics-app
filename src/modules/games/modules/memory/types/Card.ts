export type TGameCard = Partial<{
  id: number
  name: string
  formula: string
  symbol?: string
  atomicNumber?: number
  type: 'element' | 'compound'
  icon: string
  isFlipped?: boolean
  isMatched?: boolean
}>
