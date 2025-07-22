<script setup lang="ts">
import ToastContainer from '@/components/layout/ToastContainer.vue'
import Navbar from '@/modules/games/components/Navbar.vue'
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-black dark:to-gray-900"
  >
    <Navbar v-if="$route.name !== 'games'" />
    <RouterView />
    <ToastContainer />
  </div>
</template>
