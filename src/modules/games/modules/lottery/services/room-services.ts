import api from '@/services/api'

const baseUrl = 'v1/games/lottery/rooms'

export const roomServices = () => {
  const getAllRooms = async () => {
    try {
      const response = await api.get(baseUrl)
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error(`Failed to fetch rooms: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error fetching rooms:', error)
      throw error
    }
  }

  const createRoom = async (name: string) => {
    try {
      const response = await api.post<string>(baseUrl, { name })
      if (response.status === 201) {
        return response.data
      } else {
        throw new Error(`Failed to create room: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error creating room:', error)
      throw error
    }
  }

  return {
    getAllRooms,
    createRoom,
  }
}
