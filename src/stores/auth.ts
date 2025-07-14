import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<null | { role: string; username: string; id: number }>(
    JSON.parse(localStorage.getItem('user') || 'null'),
  )

  const isAuthenticated = computed(() => !!user.value)

  function getRole() {
    if (user.value) {
      return user.value.role
    }
    return null
  }

  function setUser(userData: { role: string; username: string; id: number }) {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }

  function clearUser() {
    user.value = null
    localStorage.removeItem('user')
  }

  return { isAuthenticated, getRole, setUser, clearUser, user }
})
