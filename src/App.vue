<script setup lang="ts">
import Aos from 'aos'
import { onMounted, onBeforeUnmount } from 'vue'
import { useThemeStore } from './stores'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.listenToSystemChanges()

  setTimeout(() => {
    window.HSStaticMethods.autoInit()
  }, 100)

  Aos.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
  })
})

onBeforeUnmount(() => {
  themeStore.stopListeningToSystemChanges()
})
</script>

<template>
  <RouterView />
</template>
