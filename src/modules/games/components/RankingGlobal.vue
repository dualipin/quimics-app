<template>
  <div class="mx-auto max-w-2xl rounded-lg bg-white p-4 shadow-lg md:p-6 dark:bg-gray-800">
    <h2 class="mb-6 text-center text-2xl font-bold text-gray-800 md:text-3xl dark:text-white">
      Ranking
    </h2>
    <ul class="space-y-3">
      <li
        v-for="(player, index) in ranking"
        :key="player.id || index"
        class="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100 md:p-4 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        <div class="flex items-center space-x-3">
          <span
            class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold md:h-10 md:w-10 md:text-base"
            :class="{
              'bg-yellow-400 text-yellow-900': index === 0,
              'bg-gray-300 text-gray-700 dark:bg-gray-500 dark:text-gray-200': index === 1,
              'bg-orange-400 text-orange-900': index === 2,
              'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': index > 2,
            }"
          >
            {{ index + 1 }}
          </span>
          <span class="truncate text-sm font-medium text-gray-800 md:text-base dark:text-white">
            {{ player.username }}
          </span>
        </div>
        <span class="text-sm font-semibold text-gray-600 md:text-base dark:text-gray-300">
          {{ player.score }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { rankingServices } from '@/modules/games/services/ranking-services'

const props = defineProps<{
  game: string
}>()

const ranking = ref<Array<{ id?: number; username: string; score: number }>>([])

const { getRanking } = rankingServices()

const loadRanking = async () => {
  try {
    ranking.value = await getRanking(props.game)
  } catch (error) {
    console.error('Error fetching ranking:', error)
  }
}

defineExpose({
  loadRanking,
})

onMounted(loadRanking)

// Si el prop `game` cambia, recarga el ranking
watch(() => props.game, loadRanking)
</script>
