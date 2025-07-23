import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { loginUser } from '../services/auth-services'
import type { TUserLoginSchema, TUserSchema } from '../schemas/User'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<TUserSchema | null>(null)
    const router = useRouter()

    const login = async (credentials: TUserLoginSchema) => {
      try {
        user.value = await loginUser(credentials)
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Login failed')
      }
    }

    watch(user, (newUser, oldUser) => {
      if (oldUser && !newUser) {
        router.push({ name: 'auth.login' })
      }
    })

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
