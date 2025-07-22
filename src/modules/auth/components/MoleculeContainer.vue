<script setup lang="ts">
import * as THREE from 'three'
import { TrackballControls } from 'three/addons/controls/TrackballControls.js'
import { PDBLoader } from 'three/addons/loaders/PDBLoader.js'
import { CSS3DRenderer, CSS3DObject, CSS3DSprite } from 'three/addons/renderers/CSS3DRenderer.js'
import { onMounted } from 'vue'

const props = defineProps<{
  molecule?: string
}>()

let camera: THREE.PerspectiveCamera
let scene: THREE.Scene
let renderer: CSS3DRenderer
let controls: TrackballControls
let root: THREE.Object3D

const objects: (CSS3DSprite | CSS3DObject)[] = []
const tmpVec1 = new THREE.Vector3()
const tmpVec2 = new THREE.Vector3()
const tmpVec3 = new THREE.Vector3()
const tmpVec4 = new THREE.Vector3()
const offset = new THREE.Vector3()

const MOLECULES = {
  Ethanol: 'ethanol.pdb',
  Aspirin: 'aspirin.pdb',
  Caffeine: 'caffeine.pdb',
  Nicotine: 'nicotine.pdb',
  LSD: 'lsd.pdb',
  Cocaine: 'cocaine.pdb',
  Cholesterol: 'cholesterol.pdb',
  Lycopene: 'lycopene.pdb',
  Glucose: 'glucose.pdb',
  'Aluminium oxide': 'Al2O3.pdb',
  Cubane: 'cubane.pdb',
  Copper: 'cu.pdb',
  Fluorite: 'caf2.pdb',
  Salt: 'nacl.pdb',
  'YBCO superconductor': 'ybco.pdb',
  Buckyball: 'buckyball.pdb',
  Graphite: 'graphite.pdb',
}

const params = {
  vizType: 2,
  molecule: 'Caffeine',
}

const loader = new PDBLoader()
const colorSpriteMap: { [key: string]: string } = {}
const baseSprite = document.createElement('img')

init()
animate()

function init() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000)
  camera.position.z = 1000

  scene = new THREE.Scene()

  root = new THREE.Object3D()
  scene.add(root)

  renderer = new CSS3DRenderer()
  const container = document.getElementById('container')
  if (container) {
    container.appendChild(renderer.domElement)
  }

  renderer.setSize(window.innerWidth, window.innerHeight)

  controls = new TrackballControls(camera, renderer.domElement)
  controls.rotateSpeed = 0.5

  baseSprite.onload = () => loadMolecule(props.molecule || MOLECULES['Caffeine'])
  baseSprite.src = '/sprites/ball.png'

  window.addEventListener('resize', onWindowResize)
}

function changeVizType(value: number) {
  if (value === 0) showAtoms()
  else if (value === 1) showBonds()
  else showAtomsBonds()
}

function showAtoms() {
  for (const object of objects) {
    if (object instanceof CSS3DSprite) {
      object.element.style.display = ''
      object.visible = true
    } else {
      object.element.style.display = 'none'
      object.visible = false
    }
  }
}

function showBonds() {
  for (const object of objects) {
    if (object instanceof CSS3DSprite) {
      object.element.style.display = 'none'
      object.visible = false
    } else {
      object.element.style.display = ''
      object.element.style.height = object.userData.bondLengthFull
      object.visible = true
    }
  }
}

function showAtomsBonds() {
  for (const object of objects) {
    object.element.style.display = ''
    object.visible = true
    if (!(object instanceof CSS3DSprite)) {
      object.element.style.height = object.userData.bondLengthShort
    }
  }
}

function colorify(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: THREE.Color,
) {
  const r = color.r,
    g = color.g,
    b = color.b

  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data

  for (let i = 0, l = data.length; i < l; i += 4) {
    data[i + 0] *= r
    data[i + 1] *= g
    data[i + 2] *= b
  }

  ctx.putImageData(imageData, 0, 0)
}

function imageToCanvas(image: HTMLImageElement) {
  const width = image.width
  const height = image.height

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')
  if (context) {
    context.drawImage(image, 0, 0, width, height)
  }

  return canvas
}

function loadMolecule(model: string) {
  const url = `/pdb/${model}`

  // Clear existing objects
  objects.forEach((object) => object.parent?.remove(object))
  objects.length = 0

  loader.load(url, (pdb) => {
    const { geometryAtoms, geometryBonds, json } = pdb

    geometryAtoms.computeBoundingBox()
    geometryAtoms.boundingBox?.getCenter(offset).negate()

    geometryAtoms.translate(offset.x, offset.y, offset.z)
    geometryBonds.translate(offset.x, offset.y, offset.z)

    const positionAtoms = geometryAtoms.getAttribute('position')
    const colorAtoms = geometryAtoms.getAttribute('color')

    const position = new THREE.Vector3()
    const color = new THREE.Color()

    // Create atoms
    for (let i = 0; i < positionAtoms.count; i++) {
      position.fromBufferAttribute(positionAtoms, i)
      color.fromBufferAttribute(colorAtoms, i)

      const atomJSON = json.atoms[i]
      const element = atomJSON[4]

      if (!colorSpriteMap[element]) {
        const canvas = imageToCanvas(baseSprite)
        const context = canvas.getContext('2d')
        if (context) {
          colorify(context, canvas.width, canvas.height, color)
          colorSpriteMap[element] = canvas.toDataURL()
        }
      }

      const atom = document.createElement('img')
      atom.src = colorSpriteMap[element]

      const object = new CSS3DSprite(atom)
      object.position.copy(position).multiplyScalar(75)
      object.matrixAutoUpdate = false
      object.updateMatrix()

      root.add(object)
      objects.push(object)
    }

    // Create bonds
    const positionBonds = geometryBonds.getAttribute('position')
    const start = new THREE.Vector3()
    const end = new THREE.Vector3()

    for (let i = 0; i < positionBonds.count; i += 2) {
      start.fromBufferAttribute(positionBonds, i)
      end.fromBufferAttribute(positionBonds, i + 1)

      start.multiplyScalar(75)
      end.multiplyScalar(75)

      tmpVec1.subVectors(end, start)
      const bondLength = tmpVec1.length() - 50

      // Create bond
      let bond = document.createElement('div')
      bond.className = 'absolute w-[10px] -translate-x-1/2 bg-neutral-800 dark:bg-neutral-300'
      bond.style.height = `${bondLength}px`

      let object = new CSS3DObject(bond)
      object.position.copy(start).lerp(end, 0.5)
      object.userData.bondLengthShort = `${bondLength}px`
      object.userData.bondLengthFull = `${bondLength + 55}px`

      const axis = tmpVec2.set(0, 1, 0).cross(tmpVec1)
      const radians = Math.acos(tmpVec3.set(0, 1, 0).dot(tmpVec4.copy(tmpVec1).normalize()))

      const objMatrix = new THREE.Matrix4().makeRotationAxis(axis.normalize(), radians)
      object.matrix.copy(objMatrix)
      object.quaternion.setFromRotationMatrix(object.matrix)
      object.matrixAutoUpdate = false
      object.updateMatrix()

      root.add(object)
      objects.push(object)

      // Create joint
      const joint = new THREE.Object3D()
      joint.position.copy(start).lerp(end, 0.5)
      joint.matrix.copy(objMatrix)
      joint.quaternion.setFromRotationMatrix(joint.matrix)
      joint.matrixAutoUpdate = false
      joint.updateMatrix()

      bond = document.createElement('div')
      bond.className = 'bond'
      bond.style.height = `${bondLength}px`

      object = new CSS3DObject(bond)
      object.rotation.y = Math.PI / 2
      object.matrixAutoUpdate = false
      object.updateMatrix()

      object.userData.bondLengthShort = `${bondLength}px`
      object.userData.bondLengthFull = `${bondLength + 55}px`
      object.userData.joint = joint

      joint.add(object)
      root.add(joint)
      objects.push(object)
    }

    changeVizType(params.vizType)
  })
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  requestAnimationFrame(animate)
  controls.update()

  const time = Date.now() * 0.0004
  root.rotation.x = time
  root.rotation.y = time * 0.7

  render()
}

function render() {
  renderer.render(scene, camera)
}

onMounted(() => {
  init()
  animate()
})
</script>

<template>
  <div id="container"></div>
</template>
