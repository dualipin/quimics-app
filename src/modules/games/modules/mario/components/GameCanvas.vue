<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch, type PropType } from 'vue'
import Phaser from 'phaser'
import { createGame } from '../game'
import type { CharacterKey } from '../types/Character'

const props = defineProps({
  character: {
    type: String as PropType<CharacterKey>,
    required: true,
  },
  difficulty: {
    type: Number,
    required: true,
  },
})

const containerRef = ref<HTMLDivElement | null>(null)
let game: Phaser.Game | null = null

onMounted(() => {
  game = createGame({ parent: containerRef.value!, character: props.character })
})

watch(
  () => props.character,
  (c) => {
    console.log('Character changed to:', c)
    // Forward character change to the game via a global event
    game?.events.emit('character:change', c)
  },
)

watch(
  () => props.difficulty,
  (d) => {
    console.log('Difficulty changed to:', d)
    // Forward difficulty change to the game via a global event
    game?.events.emit('difficulty:change', d)
  },
)

onBeforeUnmount(() => {
  game?.destroy(true)
  game = null
})
</script>

<template>
  <div class="flex-1" ref="containerRef"></div>
</template>
