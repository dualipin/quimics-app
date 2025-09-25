<template>
  <div ref="conveyorContainer" class="conveyor relative mx-auto w-full overflow-hidden py-6">
    <div ref="conveyorTrack" class="flex gap-4 px-4" :style="{ width: `${props.elements.length * 120}px` }">
      <button v-for="(el, index) in props.elements" :key="index" @click="handleElementClick(el, index)"
        class="element-button flex h-24 w-24 flex-shrink-0 transform items-center justify-center rounded-full border-2 border-blue-100 bg-white text-xl font-bold text-gray-800 shadow-md transition-all duration-300 hover:scale-110 hover:border-blue-300 hover:shadow-lg active:scale-95 dark:border-blue-800 dark:bg-gray-700 dark:text-white dark:hover:border-blue-500">
        {{ el }}
      </button>
    </div>
    <div ref="conveyorTrackInvert" class="mt-4 flex gap-4 px-4"
      :style="{ width: `${duplicatedElements.length * 120}px` }">
      <button v-for="(el, index) in duplicatedElements" :key="index" @click="handleElementClick(el, index)"
        class="element-button flex h-24 w-24 flex-shrink-0 transform items-center justify-center rounded-full border-2 border-blue-100 bg-white text-xl font-bold text-gray-800 shadow-md transition-all duration-300 hover:scale-110 hover:border-blue-300 hover:shadow-lg active:scale-95 dark:border-blue-800 dark:bg-gray-700 dark:text-white dark:hover:border-blue-500">
        {{ el }}
      </button>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import gsap from 'gsap'

const props = defineProps<{ elements: string[] }>()
const emit = defineEmits(['select'])

const conveyorContainer = ref<HTMLElement | null>(null)
const conveyorTrack = ref<HTMLElement | null>(null)
const conveyorTrackInvert = ref<HTMLElement | null>(null)
const elementButtons = ref<HTMLElement[]>([])

let animation: gsap.core.Tween
let animationInvert: gsap.core.Tween | null = null
let direction = 1

const duplicatedElements = computed(() => [...props.elements, ...props.elements])

const startConveyorAnimation = () => {
  if (!conveyorTrack.value || !conveyorContainer.value || !conveyorTrackInvert.value) return

  const trackWidth = conveyorTrack.value.scrollWidth
  const containerWidth = conveyorContainer.value.offsetWidth
  const duration = props.elements.length

  // Banda superior: se mueve hacia la izquierda
  animation = gsap.to(conveyorTrack.value, {
    x: `-=${trackWidth - containerWidth}`,
    duration: duration,
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize((x) => parseFloat(x) % (trackWidth - containerWidth)), // bucle infinito
    },
  })
  animationInvert = gsap.fromTo(
    conveyorTrackInvert.value,
    { x: -trackWidth },
    {
      x: containerWidth,
      duration: duration,
      ease: 'none',
      repeat: -1,
    },
  )
}

const handleElementClick = (el: string, index: number) => {
  emit('select', el)

  if (elementButtons.value[index]) {
    gsap.to(elementButtons.value[index], {
      duration: 0.2,
      scale: 0.8,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
      backgroundColor: '#3B82F6',
      color: 'white',
    })
  }
}

onMounted(async () => {
  await nextTick()
  const topButtons = conveyorTrack.value?.querySelectorAll('.element-button') || []
  const bottomButtons = conveyorTrackInvert.value?.querySelectorAll('.element-button') || []

  // Combine both NodeLists into a single array
  elementButtons.value = [...Array.from(topButtons), ...Array.from(bottomButtons)] as HTMLElement[]

  startConveyorAnimation()

  if (elementButtons.value.length > 0) {
    gsap.from(elementButtons.value, {
      duration: 0.6,
      opacity: 1,
      y: 0,
      stagger: 0.1,
      ease: 'back.out(1.4)',
    })
  }
})

onBeforeUnmount(() => {
  if (animation) animation.kill()
  if (animationInvert) animationInvert.kill()
})
</script>

<style scoped>
.conveyor::before,
.conveyor::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100px;
  z-index: 2;
  pointer-events: none;
}

.conveyor::before {
  left: 0;
  background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
}

.conveyor::after {
  right: 0;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
}

.dark .conveyor::before {
  background: linear-gradient(90deg, rgba(17, 24, 39, 1) 0%, rgba(17, 24, 39, 0) 100%);
}

.dark .conveyor::after {
  background: linear-gradient(90deg, rgba(17, 24, 39, 0) 0%, rgba(17, 24, 39, 1) 100%);
}
</style>
