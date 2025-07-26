<template>
  <div
    ref="compoundCard"
    class="compound-display overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
  >
    <h2
      ref="nameElement"
      class="mb-2 text-2xl font-bold text-gray-800 transition-colors duration-300 md:text-3xl dark:text-white"
    >
      {{ compound.name }}
    </h2>
    <div
      ref="formulaContainer"
      class="inline-block rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 dark:border-blue-800 dark:bg-blue-900/30"
    >
      <span
        ref="formulaElement"
        class="font-mono text-xl font-bold text-blue-600 md:text-2xl dark:text-blue-400"
      >
        {{ compound.formula }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const props = defineProps<{
  compound: { name: string; formula: string }
}>()

const compoundCard = ref<HTMLElement | null>(null)
const nameElement = ref<HTMLElement | null>(null)
const formulaContainer = ref<HTMLElement | null>(null)
const formulaElement = ref<HTMLElement | null>(null)

onMounted(() => {
  if (compoundCard.value && nameElement.value && formulaContainer.value && formulaElement.value) {
    // Configuración inicial
    gsap.set([nameElement.value, formulaContainer.value], {
      opacity: 0,
      y: 20,
    })

    // Animación del contenedor
    gsap.from(compoundCard.value, {
      duration: 0.5,
      scale: 0.98,
      opacity: 0.8,
      ease: 'power2.out',
    })

    // Animación escalonada del contenido
    const tl = gsap.timeline({ defaults: { ease: 'back.out(1.2)' } })
    tl.to(nameElement.value, {
      opacity: 1,
      y: 0,
      duration: 0.6,
    })
      .to(
        formulaContainer.value,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        '-=0.3',
      )
      .from(
        formulaElement.value,
        {
          scale: 0.8,
          duration: 0.4,
        },
        '-=0.2',
      )

    // Efecto hover
    compoundCard.value.addEventListener('mouseenter', () => {
      gsap.to(compoundCard.value, {
        y: -3,
        duration: 0.3,
      })
    })
    compoundCard.value.addEventListener('mouseleave', () => {
      gsap.to(compoundCard.value, {
        y: 0,
        duration: 0.3,
      })
    })
  }
})
</script>

<style scoped>
.compound-display:hover .formula-container {
  transform: translateY(-2px);
}

@keyframes highlight {
  0% {
    background-color: rgba(59, 130, 246, 0.1);
  }
  100% {
    background-color: transparent;
  }
}

.highlight-animation {
  animation: highlight 1.5s ease-out;
}
</style>
