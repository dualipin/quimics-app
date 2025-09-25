<script setup lang="ts">
import { onMounted } from 'vue'
import { usePeriodicTableStore } from '../stores/periodic-table-store'
import ChemicalElement from './ChemicalElement.vue'
import { usePeriodicTableBoard } from '../composables/usePeriodicTableBoard'
import PeriodicTableCategories from './PeriodicTableCategories.vue'

const periodicTable = usePeriodicTableStore()
const { orderInBoard, openModal } = usePeriodicTableBoard()

onMounted(() => {
  periodicTable.fetchElements()
})
</script>

<template>
  <div
    class="mt-24 grid w-auto min-w-[110rem] scale-none grid-cols-18 grid-rows-9 gap-0.5 px-16 xl:scale-90"
  >
    <PeriodicTableCategories />
    <ChemicalElement
      @element-clicked="openModal"
      v-for="element in periodicTable.elements"
      :element="element"
      :style="{
        ...orderInBoard(element),
      }"
    />
  </div>
</template>
