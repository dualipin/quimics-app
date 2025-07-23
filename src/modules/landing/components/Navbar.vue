<script setup lang="ts">
import ToggleThemeButton from '@/components/ToggleThemeButton.vue'
import logo from '@/assets/logo/logo.webp'
import router from '@/router'
import type { RouteRecordNameGeneric } from 'vue-router'
import { watch } from 'vue'
import { HSCollapse } from 'preline/dist'

const allRoutes = router.getRoutes()

type Route = { name: RouteRecordNameGeneric; label: string }

const routes: Route[] = []

allRoutes.forEach((r) => {
  routes.push({
    label: r.meta.label as string,
    name: r.name,
  })
})

watch(
  () => router.currentRoute.value.path,
  () => {
    console.log('Theme toggled and navbar collapsed')
    HSCollapse.hide('#hs-navbar-alignment-collapse')
  },
)
</script>

<template>
  <header
    class="animate-fade-in-down fixed top-0 z-50 flex w-full flex-wrap bg-white/50 py-3 text-sm backdrop-blur-sm xl:flex-nowrap xl:justify-start dark:bg-black/50"
  >
    <nav
      class="mx-auto flex w-full max-w-[85rem] basis-full flex-wrap items-center justify-between px-4"
    >
      <RouterLink
        to="/"
        class="flex-none font-semibold focus:opacity-80 focus:outline-hidden xl:order-1 dark:text-white"
        href="#"
      >
        <img :src="logo" alt="logo app" class="inline size-10" />
        <span> Studying Chemistry </span>
      </RouterLink>
      <div class="flex items-center gap-x-2 xl:order-3">
        <button
          type="button"
          class="hs-collapse-toggle relative flex size-9 items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:bg-gray-50 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 xl:hidden dark:border-neutral-700 dark:bg-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
          id="hs-navbar-alignment-collapse"
          aria-expanded="false"
          aria-controls="hs-navbar-alignment"
          aria-label="Toggle navigation"
          data-hs-collapse="#hs-navbar-alignment"
        >
          <svg
            class="hs-collapse-open:hidden size-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="3" x2="21" y1="6" y2="6" />
            <line x1="3" x2="21" y1="12" y2="12" />
            <line x1="3" x2="21" y1="18" y2="18" />
          </svg>
          <svg
            class="hs-collapse-open:block hidden size-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          <span class="sr-only">Toggle</span>
        </button>
        <button
          type="button"
          @click="$router.push({ name: 'auth.login' })"
          class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-2xs hover:bg-gray-50 focus:bg-gray-50 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        >
          Acceder
        </button>
        <ToggleThemeButton
          class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-2xs hover:bg-gray-50 focus:bg-gray-50 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        />
      </div>
      <div
        id="hs-navbar-alignment"
        class="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 xl:order-2 xl:block xl:grow-0 xl:basis-auto"
        aria-labelledby="hs-navbar-alignment-collapse"
      >
        <div class="mt-5 flex flex-col gap-5 xl:mt-0 xl:flex-row xl:items-center xl:ps-5">
          <router-link
            v-for="(route, i) in routes"
            :aria-current="$route.name == route.name && 'page'"
            :class="
              $route.name !== route.name
                ? 'font-medium text-gray-600 hover:text-gray-400 focus:text-gray-400 focus:outline-hidden dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500'
                : 'font-medium text-blue-500 focus:outline-hidden dark:text-blue-400'
            "
            :key="i"
            :to="{ name: route.name }"
            class=""
          >
            {{ route.label }}
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>
