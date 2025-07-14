<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{
  name: string
  symbol: string
  atomicNumber: number
  atomicMass: number
}>()
</script>

<template>
  <template>
    <div class="p-4 border rounded shadow-lg">
      <h1 class="text-2xl font-bold mb-2">Elemento</h1>
      <p class="text-gray-700">Símbolo: {{ props.symbol }}</p>
      <p class="text-gray-700">Nombre: {{ props.name }}</p>
      <p class="text-gray-700">Número atómico: {{ props.atomicNumber }}</p>
      <p class="text-gray-700">Masa atómica: {{ props.atomicMass }}</p>
    </div>
  </template>
</template>
