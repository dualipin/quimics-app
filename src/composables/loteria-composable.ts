import type { ElementoQuimico } from '@/types/Elemento'
import JSConfetti from 'js-confetti'
import { ref } from 'vue'
import { heGanado } from './jugador-loteria-composable'

export const carton = ref<ElementoQuimico[]>([])
export const elementoActual = ref<ElementoQuimico | null>(null)
export const elementosLanzados = ref<ElementoQuimico[]>([])
export const elementosSeleccionados = ref<ElementoQuimico[]>([])
export const soyUnGanador = ref(false)
export const hayUnGanador = ref(false)
export const confeti = new JSConfetti()
export const ganador = ref<string | null>(null)

// export function seleccionarElemento(elemento: ElementoQuimico) {
//   if (elementosSeleccionados.value.includes(elemento)) {
//     elementosSeleccionados.value = elementosSeleccionados.value.filter((e) => e !== elemento)
//   } else {
//     elementosSeleccionados.value.push(elemento)
//   }
// }

export function estaMarcado(elemento: ElementoQuimico) {
  return elementosSeleccionados.value.includes(elemento)
}

export function reiniciarCarton() {
  carton.value = []
  elementosSeleccionados.value = []
}

// export function verificarGanador() {
//   if (elementosLanzados.value.length === 0) {
//     return null
//   }
//   const numeros = elementosLanzados.value.map((elemento) => elemento.numeroAtomico)
//   const ganador = carton.value.find((elemento) => numeros.includes(elemento.numeroAtomico))

//   if (ganador) {
//     elementosSeleccionados.value.push(ganador)
//   }

//   return ganador ? ganador : null
// }

export function seleccionarElemento(elemento: ElementoQuimico) {
  // Only allow selection if the element has been launched
  if (!elementosLanzados.value.some((e) => e.numeroAtomico === elemento.numeroAtomico)) {
    return
  }

  if (elementosSeleccionados.value.includes(elemento)) {
    elementosSeleccionados.value = elementosSeleccionados.value.filter((e) => e !== elemento)
  } else {
    elementosSeleccionados.value.push(elemento)
  }

  if (elementosSeleccionados.value.length === 16) {
    soyUnGanador.value = true
    confeti.addConfetti()
    heGanado()
  } else {
    soyUnGanador.value = false
  }
}

export function estaLanzado(elemento: ElementoQuimico) {
  return elementosLanzados.value.some((e) => e.numeroAtomico === elemento.numeroAtomico)
}

export function verificarGanador() {
  if (elementosLanzados.value.length === 0) {
    return null
  }
  const numeros = elementosLanzados.value.map((elemento) => elemento.numeroAtomico)
  const ganador = carton.value.find((elemento) => numeros.includes(elemento.numeroAtomico))

  if (ganador) {
    elementosSeleccionados.value.push(ganador)
  }

  return ganador ? ganador : null
}
