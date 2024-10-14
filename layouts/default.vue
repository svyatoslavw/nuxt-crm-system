<script setup lang="ts">
const { signIn, session } = useAuth()

const route = useRoute()

const links = [
  {
    heading: "Main menu",
    items: [
      { title: "Home", icon: "lucide-lab:house", path: "/" },
      { title: "Leeds", icon: "lucide-lab:target-arrow", path: "/leeds" },
      { title: "Deals", icon: "lucide-lab:text-square", path: "/deals" },
      { title: "Projects", icon: "lucide:folder-open", path: "/projects" }
    ]
  },
  {
    heading: "Insights",
    items: [
      { title: "Activities", icon: "lucide:square-activity", path: "/activities" },
      { title: "Reports", icon: "lucide:file-warning", path: "/reports" }
    ]
  }
]
</script>
<template>
  <section class="flex w-full min-h-screen">
    <aside class=" border-r w-[250px] px-3 py-2">
      <UPopover overlay class="mb-4">
        <UButton
          color="white"
          class="w-full p-2 items-center justify-between"
          trailing-icon="i-heroicons:chevron-up-down-20-solid"
        >
          <span class="flex gap-2 items-center">
            <NuxtImg :src="session?.user?.image || '/logo.jpeg'" class="size-9 rounded-lg" />
            <div class="text-start">
              <h5 class="font-bold">{{ session?.user?.name }}</h5>
              <p class="text-xs text-neutral-600 truncate w-4/5">{{ session?.user?.email }}</p>
            </div>
          </span>
        </UButton>
        <template #panel>
          <div class="p-4">
            <div class="h-20 w-48" />
          </div>
        </template>
      </UPopover>
      <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        size="sm"
        color="white"
        :trailing="false"
        class="mb-2"
        placeholder="Search..."
      />
      <div>
        <div v-for="(link, index) in links" class="text-neutral-600" :key="index">
          <h6 class="font-semibold mt-4">{{ link.heading }}</h6>
          <ul class="list-none p-0">
            <li v-for="(item, i) in link.items" :key="i">
              <NuxtLink
                :to="item.path"
                class="flex transition-all items-center px-4 h-8 hover:bg-neutral-100 hover:text-black cursor-pointer rounded-lg"
                :class="{
                  'bg-red-100 text-red-600': route.path === item.path
                }"
              >
                <UIcon :name="item.icon" class="mr-2" />
                {{ item.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </aside>
    <main class="w-full">
      <slot />
    </main>
  </section>
</template>

<style scoped>
a {
  padding: 0 10px;
}
</style>
