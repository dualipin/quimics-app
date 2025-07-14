export type ElementoQuimico = Partial<{
  numeroAtomico: number
  pesoAtomico: number
  puntoEbullicion: number
  valencia: number
  puntoFusion: number
  simbolo: string
  densidad: number
  estructuraAtomica: string
  nombre: string
  grupo: number
  periodo: number
  categoria: CategoriaElemento
  datoCurioso: string
  imagen: string
}>

export enum CategoriaElemento {
  MetalesAlcalinos = 'metales alcalinos',
  Alcalinoterreos = 'alcalinotérreos',
  OtrosMetales = 'otros metales',
  MetalesTransicion = 'metales de transición',
  Lantanidos = 'lantánidos',
  Actinidos = 'actínidos',
  Metaloides = 'metaloides',
  NoMetal = 'no metales',
  Halogenos = 'halógenos',
  GasesNobles = 'gases nobles',
  ElementosDesconocidos = 'elementos desconocidos',
}
