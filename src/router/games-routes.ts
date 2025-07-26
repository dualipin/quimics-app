import type { RouteRecordRaw } from 'vue-router'

export const gamesRoutes: RouteRecordRaw[] = [
  {
    path: '/games',
    component: () => import('@/layout/GamesLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'games',
        component: () => import('@/modules/games/views/GameList.vue'),
      },
      {
        path: 'periodic-table',
        name: 'games.periodic-table',
        component: () =>
          import('@/modules/games/modules/periodic-table/views/PeriodicTableGame.vue'),
      },
      {
        path: 'memory',
        name: 'games.memory',
        component: () => import('@/modules/games/modules/memory/views/MemoryGame.vue'),
      },

      {
        path: 'lottery',
        name: 'games.lottery',
        component: () => import('@/modules/games/modules/lottery/views/Home.vue'),
      },
      {
        path: 'lottery/game',
        name: 'games.lottery.game',
        component: () => import('@/modules/games/modules/lottery/views/Game.vue'),
      },
      {
        path: 'snake',
        name: 'games.snake',
        component: () => import('@/modules/games/modules/snake/views/Snake.vue'),
      },
      {
        path: 'constructor',
        name: 'games.constructor',
        component: () => import('@/modules/games/modules/composite-builder/views/Game.vue'),
      },
      {
        path: 'quiz',
        component: () => import('@/modules/games/modules/quiz/layouts/QuizLayout.vue'),
        children: [
          {
            path: '',
            name: 'games.quiz',
            component: () => import('@/modules/games/modules/quiz/views/QuizGame.vue'),
          },
        ],
      },
    ],
  },
]
