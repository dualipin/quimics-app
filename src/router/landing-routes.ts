import type { RouteRecordRaw } from 'vue-router'

export const landingRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layout/LandingLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../modules/landing/view/HomeView.vue'),
        meta: {
          landing: true,
          label: 'Inicio',
        },
      },
      {
        path: 'timeline',
        name: 'timeline',
        component: () => import('@/modules/landing/view/TimelineView.vue'),
        meta: {
          landing: true,
          label: 'Linea del Tiempo',
        },
      },
      {
        path: 'history',
        name: 'history',
        component: () => import('@/modules/landing/view/HistoryOfChemistry.vue'),
        meta: {
          landing: true,
          label: 'Historia de la Química',
        },
      },
      {
        path: 'periodic-table-review',
        name: 'periodic-table-review',
        component: () => import('@/modules/landing/view/PeriodicTableReview.vue'),
        meta: {
          landing: true,
          label: 'Repaso de la Tabla Periódica',
        },
      },
      {
        path: 'how-it-works',
        name: 'how-it-works',
        component: () => import('@/modules/landing/view/HowItWorks.vue'),
      },
    ],
  },
]
