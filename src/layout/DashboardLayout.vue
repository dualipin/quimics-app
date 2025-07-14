<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeElement = ref('Dashboard')

type Item = {
  title: string
  icon: string
  to?: { name: string }
  children?: Item[]
}

const items: Item[] = [
  { title: 'Usuarios', icon: 'people', to: { name: 'dashboard' } },
  {
    title: 'Redes Sociales',
    icon: 'share',
    children: [
      {
        title: 'Facebook',
        icon: 'facebook',
        to: { name: 'registrar-publicacion' },
      },
    ],
  },
]
</script>
<template>
  <div class="flex min-h-screen md:flex-row flex-col">
    <div>
      <VaSidebar>
        <VaSidebarItem class="mb-10">
          <VaSidebarItemContent>
            <VaIcon name="va-check" />
            <VaSidebarItemTitle class="text-2xl font-semibold">Mi Química</VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaAccordion>
          <template v-for="item in items">
            <VaCollapse v-if="item.children" :key="item.title + 'collapse'" body-color="#00000022">
              <template #header="{ value: isCollapsed }">
                <VaSidebarItem
                  :active="item.children.some((child) => child.title === activeElement)"
                >
                  <VaSidebarItemContent>
                    <VaIcon :name="item.icon" />
                    <VaSidebarItemTitle>{{ item.title }}</VaSidebarItemTitle>
                    <VaSpacer />
                    <VaIcon :name="isCollapsed ? 'va-arrow-up' : 'va-arrow-down'" />
                  </VaSidebarItemContent>
                </VaSidebarItem>
              </template>

              <template #body>
                <VaSidebarItem
                  v-for="child in item.children"
                  :key="child.title"
                  :active="child.title === activeElement"
                  @click="
                    () => {
                      activeElement = child.title
                      if (child.to) router.push(child.to)
                    }
                  "
                >
                  <VaSidebarItemContent>
                    <VaIcon :name="child.icon" />
                    <VaSidebarItemTitle>{{ child.title }}</VaSidebarItemTitle>
                  </VaSidebarItemContent>
                </VaSidebarItem>
              </template>
            </VaCollapse>

            <VaSidebarItem
              v-else
              :key="item.title + 'item'"
              :active="item.title === activeElement"
              @click="
                () => {
                  activeElement = item.title
                  if (item.to) router.push(item.to)
                }
              "
            >
              <VaSidebarItemContent>
                <VaIcon :name="item.icon" />
                <VaSidebarItemTitle>{{ item.title }}</VaSidebarItemTitle>
              </VaSidebarItemContent>
            </VaSidebarItem>
          </template>
        </VaAccordion>

        <VaSpacer />

        <VaSidebarItem :active="'Settings' === activeElement" @click="activeElement = 'Settings'">
          <VaSidebarItemContent>
            <VaIcon name="home" />
            <VaSidebarItemTitle>
              <RouterLink :to="{ name: 'periodica' }">Pagina Principal</RouterLink>
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
      </VaSidebar>
    </div>
    <div class="flex-1 p-5 flex flex-col">
      <RouterView />
    </div>
  </div>
</template>
