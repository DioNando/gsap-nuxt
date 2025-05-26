<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center mb-8">
      {{ t("homepage.title") }}
    </h1>
    <div class="relative card shadow-lg rounded-box w-full bg-base-100 overflow-hidden">
      <div class="p-3">
        <IllustrationsSpotify />
      </div>
      <NuxtParticles
        id="tsparticles"
        :options="particles"
        @load="onLoad"
      ></NuxtParticles>
      <NuxtParticles
        id="alt-tsparticles"
        :options="alt_particles"
        @load="onLoad"
      ></NuxtParticles>
    </div>
    <UiHero />
    <UiCaroussel />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "guest",
});

const { t } = useI18n();

import alt_particles from "~/data/alt-particlesjs-config.json";
import particles from "~/data/particlesjs-config.json";

const onLoad = (container: Container) => {
  container.play();
};
</script>

<style lang="scss" scoped>
#tsparticles,
#alt-tsparticles {
  position: absolute;
  height: 100%;
  width: 100%;
  // scale: 1.2;
  border-radius: 2rem;
}
</style>
