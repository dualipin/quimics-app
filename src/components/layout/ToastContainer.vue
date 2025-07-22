<!-- src/components/ui/ToastContainer.vue -->
<template>
  <TransitionGroup
    tag="ul"
    name="list"
    class="fixed end-1 top-16 z-10 flex flex-col gap-2 lg:end-4"
  >
    <Toast
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      :message="toast.message"
      :type="toast.type"
      @close="toastStore.remove(toast.id)"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useToastStore } from '@/stores/toast-store'
import Toast from '../ui/Toast.vue'

const toastStore = useToastStore()
</script>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
