<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center mb-8">DaisyUI + GSAP + Nuxt</h1>

    <!-- Hero Section -->
    <div class="hero bg-base-200 rounded-lg my-4">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h2 class="text-3xl font-bold">Welcome to Your Project</h2>
          <p class="py-6">
            This template includes DaisyUI, GSAP, and other integrations to help
            you build amazing user experiences.
          </p>
          <button class="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>

    <!-- Component Showcase -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      <!-- Card 1 -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">DaisyUI Components</h2>
          <p>
            DaisyUI provides beautiful components built on top of TailwindCSS.
          </p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Learn More</button>
          </div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">GSAP Animations</h2>
          <p>
            Create smooth, professional animations with the GreenSock Animation
            Platform.
          </p>
          <div class="card-actions justify-end">
            <button class="btn btn-secondary">Explore</button>
          </div>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Nuxt 3 Features</h2>
          <p>
            Take advantage of all the powerful features of Nuxt 3 framework.
          </p>
          <div class="card-actions justify-end">
            <button class="btn btn-accent">Discover</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Alert component -->
    <div class="alert alert-info my-8">
      <Icon name="heroicons:information-circle" size="1.5em" />
      <span>Customize your theme in the tailwind.config.js file!</span>
    </div>

    <!-- Progress and Rating -->
    <div class="flex flex-col md:flex-row gap-6 my-8">
      <div class="flex-1">
        <h3 class="text-xl font-semibold mb-4">Progress Indicators</h3>
        <progress
          class="progress progress-primary w-full mb-2"
          value="40"
          max="100"
        ></progress>
        <progress
          class="progress progress-secondary w-full mb-2"
          value="70"
          max="100"
        ></progress>
        <progress
          class="progress progress-accent w-full"
          value="90"
          max="100"
        ></progress>
      </div>
      <div class="flex-1">
        <h3 class="text-xl font-semibold mb-4">Rating Component</h3>
        <div class="rating">
          <input
            type="radio"
            name="rating-2"
            class="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            class="mask mask-star-2 bg-orange-400"
            checked
          />
          <input
            type="radio"
            name="rating-2"
            class="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            class="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            class="mask mask-star-2 bg-orange-400"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "guest",
});

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
