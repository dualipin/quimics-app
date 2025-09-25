export enum QuestionPoints {
  Easy = 10,
  Medium = 20,
  Hard = 30,
}

export enum DifficultyQuestionCost {
  Easy = 10,
  Medium = 20,
  Hard = 30,
}

export type QuestionDifficulty = 'easy' | 'medium' | 'hard'

export interface Question {
  id?: number | null
  question: string
  options: string[]
  answer: string
  difficulty: QuestionDifficulty
  created_by: 'system' | 'IA' | string
}
