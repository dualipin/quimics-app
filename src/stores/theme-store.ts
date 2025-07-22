import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)')

    const isDarkMode = ref(false)

    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value
      document.documentElement.classList.toggle('dark', isDarkMode.value)
    }

    const setDarkMode = (value: boolean) => {
      isDarkMode.value = value
      document.documentElement.classList.toggle('dark', value)
      document.documentElement.classList.toggle('light', !value)
    }

    const handleTheme = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches)
    }

    function listenToChange() {
      setDarkMode(isDarkMode.value)
      matchMedia.addEventListener('change', handleTheme)
    }

    return {
      isDarkMode,
      toggleTheme,
      setDarkMode,
      listenToChange,
    }
  },
  { persist: true },
)
