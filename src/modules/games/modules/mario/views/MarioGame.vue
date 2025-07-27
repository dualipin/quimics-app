<template>
  <button @click="reloadGame" class="mx-2 text-black dark:text-white">Reiniciar Juego</button>
  <div id="game" class="game">
    <img
      id="gif"
      src="/assets/others/loading.gif"
      alt="Loading animation"
      class="loading-gif gif"
    />
    <img
      id="gif-shadow"
      src="/assets/others/loading.gif"
      alt="Loading animation shadow"
      class="loading-gif gif-shadow"
    />
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'

function reloadGame() {
  location.reload()
}

const scripts = [
  'https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js',
  'https://html2canvas.hertzen.com/dist/html2canvas.min.js',
  '/game.js',
  '/game/animations.js',
  '/game/blocks.js',
  '/game/strucutres.js',
  '/game/settings.js',
  '/game/fireball.js',
  '/game/player-control.js',
  '/game/hud-control.js',
  '/game/entities-control.js',
  '/helpers/screenshot.js',
  '/helpers/window-title.js',
]

onMounted(() => {
  scripts.forEach((src) => {
    const script = document.createElement('script')
    script.src = src
    script.type = 'text/javascript'
    document.body.appendChild(script)
  })
})

onBeforeUnmount(() => {
  const gameElement = document.getElementById('game')
  if (gameElement) {
    gameElement.innerHTML = ''
  }
  const gif = document.getElementById('gif')
  if (gif) {
    gif.remove()
  }
  const gifShadow = document.getElementById('gif-shadow')
  if (gifShadow) {
    gifShadow.remove()
  }

  scripts.forEach((src) => {
    const script = document.querySelector(`script[src="${src}"]`)
    if (script) {
      script.remove()
    }
  })

  location.reload()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500;700&display=swap');

@font-face {
  font-family: pixel_nums;
  src: url('../fonts/SuperMario.ttf');
}
html,
body {
  zoom: 100%;
  max-zoom: 100%;
  min-zoom: 100%;
  background: rgb(132, 132, 255);
  margin: 0px;
  padding: 0px;
  overflow: hidden;
  height: 100%;
  width: 100%;
  color: #f0f0f0;
  font-family: pixel_nums;
}
.game {
  margin: 0px;
  padding: 0px;
  height: 100%;
  width: 100%;
  font-family: pixel_nums;
  display: flex;
  align-items: center;
  justify-content: center;
}
.gif {
  height: 30%;
  position: absolute;
  z-index: 100;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.gif-shadow {
  height: 30%;
  position: absolute;
  z-index: 99;
  top: 31%;
  left: 51%;
  transform: translate(-50%, -50%);
  opacity: 0.2;
  filter: brightness(5%) blur(5px);
}
</style>
