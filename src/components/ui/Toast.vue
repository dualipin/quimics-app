<template>
  <li v-if="visible" :class="toastClasses">
    <p class="pr-4">{{ message }}</p>
    <button
      @click="close"
      class="toast-close inline-flex size-5 items-center text-gray-500 hover:text-gray-950 focus:outline-none dark:text-gray-400 dark:hover:text-white"
    >
      <span class="sr-only">Cerrar</span>
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  </li>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import clsx from 'clsx'

const props = defineProps<{
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
}>()

const emit = defineEmits(['close'])

const visible = ref(true)

const toastClasses = computed(() =>
  clsx(
    'z-[60] flex w-72 items-start justify-between rounded-xl border p-4 text-sm shadow-lg backdrop-blur-lg',
    props.type === undefined &&
      'toast-background dark:bg-neutral-950/20 text-black dark:text-white ',
    props.type === 'success' &&
      'bg-green-200/50 text-green-800 dark:bg-green-950/20 dark:text-green-200',
    props.type === 'error' && 'bg-red-200/50 text-red-900 dark:bg-red-950/20 dark:text-red-200',
    props.type === 'info' && 'bg-blue-200/50 text-blue-900 dark:bg-blue-950/20 dark:text-blue-200',
  ),
)

function close() {
  visible.value = false
  emit('close')
}

onMounted(() => {
  setTimeout(close, props.duration ?? 5000)
})
</script>
