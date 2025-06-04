<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 p-4 lg:p-16">
    <article
      class="text-center relative py-4 col-span-2 flex items-center justify-center"
    >
      <div class="flex flex-col items-center justify-center">
        <h1 class="text-accent text-2xl lg:text-5xl font-bold">
          {{ t("welcome") }}
        </h1>
        <ApplicationLogo :size="8" />
        <span class="text-secondary font-bold text-5xl">{{
          applicationName
        }}</span>
      </div>
    </article>
    <article class="col-span-1">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body flex flex-col items-center gap-4">
          <ApplicationLogo :size="5" class="hidden lg:block" />
          <FormsLogin />
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "guest",
});

import alt_particles from "~/data/alt-particlesjs-config.json";
import particles from "~/data/particlesjs-config.json";

const onLoad = (container: Container) => {
  container.play();
};

const config = useRuntimeConfig();
const applicationName = config.public.applicationName;

const { t } = useI18n();
</script>

<style lang="scss" scoped>
#tsparticles-5,
#tsparticles-6 {
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>
