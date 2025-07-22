<script setup lang="ts">
import ToggleThemeButton from '@/components/ToggleThemeButton.vue'
import { ArrowLeft } from 'lucide-vue-next'
</script>

<template>
  <div class="sticky top-0 z-50 p-2">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between rounded-lg border border-gray-50 bg-white/10 px-4 py-2 shadow-md backdrop-blur-md dark:border-gray-950 dark:bg-black/10 dark:shadow-gray-900"
    >
      <RouterLink
        :to="{ name: 'games' }"
        class="flex items-center gap-2 text-lg font-bold dark:text-white"
      >
        <ArrowLeft /> Quimics Games Menu
      </RouterLink>

      <ToggleThemeButton class="text-black dark:text-white" />
    </nav>
  </div>
</template>
