import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginUser } from '../services/auth-services'
import type { TUserLoginSchema, TUserSchema } from '../schemas/User'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<TUserSchema | null>(null)

    const login = async (credentials: TUserLoginSchema) => {
      try {
        user.value = await loginUser(credentials)
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Login failed')
      }
    }

    const logout = () => {
      user.value = null
    }

    return {
      user,
      login,
      logout,
    }
  },
  { persist: true },
)
