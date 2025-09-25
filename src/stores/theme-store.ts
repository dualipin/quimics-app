import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')

    const isDarkMode = ref(prefersDarkScheme.matches)

    const applyThemeToDocument = (isDark: boolean) => {
      document.documentElement.classList.toggle('dark', isDark)
    }

    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value
      applyThemeToDocument(isDarkMode.value)
    }

    const setDarkMode = (value: boolean) => {
      isDarkMode.value = value
      applyThemeToDocument(value)
    }

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      isDarkMode.value = e.matches
    }

    function listenToSystemChanges() {
      prefersDarkScheme.addEventListener('change', handleSystemThemeChange)
    }

    function stopListeningToSystemChanges() {
      prefersDarkScheme.removeEventListener('change', handleSystemThemeChange)
    }

    watch(
      isDarkMode,
      (newValue) => {
        applyThemeToDocument(newValue)
      },
      { immediate: true },
    )

    return {
      isDarkMode,
      toggleTheme,
      setDarkMode,
      listenToSystemChanges,
      stopListeningToSystemChanges,
    }
  },
  {
    persist: true,
  },
)
