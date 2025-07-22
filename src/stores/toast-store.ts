import { defineStore } from 'pinia'

let id = 0

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as { id: number; message: string; type: 'success' | 'error' | 'info' | undefined }[],
  }),
  actions: {
    show(message: string, type: 'success' | 'error' | 'info' | undefined = undefined) {
      this.toasts.push({ id: ++id, message, type })
    },
    remove(id: number) {
      this.toasts = this.toasts.filter((t) => t.id !== id)
    },
  },
})
