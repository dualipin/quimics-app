<script setup lang="ts">
import { useThemeStore } from '@/stores'
import { SunIcon, MoonIcon } from 'lucide-vue-next'

const theme = useThemeStore()
</script>

<template>
  <button @click="theme.toggleTheme">
    <SunIcon v-if="theme.isDarkMode" class="size-5" />
    <MoonIcon v-else class="size-5" />
  </button>
</template>
