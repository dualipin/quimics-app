<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import PeriodicTableBoard from '../components/PeriodicTableBoard.vue'
import { SplitText } from 'gsap/SplitText'
import ChemicalElementModal from '../components/ChemicalElementModal.vue'

gsap.registerPlugin(SplitText)

onMounted(() => {
  let split = SplitText.create('#title', { type: 'words' })
  gsap.from(split.words, {
    x: 'random(-100, 100)',
    y: 'random(-100, 100)',
    stagger: 0.1,
    onComplete: () => split.revert(),
  })
})
</script>

<template>
  <div class="overflow-auto overflow-x-scroll pb-10">
    <div class="relative mx-auto flex w-full flex-col items-center">
      <h1 class="10 pt-8 text-center text-2xl font-bold dark:text-white">
        <span id="title" class="text-2xl font-bold md:text-4xl dark:text-white">
          Tabla Periódica de los Elementos
        </span>
      </h1>

      <p class="animate-fade-in-up">
        Explora la tabla periódica de los elementos químicos. Haz clic en un elemento para ver más
        detalles.
      </p>
    </div>

    <PeriodicTableBoard />
    <ChemicalElementModal />
  </div>
</template>
