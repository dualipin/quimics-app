<script setup lang="ts">
import SimpleNav from '@/components/ui/SimpleNav.vue'
</script>

<template>
  <SimpleNav class="text-gray-800 dark:text-gray-200">
    <h2 class="text-lg font-semibold">Memorama</h2>

    <ul class="flex items-center gap-x-2">
      <li
        :class="$route.name === 'games.quiz' ? 'bg-gray-50 shadow dark:bg-gray-700' : ''"
        class="flex items-center rounded-2xl px-3 py-1"
      >
        <RouterLink :to="{ name: 'games.quiz' }"> Juego </RouterLink>
      </li>
      <li
        :class="$route.name === 'games.quiz.shop' ? 'bg-gray-50 shadow dark:bg-gray-700' : ''"
        class="flex items-center rounded-2xl px-3 py-1"
      >
        <RouterLink :to="{ name: 'games.quiz.shop' }"> Tienda </RouterLink>
      </li>
    </ul>
  </SimpleNav>
</template>
