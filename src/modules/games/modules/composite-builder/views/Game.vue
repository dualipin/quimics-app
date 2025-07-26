<template>
  <div class="overflow-hidden">
    <div class="mx-auto flex max-w-3xl flex-col gap-4 p-4">
      <CompoundDisplay :compound="currentCompound" />
      <Timer :timeLeft="timeLeft" />
      <Score :score="score" />
      <div v-if="selectedElements.length > 0" class="mt-4 flex flex-wrap gap-2">
        <button
          @click="selectedElements = []"
          class="inline-flex items-center justify-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-200"
        >
          Reset Selection
        </button>
        <span
          v-for="(element, index) in selectedElements"
          :key="index"
          class="inline-flex items-center justify-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200"
        >
          {{ element }}
        </span>
      </div>
    </div>
    <Conveyor :elements="conveyorElements" @select="handleSelection" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { compuestos } from '../../snake/data/compounds'
import CompoundDisplay from '../components/CompoundDisplay.vue'
import Conveyor from '../components/Conveyor.vue'
import Timer from '../components/Timer.vue'
import Score from '../components/Score.vue'
import { elementos } from '../../snake/data/elements'
import JSConfetti from 'js-confetti'

interface Compound {
  name: string
  formula: string
  elements: string[]
}

const jsConfetti = new JSConfetti()

const compounds: Compound[] = compuestos.map((compound) => ({
  name: compound.nombre,
  formula: compound.formula,
  elements: compound.elementos.map((el) => el),
}))

const currentCompoundIndex = ref(0)
const currentCompound = ref<Compound>(compounds[0])
const conveyorElements = ref<string[]>([])
const selectedElements = ref<string[]>([])
const score = ref(0)
const timeLeft = ref(30)

function generateConveyorElements() {
  const pool = elementos.map((el) => el.simbolo)
  conveyorElements.value = Array.from(
    { length: pool.length * 2 },
    () => pool[Math.floor(Math.random() * pool.length)],
  )
}

function handleSelection(element: string) {
  selectedElements.value.push(element)
  validateSelection()
}

function validateSelection() {
  const required = [...currentCompound.value.elements]
  const selected = [...selectedElements.value]

  required.sort()
  selected.sort()

  if (JSON.stringify(required) === JSON.stringify(selected)) {
    score.value += 10
    jsConfetti.addConfetti({
      emojis: ['🎉', '🥳', '✨'],
      confettiNumber: 100,
    })
    nextCompound()
  }
}
function nextCompound() {
  selectedElements.value = []
  currentCompoundIndex.value = (currentCompoundIndex.value + 1) % compounds.length
  currentCompound.value = compounds[currentCompoundIndex.value]
  generateConveyorElements()
  timeLeft.value = 30
}

onMounted(() => {
  generateConveyorElements()
  setInterval(() => {
    if (timeLeft.value > 0) timeLeft.value--
    else nextCompound()
  }, 1000)
})
</script>
