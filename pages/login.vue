<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 p-4 lg:p-16">
    <article class="text-center relative py-4 col-span-2 flex items-center justify-center">
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
      <div class="flex flex-col items-center justify-center">
        <h1 class="text-accent text-2xl lg:text-5xl font-bold">{{ t("welcome") }}</h1>
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
          <section class="flex flex-col gap-6 w-full">
            <div class="flex flex-col w-full">
              <fieldset class="fieldset">
                <legend class="fieldset-legend">{{ t("login.email") }}</legend>
                <div class="input w-full">
                  <Icon
                    name="majesticons:flower-2"
                    class="h-[1em] opacity-50"
                  />
                  <input type="email" v-model="email" />
                </div>
                <p class="label text-error">{{ t(errorMsg) }}</p>
              </fieldset>
              <fieldset class="fieldset">
                <legend class="fieldset-legend">
                  {{ t("login.password") }}
                </legend>
                <div class="input w-full">
                  <Icon name="majesticons:key" class="h-[1em] opacity-50" />
                  <input type="password" v-model="password" />
                </div>
              </fieldset>
            </div>
            <button @click="signIn" class="btn btn-primary">
              {{ t("login.signin_with_email") }}
            </button>
          </section>
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
const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
const errorMsg = ref<string>("");

async function signIn() {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    navigateTo("/dashboard");
  } catch (error: any) {
    errorMsg.value = error.message || "An unexpected error occurred.";
  } finally {
    if (!errorMsg.value) {
      email.value = "";
      password.value = "";
    }
  }
}
</script>

<style lang="scss" scoped>
#tsparticles,
#alt-tsparticles {
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>
