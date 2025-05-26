<template>
  <!-- Component Showcase -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
    <!-- Card 1 -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{{ t("homepage.cards.daisyui.title") }}</h2>
        <p>
          {{ t("homepage.cards.daisyui.description") }}
        </p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">
            {{ t("homepage.cards.daisyui.button") }}
          </button>
        </div>
      </div>
    </div>

    <!-- Card 2 -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{{ t("homepage.cards.gsap.title") }}</h2>
        <p>
          {{ t("homepage.cards.gsap.description") }}
        </p>
        <div class="card-actions justify-end">
          <button class="btn btn-secondary">
            {{ t("homepage.cards.gsap.button") }}
          </button>
        </div>
      </div>
    </div>

    <!-- Card 3 -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{{ t("homepage.cards.nuxt.title") }}</h2>
        <p>
          {{ t("homepage.cards.nuxt.description") }}
        </p>
        <div class="card-actions justify-end">
          <button class="btn btn-accent">
            {{ t("homepage.cards.nuxt.button") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp();

const { t } = useI18n();

onMounted(() => {
  if (process.client) {
    $gsap.from("h1", {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    $gsap.from(".card", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)",
      delay: 0.5,
    });
  }
});
</script>
