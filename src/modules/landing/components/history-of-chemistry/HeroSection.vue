<template>
  <section id="hero" class="flex min-h-dvh items-center justify-center text-center">
    <div class="mx-auto max-w-4xl px-4">
      <motion.div
        :initial="{ opacity: 0, y: 50 }"
        :animate="{ opacity: 1, y: 0, transition: { duration: 0.8 } }"
      >
        <h1 class="mb-5 text-3xl font-bold !text-black md:text-7xl dark:!text-white">
          <span id="title"> Historia de la Química </span>
        </h1>
        <p class="mb-8 text-xl text-gray-700 md:text-2xl dark:text-gray-300">
          Un viaje a través de los descubrimientos que moldearon nuestra comprensión de la materia
        </p>
        <button
          @click="$router.push({ name: 'games.periodic-table' })"
          class="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 font-semibold shadow-lg shadow-cyan-500/20 transition-transform duration-300 hover:scale-105 dark:from-cyan-400 dark:to-blue-500 dark:shadow-cyan-400/20"
        >
          Explorar la tabla periódica
        </button>
      </motion.div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import { onMounted } from 'vue'
import { SplitText } from 'gsap/SplitText'
import gsap from 'gsap'

gsap.registerPlugin(SplitText)

onMounted(() => {
  // split elements with the class "split" into words and characters
  let split = SplitText.create('#title', { type: 'chars' })

  // now animate the characters in a staggered fashion
  gsap.from(split.chars, {
    y: -50,
    duration: 2,
    stagger: 0.2,
    repeat: -1,
    yoyo: true,
    ease: 'back.inOut',
    textShadow: '0px 0px 10px rgba(0, 255, 255, 0.5)',
    color: '#00bcd4',
    scale: 1.2,
    onComplete: () => split.revert(),
  })
})
</script>
