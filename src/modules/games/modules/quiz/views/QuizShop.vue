<template>
  <div class="container mx-auto max-w-4xl px-4 py-8">
    <h1 class="mb-8 text-3xl font-bold dark:text-white">Tienda de Preguntas</h1>

    <div class="mb-6 flex items-center justify-between">
      <div class="rounded-full bg-indigo-100 px-4 py-2 dark:bg-indigo-900/30">
        <span class="font-medium text-indigo-800 dark:text-indigo-200">
          Monedas: <span class="text-yellow-600 dark:text-yellow-400">{{ coins }}</span>
        </span>
      </div>

      <div class="flex space-x-2">
        <button
          @click="activeTab = 'system'"
          :class="[
            'rounded-full px-4 py-2 font-medium transition-colors',
            activeTab === 'system'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 dark:bg-neutral-700 dark:text-gray-300',
          ]"
        >
          Sistema
        </button>
        <button
          @click="activeTab = 'ai'"
          :class="[
            'rounded-full px-4 py-2 font-medium transition-colors',
            activeTab === 'ai'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 dark:bg-neutral-700 dark:text-gray-300',
          ]"
        >
          IA
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div
        v-for="item in shopItems"
        :key="item.id"
        class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800/90"
      >
        <div class="mb-3 flex items-start justify-between">
          <h3 class="text-lg font-semibold dark:text-white">{{ item.name }}</h3>
          <span
            class="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200"
          >
            {{ item.difficulty }}
          </span>
        </div>

        <p class="mb-4 text-gray-600 dark:text-gray-400">{{ item.description }}</p>

        <div class="flex items-center justify-between">
          <span class="font-bold text-yellow-600 dark:text-yellow-400"
            >{{ item.price }} monedas</span
          >
          <button
            @click="buyItem(item)"
            :disabled="coins < item.price"
            class="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserQuizStore } from '../stores/user-store'
import { useShop } from '../composables/useShop'

const userStore = useUserQuizStore()
const { shopItems, buyItem } = useShop()

const coins = computed(() => userStore.coins)
const activeTab = ref<'system' | 'ai'>('system')
</script>
