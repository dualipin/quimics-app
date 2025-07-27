<template>
  <div ref="container" id="container" class="fixed top-0 right-0 left-0 overflow-hidden">
    <span
      v-for="key in 20"
      :key="key"
      class="animate-iteration-count-infinite absolute aspect-square animate-pulse blur-xl"
      :style="{
        animationDelay: `${Math.random() * 5}s`,
        height: `${Math.random() * 200 + 50}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        borderRadius: `${Math.random() * 100}%`,
        background: `radial-gradient(circle, 
            rgba(${Math.floor(Math.random() * 100 + 155)},${Math.floor(Math.random() * 100 + 155)},${Math.floor(Math.random() * 255)}, 0.350) 0%, 
            rgba(${Math.floor(Math.random() * 100)},${Math.floor(Math.random() * 100 + 155)},${Math.floor(Math.random() * 100 + 155)}, 0.05) 100%)`,
        filter: `blur(${Math.random() * 20 + 10}px)`,
      }"
    ></span>

    <!-- Menú de selección con animaciones -->
    <div
      ref="menuPanel"
      class="ease-out-expo absolute top-16 left-6 z-10 origin-top-left transform rounded-2xl bg-white/90 p-6 backdrop-blur-md transition-all duration-500 dark:bg-gray-800/90"
      :class="{ 'shadow-2xl': isHovered }"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <div class="mb-4 flex items-center gap-3">
        <span ref="icon" class="text-2xl text-blue-600 dark:text-blue-400"> ⚗️ </span>
        <h2 ref="title" class="text-xl font-bold text-gray-800 dark:text-gray-100">
          Visualizador Molecular
        </h2>
      </div>

      <div class="space-y-4">
        <div ref="label">
          <label
            for="molecule"
            class="block text-sm font-medium text-gray-700 transition-colors dark:text-gray-300"
          >
            Selecciona una molécula:
          </label>
        </div>

        <select
          id="molecule"
          ref="selectElement"
          v-model="selectedMolecule"
          class="block w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm transition-all duration-300 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:border-blue-500 dark:focus:ring-blue-500/30"
        >
          <option
            v-for="(file, name) in MOLECULES"
            :key="name"
            :value="file"
            class="text-gray-800 dark:text-gray-200"
          >
            {{ name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as THREE from 'three'
import { TrackballControls } from 'three/addons/controls/TrackballControls.js'
import { PDBLoader } from 'three/addons/loaders/PDBLoader.js'
import { CSS2DObject, CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'

let camera: THREE.PerspectiveCamera
let scene: THREE.Scene
let renderer: THREE.WebGLRenderer
let labelRenderer: CSS2DRenderer
let controls: TrackballControls
let root: THREE.Group

const container = ref<HTMLElement | null>(null)
const menuPanel = ref<HTMLElement | null>(null)
const isHovered = ref(false)

const MOLECULES: Record<string, string> = {
  Etanol: 'ethanol.pdb',
  Aspirina: 'aspirin.pdb',
  Cafeína: 'caffeine.pdb',
  // Nicotina: 'nicotine.pdb',
  // LSD: 'lsd.pdb',
  // Cocaína: 'cocaine.pdb',
  Colesterol: 'cholesterol.pdb',
  Licopeno: 'lycopene.pdb',
  Glucosa: 'glucose.pdb',
  'Óxido de aluminio': 'Al2O3.pdb',
  Cubano: 'cubane.pdb',
  Cobre: 'cu.pdb',
  Fluorita: 'caf2.pdb',
  Sal: 'nacl.pdb',
  'Superconductor YBCO': 'ybco.pdb',
  Buckyball: 'buckyball.pdb',
  Grafito: 'graphite.pdb',
}

const selectedMolecule = ref<string>(MOLECULES['Etanol'])

watch(selectedMolecule, (newModel) => {
  loadMolecule(newModel)
})

const loader = new PDBLoader()
const offset = new THREE.Vector3()

const params = {
  molecule: 'caffeine.pdb',
}

const loadMolecule = (model: string) => {
  const url = `/pdb/${model}`

  // Limpiar escena
  while (root.children.length > 0) {
    const object = root.children[0]
    object.parent?.remove(object)
  }

  loader.load(url, (pdb) => {
    const geometryAtoms = pdb.geometryAtoms
    const geometryBonds = pdb.geometryBonds
    const json = pdb.json

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    const sphereGeometry = new THREE.IcosahedronGeometry(1, 3)

    geometryAtoms.computeBoundingBox()
    geometryAtoms.boundingBox?.getCenter(offset).negate()

    geometryAtoms.translate(offset.x, offset.y, offset.z)
    geometryBonds.translate(offset.x, offset.y, offset.z)

    const positions = geometryAtoms.getAttribute('position')
    const colors = geometryAtoms.getAttribute('color')

    const position = new THREE.Vector3()
    const color = new THREE.Color()

    for (let i = 0; i < positions.count; i++) {
      position.set(positions.getX(i), positions.getY(i), positions.getZ(i))

      color.setRGB(colors.getX(i), colors.getY(i), colors.getZ(i))

      const material = new THREE.MeshPhongMaterial({ color })
      const atomMesh = new THREE.Mesh(sphereGeometry, material)
      atomMesh.position.copy(position).multiplyScalar(75)
      atomMesh.scale.multiplyScalar(25)
      root.add(atomMesh)

      const atom = json.atoms[i]
      const labelDiv = document.createElement('div')
      labelDiv.className = 'label'
      labelDiv.style.color = `rgb(${atom[3][0]},${atom[3][1]},${atom[3][2]})`
      labelDiv.textContent = atom[4]

      const label = new CSS2DObject(labelDiv)
      label.position.copy(atomMesh.position)
      root.add(label)
    }

    const bondPositions = geometryBonds.getAttribute('position')
    const start = new THREE.Vector3()
    const end = new THREE.Vector3()

    for (let i = 0; i < bondPositions.count; i += 2) {
      start.set(bondPositions.getX(i), bondPositions.getY(i), bondPositions.getZ(i))

      end.set(bondPositions.getX(i + 1), bondPositions.getY(i + 1), bondPositions.getZ(i + 1))

      start.multiplyScalar(75)
      end.multiplyScalar(75)

      const bondMesh = new THREE.Mesh(boxGeometry, new THREE.MeshPhongMaterial({ color: 0xffffff }))
      bondMesh.position.copy(start).lerp(end, 0.5)
      bondMesh.scale.set(5, 5, start.distanceTo(end))
      bondMesh.lookAt(end)
      root.add(bondMesh)
    }
  })
}

const init = () => {
  scene = new THREE.Scene()
  // Make renderer background transparent

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000)
  camera.position.z = 1000
  scene.add(camera)

  const light1 = new THREE.DirectionalLight(0xffffff, 2.5)
  light1.position.set(1, 1, 1)
  scene.add(light1)

  const light2 = new THREE.DirectionalLight(0xffffff, 1.5)
  light2.position.set(-1, -1, 1)
  scene.add(light2)

  root = new THREE.Group()
  scene.add(root)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setAnimationLoop(animate)

  const container = document.getElementById('container')
  if (container) {
    container.appendChild(renderer.domElement)
  }

  labelRenderer = new CSS2DRenderer()
  labelRenderer.setSize(window.innerWidth, window.innerHeight)
  labelRenderer.domElement.style.position = 'absolute'
  labelRenderer.domElement.style.top = '0px'
  labelRenderer.domElement.style.pointerEvents = 'none'
  container?.appendChild(labelRenderer.domElement)

  controls = new TrackballControls(camera, renderer.domElement)
  controls.minDistance = 500
  controls.maxDistance = 2000

  window.addEventListener('resize', onWindowResize)
}

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  labelRenderer.setSize(window.innerWidth, window.innerHeight)
}

const animate = () => {
  controls.update()
  const time = Date.now() * 0.0004
  root.rotation.x = time
  root.rotation.y = time * 0.7
  renderer.render(scene, camera)
  labelRenderer.render(scene, camera)
}

onMounted(() => {
  init()
  loadMolecule(selectedMolecule.value)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
})
</script>
