<template>
  <div class="container mx-auto px-4 py-4 lg:py-8">
    <!-- Hero Section améliorée -->
    <UiHero />

    <UiAnimatedCards />

    <UiAnimatedText />

    <UiAnimatedCharts />

    <UiScrollAnimations />

    <UiCaroussel />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "guest",
});
</script>
