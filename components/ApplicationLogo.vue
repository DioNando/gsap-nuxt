<template>
  <div>
    <NuxtLink to="/" class="btn btn-ghost text-xl">
      <!-- <img
        src="/logo.svg"
        alt="GSAP Nuxt Logo"
        class="h-8 w-8 inline-block mr-2"
      /> -->
      GSAP Nuxt
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  size?: string;
}>();
</script>
