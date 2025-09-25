import type { RouteRecordRaw } from 'vue-router'
import { authRoutes } from './auth-routes'
import { landingRoutes } from './landing-routes'
import { gamesRoutes } from './games-routes'

export const routes: RouteRecordRaw[] = [
  ...landingRoutes,
  ...authRoutes,
  ...gamesRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
  },
]
