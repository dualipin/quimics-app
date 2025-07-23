export interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  explanation: string
  level: number
  category: string
  isAI?: boolean
}

export interface ShopItem {
  id: string
  name: string
  description: string
  price: number
  type: 'question' | 'hint' | 'powerup'
  difficulty: 'easy' | 'medium' | 'hard'
  content?: Question | Question[]
}
