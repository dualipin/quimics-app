<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useColors } from 'vuestic-ui'

const router = useRouter()
const authStore = useAuthStore()
const user = computed(() => authStore.user)
const { applyPreset } = useColors()

const menuItems = [
  {
    label: 'Tabla Periódica',
    children: [
      {
        label: 'Tabla Periódica',
        name: 'periodica',
      },
      {
        label: 'Historia de la Tabla Periódica',
        name: 'historia-periodica',
      },
      {
        label: 'Actores Principales',
        name: 'actores-principales',
      },
    ],
  },
  {
    name: 'preguntas',
    label: 'Preguntas',
  },
  {
    name: 'loteria',
    label: 'Loteria',
  },
  {
    name: 'compuestos',
    label: 'Compuestos',
  },
  { name: 'nosotros', label: 'Nosotros' },
]
</script>

<template>
  <header
    class="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-gradient-to-r dark:from-blue-900/20 dark:via-teal-900/20 dark:to-green-900/20 from-blue-500/50 via-teal-500/50 to-green-500/50 text-sm py-3 shadow-lg backdrop-blur-md fixed top-0 z-50"
  >
    <nav class="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
      <div class="flex items-center justify-between">
        <RouterLink
          to="/"
          class="flex-none text-xl font-semibold text-white focus:outline-hidden focus:opacity-80"
          href="#"
          aria-label="Brand"
        >
          <span class="inline-flex items-center gap-x-4 text-2xl font-semibold text-white">
            <img src="@/assets/logo.jpeg" class="w-12 aspect-square object-cover rounded-full" />
            Studying Chemistry
          </span>
        </RouterLink>
        <div class="sm:hidden">
          <button
            type="button"
            class="hs-collapse-toggle relative size-9 flex justify-center items-center gap-x-2 rounded-lg border border-teal-300 bg-teal-600 text-white shadow-md hover:bg-teal-700 focus:outline-hidden focus:bg-teal-700 disabled:opacity-50 disabled:pointer-events-none"
            id="hs-navbar-example-collapse"
            aria-expanded="false"
            aria-controls="hs-navbar-example"
            aria-label="Toggle navigation"
            data-hs-collapse="#hs-navbar-example"
          >
            <svg
              class="hs-collapse-open:hidden shrink-0 size-4"
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
              class="hs-collapse-open:block hidden shrink-0 size-4"
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
            <span class="sr-only">Toggle navigation</span>
          </button>
        </div>
      </div>
      <div
        id="hs-navbar-example"
        class="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block"
        aria-labelledby="hs-navbar-example-collapse"
      >
        <div
          class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5"
        >
          <template v-if="user">
            <template v-for="(item, index) in menuItems" :key="`${index}`">
              <RouterLink
                v-if="!item.children"
                :to="{ name: item.name }"
                class="font-medium text-base sm:text-lg text-white hover:text-yellow-300 focus:outline-hidden focus:text-yellow-300"
                aria-current="page"
              >
                {{ item.label }}
              </RouterLink>
              <div
                v-else
                class="hs-dropdown [--trigger:hover] [--strategy:static] sm:[--strategy:fixed] [--adaptive:none] sm:[--adaptive:adaptive]"
              >
                <button
                  :id="`hs-navbar-example-dropdown-${index}`"
                  type="button"
                  class="hs-dropdown-toggle flex items-center w-full font-medium text-base sm:text-lg text-white hover:text-yellow-300 focus:outline-hidden focus:text-yellow-300"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Mega Menu"
                >
                  {{ item.label }}
                  <svg
                    class="hs-dropdown-open:-rotate-180 sm:hs-dropdown-open:rotate-0 duration-300 ms-1 shrink-0 size-4"
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
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                <div
                  class="hs-dropdown-menu transition-[opacity,margin] ease-in-out duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 z-10 bg-gradient-to-r from-blue-500 via-teal-500/90 to-green-500 sm:shadow-md rounded-lg p-1 space-y-1 dark:from-blue-900 dark:via-teal-900/90 dark:to-green-900 sm:dark:border dark:border-neutral-700 dark:divide-neutral-700 before:absolute top-full sm:border border-gray-200 before:-top-5 before:start-0 before:w-full before:h-5 hidden"
                  role="menu"
                  aria-orientation="vertical"
                  :aria-labelledby="`hs-navbar-example-dropdown-${index}`"
                >
                  <div
                    v-for="(child, childIndex) in item.children"
                    :key="`${index}-${childIndex}`"
                    class="hs-dropdown-item flex items-center w-full font-medium text-base sm:text-lg text-white hover:text-yellow-300 focus:outline-hidden focus:text-yellow-300"
                  >
                    <RouterLink
                      :to="{ name: child.name }"
                      class="block py-2 px-4 font-medium"
                      aria-current="page"
                    >
                      {{ child.label }}
                    </RouterLink>
                  </div>
                </div>
              </div>
            </template>
          </template>

          <div v-if="authStore.user" class="hs-dropdown relative inline-flex">
            <button
              id="user-menu"
              type="button"
              class="hs-dropdown-toggle flex items-center gap-x-2 py-2 px-4 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white hover:opacity-80 focus:outline-hidden focus:opacity-80"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="User menu"
            >
              {{ user ? user.username : 'Mi Cuenta' }}
              <svg
                class="size-4"
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
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <div
              class="hs-dropdown-menu text-neutral-200 p-2 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 shadow-md rounded-lg dark:from-blue-900 dark:via-teal-900 dark:to-green-900"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <div>
                <div class="px-4 py-2 text-sm">
                  <p class="font-semibold">Bienvenido, {{ user ? user.username : 'Invitado' }}</p>
                </div>
                <hr />
              </div>
              <div class="pt-2">
                <button
                  @click="
                    () => {
                      authStore.clearUser()
                      router.push({ name: 'login' })
                    }
                  "
                  class="block w-full text-left py-2 px-4 text-sm rounded-lg hover:bg-red-500 focus:outline-hidden focus:bg-red-500 text-neutral-200 dark:hover:bg-red-700 hover:text-neutral-300 dark:focus:bg-red-700"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>

          <button
            @click="applyPreset('dark')"
            type="button"
            class="hs-dark-mode hs-dark-mode-active:hidden flex items-center gap-x-2 py-2 px-3 bg-yellow-200 rounded-full text-sm text-black hover:bg-yellow-500 focus:outline-hidden focus:bg-yellow-500"
            data-hs-theme-click-value="dark"
          >
            <svg
              class="shrink-0 size-4"
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
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
            Oscuro
          </button>
          <button
            @click="applyPreset('light')"
            type="button"
            class="hs-dark-mode hs-dark-mode-active:inline-flex hidden items-center gap-x-2 py-2 px-3 bg-yellow-500 rounded-full text-sm text-black hover:bg-yellow-500 focus:outline-hidden focus:bg-yellow-500"
            data-hs-theme-click-value="light"
          >
            <svg
              class="shrink-0 size-4"
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
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
            Claro
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>
