<script setup lang="ts">
import { useMainStore } from '@/stores/main'
import { computed, ref, watch } from 'vue'
import debounce from 'lodash.debounce'

const store = useMainStore()

const itemsPerPage = ref(10)

const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(store.sites.length / itemsPerPage.value))

const searchTerm = ref('')

const sites = computed(() => {
  let tempList = store.sites

  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return tempList.slice(startIndex, endIndex)
})

const visiblePages = computed(() => {
  const pages = []
  const maxPages = 3
  const start = Math.max(1, currentPage.value - Math.floor(maxPages / 2))
  const end = Math.min(start + maxPages - 1, totalPages.value)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

watch(
  searchTerm,
  debounce(async () => {
    if (searchTerm.value === '') {
      await store.fetchSites()
    }
    await store.fetchFilteredSites(searchTerm.value)
  }, 500)
)
</script>

<template>
  <div class="flex bg-blue-500 p-4 justify-between sm:flex-row flex-col items-center">
    <h1 class="text-white text-center">Sites</h1>
    <div class="relative mt-2 rounded-md shadow-sm">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <input
        type="text"
        v-model="searchTerm"
        class="block w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Search"
      />
    </div>
  </div>
  <div class="container px-4 md:px-10 mx-auto">
    <ul role="list" class="divide-y divide-gray-100">
      <li
        v-for="site in sites"
        :key="site.id"
        class="flex justify-between items-center align-center gap-x-6 py-5"
      >
        <div class="flex min-w-0 gap-x-4">
          <img class="h-16 w-16 flex-none rounded-full bg-gray-50" :src="site.images[0]" alt="" />
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">{{ site.title }}</p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">
              {{ site.address.zipCode }}, {{ site.address.street }}, {{ site.address.city }},
              {{ site.address.state }}, {{ site.address.country }}
            </p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">
              {{ site.contacts.main.firstName }} {{ site.contacts.main.lastName }}
            </p>
          </div>
        </div>
        <div class="flex items-end">
          <router-link
            :to="{
              name: 'Single Site',
              params: { id: site.id }
            }"
            class="text-sm leading-6 text-gray-900"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </router-link>
        </div>
      </li>
    </ul>
    <div class="grid md:grid-cols-12 grid-cols-1 my-8">
      <div class="md:col-span-12 text-center">
        <nav>
          <ul class="inline-flex items-center -space-x-px">
            <li>
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="disabled:bg-gray-200 relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            </li>

            <li v-for="page in visiblePages" :key="page">
              <button
                @click="goToPage(page)"
                class="w-[40px] h-[40px] relative inline-flex align-center justify-center items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                :class="{
                  'dark:bg-blue-500 ': currentPage === page
                }"
              >
                {{ page }}
              </button>
            </li>

            <li>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="disabled:bg-gray-200 relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
