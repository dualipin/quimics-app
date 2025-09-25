import api from '@/services/api'
import type { TUserLoginSchema, TUserRegisterSchema, TUserSchema } from '../schemas/User'

const AUTH_URL = '/v1/auth'

export async function loginUser(credentials: TUserLoginSchema): Promise<TUserSchema> {
  try {
    const response = await api.post<TUserSchema>(`${AUTH_URL}/login`, credentials)

    if (!response.data || !response.data.id) {
      throw new Error('Invalid login response')
    }

    return response.data
  } catch (error) {
    throw new Error('Login failed.')
  }
}

export async function registerUser(userData: TUserRegisterSchema): Promise<TUserSchema> {
  try {
    const response = await api.post<TUserSchema>(`${AUTH_URL}/register`, userData)

    if (!response.data || !response.data.id) {
      throw new Error('Invalid registration response')
    }

    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Registration failed.')
  }
}

export async function recoverPassword(email: string): Promise<string> {
  try {
    return (await api.post(`${AUTH_URL}/recover`, { email })).data.message
  } catch (error) {
    console.error(error)
    throw new Error('Error al recuperar la contraseña.')
  }
}
