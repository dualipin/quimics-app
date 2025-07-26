import api from '@/services/api'
import type { Question } from '../types/Quiz'

const V1_QUIZ_API_URL = 'v1/games/quizzes'

export async function getRandomQuizzes(count: number): Promise<Question[]> {
  try {
    const response = await api.get<Question[]>(`${V1_QUIZ_API_URL}/random/${count}`)
    return response.data
  } catch (error) {
    console.error('Error fetching random quizzes:', error)
    throw error
  }
}

export async function getAIQuizzes(count: number): Promise<Question[]> {
  try {
    const response = await api.get<Question[]>(`${V1_QUIZ_API_URL}/ai/${count}`)
    return response.data
  } catch (error) {
    console.error('Error fetching AI quizzes:', error)
    throw error
  }
}

export async function getAllQuestions() {
  try {
    const response = await api.get<Question[]>(`${V1_QUIZ_API_URL}/`)
    return response.data
  } catch (error) {
    console.error('Error fetching all questions:', error)
    throw error
  }
}
