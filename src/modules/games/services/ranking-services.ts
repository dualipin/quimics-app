import api from '@/services/api'

type Ranking = {
  id?: number
  name: string
  user: number
  score: number
  username: string
}

export const rankingServices = () => {
  const API_BASE_URL = '/v1/games/ranking'

  const getRanking = async (name: string) => {
    try {
      const response = await api.get<Ranking[]>(`${API_BASE_URL}/list/${name}`)
      if (!response.data) {
        throw new Error('Failed to fetch ranking')
      }
      return response.data
    } catch (error) {
      console.error('Error fetching ranking:', error)
      throw error
    }
  }

  const sendRanking = async (ranking: Ranking) => {
    try {
      const response = await api.post<Ranking>(API_BASE_URL + '/create', ranking)
      if (!response.data) {
        throw new Error('Failed to send ranking')
      }
      return response.data
    } catch (error) {
      console.error('Error sending ranking:', error)
      throw error
    }
  }

  return {
    getRanking,
    sendRanking,
  }
}
