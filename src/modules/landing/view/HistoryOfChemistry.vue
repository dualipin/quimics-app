<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 text-black dark:from-gray-900 dark:to-black dark:text-white"
  >
    <main class="container mx-auto px-4 py-12">
      <HeroSection />

      <div class="max-w-6xl mx-auto">
        <TimelineSection />
        <KeyDiscoveries />
        <FamousChemists />
      </div>

      <ModernChemistry />
    </main>
  </div>
</template>

<script setup lang="ts">
import HeroSection from '../components/history-of-chemistry/HeroSection.vue'
import TimelineSection from '../components/history-of-chemistry/TimelineSection.vue'
import KeyDiscoveries from '../components/history-of-chemistry/KeyDiscoveries.vue'
import FamousChemists from '../components/history-of-chemistry/FamousChemists.vue'
import ModernChemistry from '../components/history-of-chemistry/ModernChemistry.vue'
</script>
