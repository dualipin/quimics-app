import api from '@/services/api'
import type { Quiz } from '../types/Quiz'

const V1_QUIZ_API_URL = 'v1/games/quizzes'

export async function getRandomQuizzes(count: number): Promise<Quiz[]> {
  try {
    const response = await api.get<Quiz[]>(`${V1_QUIZ_API_URL}/random/${count}`)
    return response.data
  } catch (error) {
    console.error('Error fetching random quizzes:', error)
    throw error
  }
}

export async function getAIQuizzes(count: number): Promise<Quiz[]> {
  try {
    const response = await api.get<Quiz[]>(`${V1_QUIZ_API_URL}/ai/${count}`)
    return response.data
  } catch (error) {
    console.error('Error fetching AI quizzes:', error)
    throw error
  }
}
