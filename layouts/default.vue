<script setup lang="ts">
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
    <aside class="bg-neutral-100 border-r w-[250px] px-3 py-2">
      <UPopover overlay class="mb-4">
        <UButton
          color="white"
          class="w-full p-2 items-center justify-between"
          trailing-icon="i-heroicons:chevron-up-down-20-solid"
        >
          <span class="flex gap-2 items-center">
            <NuxtImg src="/logo.jpeg" class="size-9 rounded-lg" />
            <div class="text-start">
              <h5 class="font-bold">Svyatoslav</h5>
              <p class="text-xs text-neutral-600">test@gmail.com</p>
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
        <div v-for="(link, index) in links" :key="index">
          <h6 class="font-semibold mt-4">{{ link.heading }}</h6>
          <ul class="list-none p-0">
            <li v-for="(item, i) in link.items" :key="i">
              <NuxtLink
                :to="item.path"
                class="flex transition-all items-center px-4 h-8 hover:bg-neutral-200/50 cursor-pointer rounded-lg"
                :class="{
                  'bg-red-100 hover:bg-red-100/70 text-red-500': route.path === item.path // Активная ссылка
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
