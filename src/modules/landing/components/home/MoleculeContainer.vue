<script setup lang="ts">
import * as THREE from 'three'
import { TrackballControls } from 'three/addons/controls/TrackballControls.js'
import { CSS2DObject, CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js' // Importar CSS2DRenderer
import { PDBLoader } from 'three/addons/loaders/PDBLoader.js'
import { onMounted, ref } from 'vue'
import { useThemeStore } from '@/stores'

const moleculeContainer = ref<HTMLDivElement | null>(null)

function loadMolecule() {
  if (!moleculeContainer.value) return

  const loader = new PDBLoader()
  const offset = new THREE.Vector3()

  let scene = new THREE.Scene()

  // Luces (mejoradas para visibilidad)
  const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5) // Luz ambiental más suave
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8) // Luz direccional más brillante
  directionalLight.position.set(1, 1, 0.75).normalize()
  scene.add(directionalLight)

  let camera = new THREE.PerspectiveCamera(
    40,
    moleculeContainer.value.clientWidth / moleculeContainer.value.clientHeight,
    0.1,
    5000, // Aumentar far para ver objetos más lejanos si es necesario
  )
  camera.position.z = 1000

  let root = new THREE.Group()
  scene.add(root)

  let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(moleculeContainer.value.clientWidth, moleculeContainer.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  moleculeContainer.value.appendChild(renderer.domElement)

  // Renderer para etiquetas 2D
  const labelRenderer = new CSS2DRenderer()
  labelRenderer.setSize(moleculeContainer.value.clientWidth, moleculeContainer.value.clientHeight)
  labelRenderer.domElement.style.position = 'absolute'
  labelRenderer.domElement.style.top = '0px'
  labelRenderer.domElement.style.pointerEvents = 'none' // Para que no interfiera con los controles
  moleculeContainer.value.appendChild(labelRenderer.domElement)

  let controls = new TrackballControls(camera, renderer.domElement)
  controls.minDistance = 700
  controls.maxDistance = 2000

  // **Función interna para cargar la molécula (definida una vez)**
  const _loadPDBMolecule = (model: string = 'caffeine.pdb') => {
    // Renombrada para evitar conflicto y ser más clara
    // const url = `https://threejs.org/examples/models/pdb/${model}`
    const url = '/pdb/caffeine.pdb'

    while (root.children.length > 0) {
      const object = root.children[0]
      object.parent?.remove(object)
    }

    loader.load(url, (pdb) => {
      const geometryAtoms = pdb.geometryAtoms
      const geometryBonds = pdb.geometryBonds
      const json = pdb.json

      const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
      const sphereGeometry = new THREE.IcosahedronGeometry(1, 2)

      geometryAtoms.computeBoundingBox()
      geometryAtoms.boundingBox?.getCenter(offset).negate()

      geometryAtoms.translate(offset.x, offset.y, offset.z)
      geometryBonds.translate(offset.x, offset.y, offset.z)

      let positions = geometryAtoms.getAttribute('position')
      const colors = geometryAtoms.getAttribute('color')

      const position = new THREE.Vector3()
      const color = new THREE.Color()

      for (let i = 0; i < positions.count; i++) {
        position.x = positions.getX(i)
        position.y = positions.getY(i)
        position.z = positions.getZ(i)

        color.r = colors.getX(i)
        color.g = colors.getY(i)
        color.b = colors.getZ(i)

        const material = new THREE.MeshPhongMaterial({ color: color })

        const object = new THREE.Mesh(sphereGeometry, material)
        object.position.copy(position)
        object.position.multiplyScalar(75)
        object.scale.multiplyScalar(25)
        root.add(object)

        const atom = json.atoms[i]

        const text = document.createElement('div')
        text.className = 'text-white dark:text-gray-200 text-xs md:text-sm'
        text.style.color = `rgb(${atom[3][0]},${atom[3][1]},${atom[3][2]})`
        text.textContent = atom[4]

        const label = new CSS2DObject(text)
        label.position.copy(object.position)
        root.add(label)
      }
      positions = geometryBonds.getAttribute('position')

      const start = new THREE.Vector3()
      const end = new THREE.Vector3()

      for (let i = 0; i < positions.count; i += 2) {
        start.x = positions.getX(i)
        start.y = positions.getY(i)
        start.z = positions.getZ(i)

        end.x = positions.getX(i + 1)
        end.y = positions.getY(i + 1)
        end.z = positions.getZ(i + 1)

        start.multiplyScalar(75)
        end.multiplyScalar(75)

        const object = new THREE.Mesh(boxGeometry, new THREE.MeshPhongMaterial({ color: 0xcccccc }))
        object.position.copy(start)
        object.position.lerp(end, 0.5)
        object.scale.set(5, 5, start.distanceTo(end))
        object.lookAt(end)
        root.add(object)
      }
    })
  }

  // **Cargar la molécula por primera vez (fuera del ámbito de la definición interna)**
  _loadPDBMolecule('caffeine.pdb')

  function onWindowResize() {
    if (!moleculeContainer.value) return
    camera.aspect = moleculeContainer.value.clientWidth / moleculeContainer.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(moleculeContainer.value.clientWidth, moleculeContainer.value.clientHeight)
    labelRenderer.setSize(moleculeContainer.value.clientWidth, moleculeContainer.value.clientHeight) // Redimensionar el renderer 2D
  }

  function animate() {
    requestAnimationFrame(animate)
    const time = Date.now() * 0.0004
    root.rotation.x = time
    root.rotation.y = time * 0.7
    controls.update()
    render()
  }

  function render() {
    renderer.render(scene, camera)
    labelRenderer.render(scene, camera) // Renderizar también las etiquetas 2D
  }

  // Start animation
  animate()

  // Handle resize
  window.addEventListener('resize', onWindowResize)
}

onMounted(() => {
  loadMolecule()
})
</script>
<template>
  <div class="mt-4">
    <div class="relative">
      <div ref="moleculeContainer" class="rounded-3xl w-full h-80"></div>
    </div>
    <p class="text-center mt-2 dark:text-neutral-300">Molécula interactiva de Cafeína</p>
  </div>
</template>
