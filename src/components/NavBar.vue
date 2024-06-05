<template>
  <nav class="relative px-4 py-4 flex justify-center items-center bg-white">
    <router-link id="navbar-title" :to="{ path: '/' }" class="text-3xl font-bold leading-none">
      {{ siteName }}
    </router-link>
  </nav>
</template>

<script setup>
const props = defineProps(['siteName'])
const siteName = props.siteName ? props.siteName : 'Application'
</script>
