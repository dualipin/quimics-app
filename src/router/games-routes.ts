import type { RouteRecordRaw } from 'vue-router'

export const gamesRoutes: RouteRecordRaw[] = [
  {
    path: '/games',
    component: () => import('@/layout/GamesLayout.vue'),
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
        component: () => import('@/modules/games/modules/lottery/views/LotteryGame.vue'),
      },
      {
        path: 'quiz',
        name: 'games.quiz',
        component: () => import('@/modules/games/modules/quiz/views/QuizGame.vue'),
      },
    ],
  },
]
