import api from '@/services/api'
import type { TChemicalElement } from '../types/ChemicalElement'
import { AxiosError } from 'axios'

const BASE_URL = '/v1/games/periodic-table/elements'

export async function getChemicalsElements() {
  try {
    const response = await api.get<TChemicalElement[]>(BASE_URL)
    return response.data
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al cargar los elementos químicos:', error.message)
    } else if (error instanceof AxiosError) {
      console.error(
        'Error al cargar los elementos químicos:',
        error.message,
        'Status:',
        error.response?.status,
        'Data:',
        error.response,
      )
    } else {
      console.error('Error al cargar los datos', error)
    }
    throw error
  }
}

export function getChemicalElementAudio(number: number) {
  // const response = await api.get(`${BASE_URL}/${number}/stream`, {
  //   responseType: 'blob',
  //   headers: {
  //     Range: 'bytes=0-', // inicia con un rango básico
  //   },
  // })

  // const blob = new Blob([response.data], { type: 'audio/mpeg' })
  // return URL.createObjectURL(blob)
  return `${import.meta.env.VITE_API_HOST}/api${BASE_URL}/${number}/stream`
}
