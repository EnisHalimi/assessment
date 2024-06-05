<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import type { ISite } from '@/utils/types'
import { useRoute, useRouter } from 'vue-router'

const store = useMainStore()
const site = ref<ISite | null>(null)
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  if (route.params.id) {
    site.value = await store.fetchSingleSite(route.params.id)
  } else {
    router.replace('/')
  }
})
</script>

<template>
  <div class="flex min-w-0 gap-x-4 bg-blue-500 p-4 items-center">
    <router-link :to="{ name: 'Sites' }" class="text-sm leading-6 text-white"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
    </router-link>
    <img class="h-16 w-16 flex-none rounded-full bg-gray-50" :src="site?.images[0]" alt="" />
    <div class="min-w-0 flex-auto">
      <p class="text-sm font-semibold leading-6 text-white">{{ site?.title }}</p>
      <p class="mt-1 truncate text-xs leading-5 text-white">
        {{ site?.address.zipCode }}, {{ site?.address.street }}, {{ site?.address.city }},
        {{ site?.address.state }}, {{ site?.address.country }}
      </p>
      <p class="mt-1 truncate text-xs leading-5 text-white">
        {{ site?.contacts.main.firstName }} {{ site?.contacts.main.lastName }}
      </p>
    </div>
  </div>
  <div class="flex flex-col lg:flex-row">
    <img class="object-contain flex-none bg-gray-50" :src="site?.images[1]" alt="" />
    <div class="container px-4 md:px-10 py-4 flex flex-col gap-4 justify-center align-center">
      <div class="flex gap-2 items-center">
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
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
        <div>
          <span>{{ site?.contacts.main.firstName }} {{ site?.contacts.main.lastName }}</span>
          <span class="block text-gray-500">{{ site?.contacts.main.jobTitle }}</span>
        </div>
      </div>
      <div class="flex gap-2 items-center">
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
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
          />
        </svg>
        <span>{{ site?.contacts.main.phoneNumber }}</span>
      </div>
      <div class="flex gap-2 items-center">
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
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
        <span>{{ site?.contacts.main.email }}</span>
      </div>
      <div class="flex gap-2 items-center">
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
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <span
          >{{ site?.contacts.main.address.zipCode }}, {{ site?.contacts.main.address.street }},
          {{ site?.contacts.main.address.city }}, {{ site?.contacts.main.address.state }},
          {{ site?.contacts.main.address.country }}</span
        >
      </div>
    </div>
  </div>
</template>
