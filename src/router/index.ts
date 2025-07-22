import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, left: 0 }
    }
  },
})

router.afterEach(async (to, from, failure) => {
  if (!failure) setTimeout(() => window.HSStaticMethods.autoInit(), 100)
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user') !== null
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const userRole = JSON.parse(localStorage.getItem('user') || 'null')?.role

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else if (userRole !== to.meta.role && to.name === 'dashboard') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
