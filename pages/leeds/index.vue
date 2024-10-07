<script setup lang="ts">
import { format } from "date-fns"

useSeoMeta({
  title: "Leeds",
  ogTitle: "Leeds"
})

const columns = [
  {
    key: "subject",
    label: "Subject",
    class: "bg-neutral-100"
  },
  {
    key: "leads",
    label: "Name of leads",
    class: "bg-neutral-100"
  },
  {
    key: "activities",
    label: "Activities",
    class: "bg-neutral-100"
  },
  {
    key: "email",
    label: "Email",
    class: "bg-neutral-100"
  },
  {
    key: "completed",
    label: "Status",
    class: "bg-neutral-100"
  },
  {
    key: "actions",
    class: "bg-neutral-100"
  }
]

const people = ref([
  {
    id: 1,
    subject: "Colaboration work for project",
    leads: {
      name: "Courtney Henry",
      image: "/logo.jpeg"
    },
    activities: "2000-01-01T00:00:00.000Z",
    email: "lindsay.walton@example.com",
    completed: true
  },
  {
    id: 2,
    subject: "Social media design work",
    leads: {
      name: "Courtney Henry",
      image: "/logo.jpeg"
    },
    activities: "2000-01-01T00:00:00.000Z",
    email: "courtney.henry@example.com",
    completed: true
  },
  {
    id: 3,
    subject: "Hiring product designer",
    leads: {
      name: "Courtney Henry",
      image: "/logo.jpeg"
    },
    activities: "2000-01-01T00:00:00.000Z",
    email: "tom.cook@example.com",
    completed: false
  },
  {
    id: 4,
    subject: "Redesign mobile app",
    leads: {
      name: "Courtney Henry",
      image: "/logo.jpeg"
    },
    activities: "2000-01-01T00:00:00.000Z",
    email: "whitney.francis@example.com",
    completed: true
  },
  {
    id: 5,
    subject: "Research new marketing channels",
    leads: {
      name: "Courtney Henry",
      image: "/logo.jpeg"
    },
    activities: "2000-01-01T00:00:00.000Z",
    email: "leonard.krasner@example.com",
    completed: false
  },
  {
    id: 6,
    subject: "Responsive website design",
    leads: {
      name: "Courtney Henry",
      image: "/logo.jpeg"
    },
    activities: "2000-01-01T00:00:00.000Z",
    email: "floyd.miles@example.com",
    completed: true
  }
])

const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id)
    },
    {
      label: "Check",
      icon: "i-heroicons:clipboard-document-check-20-solid",
      click: () => {
        const i = people.value.find((p) => p.id === row.id)
        if (i) i.completed = !i.completed
      }
    }
  ],
  [
    {
      label: "Archive",
      icon: "i-heroicons-archive-box-20-solid"
    },
    {
      label: "Move",
      icon: "i-heroicons-arrow-right-circle-20-solid"
    }
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid"
    }
  ]
]
const selected = ref([people[1]])
const selectedPerson = ref({})
const isOpen = ref(false)

const tabs = [
  {
    key: "list",
    label: "List",
    icon: "i-lucide-lab:layout-list-move"
  },
  {
    key: "grid",
    label: "Grid",
    icon: "i-lucide-lab:layout-grid-move-horizontal"
  }
]

const selectedTab = ref("list")

const openModal = (person) => {
  selectedPerson.value = person
  console.log(selectedPerson.value)
  isOpen.value = true
}

function onChange(index: number) {
  const item = tabs[index]

  selectedTab.value = item.key
}

const { signIn, signOut, session, status, cookies } = useAuth()
</script>

<template>
  <div class="my-4">
    <section class="flex px-4 w-full justify-between items-center">
      <UTabs
        :items="tabs"
        default-index="0"
        @change="onChange"
        :ui="{ list: { width: 'w-[200px]' } }"
      />
      <UButton @click="signIn(`github`)">Create new subject</UButton>
      <div>
        <NuxtImg :src="session?.user?.image" class="w-12 h-12 rounded-full" />
        <p>{{ session?.user?.email }}</p>
      </div>
    </section>
    <section v-if="selectedTab === 'list'">
      <!-- Таб с таблицей UTable -->
      <UTable :rows="people" :columns="columns" class="w-full border-y">
        <template #subject-data="{ row }">
          <span class="font-semibold tracking-wide text-sm text-black">{{ row.subject }}</span>
        </template>

        <template #activities-data="{ row }">
          <span>{{ format(new Date(row.activities), "MMM dd 'at' hh:mma") }}</span>
        </template>

        <template #leads-data="{ row }">
          <span class="flex items-center gap-1">
            <NuxtImg :src="row.leads.image" class="w-6 h-6 rounded-full" />
            <span>{{ row.leads.name }}</span>
          </span>
        </template>

        <template #completed-data="{ row }">
          <UBadge
            size="xs"
            :label="row.completed ? 'Completed' : 'In Progress'"
            :color="row.completed ? 'blue' : 'red'"
            variant="subtle"
          />
        </template>

        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>
      </UTable>
    </section>

    <section v-else-if="selectedTab === 'grid'">
      <!-- Таб с div элементами (грид) -->
      <div class="grid mt-4 grid-cols-3 px-4 gap-4">
        <UCard
          v-for="pp in people"
          :key="pp.id"
          class="relative text-sm hover:-translate-y-2 transition-all"
        >
          <UButton
            color="gray"
            variant="ghost"
            class="absolute right-2 top-2"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
            @click="openModal(pp)"
          />
          <h2 class="text-base font-semibold mb-2">{{ pp.subject }}</h2>
          <div class="flex items-center gap-2 mb-2">
            <NuxtImg :src="pp.leads.image" class="w-8 h-8 rounded-full" />
            <span>{{ pp.leads.name }}</span>
          </div>
          <p class="text-gray-600 mb-2">
            {{ format(new Date(pp.activities), "MMM dd 'at' hh:mma") }}
          </p>
          <p class="text-gray-600 mb-4">{{ pp.email }}</p>
          <UBadge
            size="xs"
            :label="pp.completed ? 'Completed' : 'In Progress'"
            :color="pp.completed ? 'blue' : 'red'"
            variant="subtle"
          />
        </UCard>
        <USlideover :ui="{ overlay: { background: 'bg-neutral-800/40' } }" v-model="isOpen">
          <div class="p-4 flex-1">
            <UButton
              color="gray"
              variant="ghost"
              size="sm"
              icon="i-heroicons-x-mark-20-solid"
              class="flex absolute sm:hidden end-3 top-2 z-10"
              square
              padded
              @click="isOpen = false"
            />

            <div v-if="selectedPerson">
              <h5 class="text-lg font-bold mb-3">Edit Lead Details</h5>
              <UInput v-model="selectedPerson.subject" label="Subject" class="mb-2" />
              <UInput v-model="selectedPerson.email" label="Email" class="mb-2" />
              <UInput v-model="selectedPerson.activities" label="Activities" class="mb-2" />
              <UButton
                variant="outline"
                :color="selectedPerson.completed ? 'red' : 'blue'"
                :label="selectedPerson.completed ? 'Mark as In Progress' : 'Mark as Completed'"
                @click="selectedPerson.completed = !selectedPerson.completed"
              />
            </div>
          </div>
        </USlideover>
      </div>
    </section>
  </div>
</template>
