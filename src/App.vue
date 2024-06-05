<script setup lang="ts">
import { onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import { useMainStore } from '@/stores/main'

const store = useMainStore()

onMounted(async () => {
  await store.fetchSites()
})
</script>

<template>
  <header>
    <NavBar :siteName="'SCHEDULING'" />
  </header>
  <RouterView />
</template>
