<script setup lang="ts">
import Aos from 'aos'
import { onMounted } from 'vue'
import { useThemeStore } from './stores'

const { listenToChange } = useThemeStore()

onMounted(() => {
  listenToChange()
  setTimeout(() => window.HSStaticMethods.autoInit(), 100)
  Aos.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
  })
})
</script>

<template>
  <RouterView />
</template>
