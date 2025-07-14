<script setup lang="ts">
import { ref } from 'vue'
import { CategoriaElemento, type ElementoQuimico } from '@/types/Elemento'

const props = defineProps<{
  elemento: ElementoQuimico
}>()
const elemento = ref<ElementoQuimico | null>(props.elemento)
</script>

<template>
  <div
    :class="[
      { 'bg-red-700 dark:bg-red-800': elemento?.categoria === CategoriaElemento.MetalesAlcalinos },
      {
        'bg-orange-700 dark:bg-orange-800':
          elemento?.categoria === CategoriaElemento.Alcalinoterreos,
      },
      { 'bg-lime-500 dark:bg-lime-600': elemento?.categoria === CategoriaElemento.OtrosMetales },
      {
        'bg-amber-300 dark:bg-amber-400':
          elemento?.categoria === CategoriaElemento.MetalesTransicion,
      },
      { 'bg-yellow-600 dark:bg-yellow-700': elemento?.categoria === CategoriaElemento.Lantanidos },
      { 'bg-yellow-500 dark:bg-yellow-600': elemento?.categoria === CategoriaElemento.Actinidos },
      { 'bg-green-600 dark:bg-green-700': elemento?.categoria === CategoriaElemento.Metaloides },
      { 'bg-indigo-300 dark:bg-indigo-400': elemento?.categoria === CategoriaElemento.NoMetal },
      { 'bg-indigo-200 dark:bg-indigo-300': elemento?.categoria === CategoriaElemento.Halogenos },
      { 'bg-slate-300 dark:bg-slate-400': elemento?.categoria === CategoriaElemento.GasesNobles },
      {
        'bg-gray-400':
          !elemento?.categoria || elemento?.categoria === CategoriaElemento.ElementosDesconocidos,
      },
    ]"
    class="aspect-square flex flex-col border-[1.5px] border-black p-2 cursor-pointer hover:brightness-90 hover:scale-125 transition-transform hover:shadow-2xl"
  >
    <div class="flex flex-col items-center justify-center">
      <span class="text-sm font-bold">{{ elemento?.numeroAtomico }}</span>
      <span class="text-3xl font-bold">{{ elemento?.simbolo }}</span>
      <span class="text-xs">{{ elemento?.pesoAtomico }}</span>
      <span class="text-xs">{{ elemento?.nombre }}</span>
    </div>
    <!-- <div class="flex justify-between items-center">
      <span class="text-lg">{{ elemento?.numeroAtomico }}</span>
      <div class="flex flex-col">
        <span class="text-xs">{{ elemento?.pesoAtomico }}</span>
        <span class="text-xs text-right">{{ elemento?.valencia }}</span>
      </div>
    </div>
    <div class="flex justify-around items-center">
      <div class="flex flex-col text-[0.5rem]">
        <span>{{ elemento?.puntoEbullicion }}</span>
        <span>{{ elemento?.puntoFusion }}</span>
        <span>{{ elemento?.densidad }}</span>
      </div>
      <span class="text-4xl font-bold">{{ elemento?.simbolo }}</span>
    </div>
    <span class="text-center text-xs">{{ elemento?.estructuraAtomica }}</span>
    <span class="text-center text-sm">{{ elemento?.nombre }}</span> -->
  </div>
</template>
