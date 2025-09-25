import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('@/layout/AuthLayout.vue'),

    children: [
      {
        path: '',
        redirect: { name: 'auth.login' },
      },
      {
        path: 'login',
        name: 'auth.login',
        component: () => import('@/modules/auth/views/LoginView.vue'),
      },
      {
        path: 'register',
        name: 'auth.register',
        component: () => import('@/modules/auth/views/Register.vue'),
      },
      {
        path: 'forgot-password',
        name: 'auth.forgot-password',
        component: () => import('@/modules/auth/views/ForgotPassword.vue'),
      },
    ],
  },
]
