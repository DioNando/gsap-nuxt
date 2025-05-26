<template>
  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <header class="navbar bg-base-200 sticky top-0 z-50">
        <div class="navbar-start">
          <div class="lg:hidden">
            <label for="my-drawer" class="btn btn-ghost btn-circle">
              <Icon name="heroicons:bars-3" size="1.5rem" />
            </label>
          </div>
          <ApplicationLogo :size="2" />
        </div>
        <div class="navbar-center hidden lg:flex"></div>
        <div class="navbar-end flex items-center gap-3">
          <ButtonsLanguageSwitcher />
          <!-- <ThemeToggler /> -->
          <button
            v-if="isAuthenticated"
            class="btn btn-neutral rounded-full"
            @click="signOut"
          >
            <Icon name="majesticons:logout-half-circle" size="1rem" />
            <span class="hidden sm:inline">{{ t("sign_out") }}</span>
          </button>
          <button
            v-else
            class="btn btn-primary rounded-full"
            @click="navigateTo('/login')"
          >
            <Icon name="majesticons:login-half-circle" size="1rem" />
            <span class="hidden sm:inline">{{ t("sign_in") }}</span>
          </button>
        </div>
      </header>
    </div>
    <div class="drawer-side z-[100]">
      <label
        for="my-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul
        class="flex flex-col gap-3 p-4 w-64 min-h-full bg-base-200 text-base-content"
      >
        <!-- Sidebar content here -->
        <div class="mb-2 flex flex-row items-center">
          <ApplicationLogo :size="2" />
          <span class="text-secondary font-bold text-xl">{{
            applicationName
          }}</span>
        </div>
        <li>
          <a
            @click="navigateTo('/')"
            class="btn btn-ghost hover:btn-primary flex justify-start items-center"
          >
            <Icon name="majesticons:home" size="1rem" />
            {{ t("nav.home") }}</a
          >
        </li>
        <li>
          <a
            @click="navigateTo('/dashboard')"
            class="btn btn-ghost hover:btn-primary flex justify-start items-center"
          >
            <Icon name="majesticons:dashboard" size="1rem" />
            {{ t("dashboard.title") }}</a
          >
        </li>
        <li>
          <a
            @click="navigateTo('/dashboard')"
            class="btn btn-ghost hover:btn-primary flex justify-start items-center"
          >
            <Icon name="majesticons:document" size="1rem" />
            Mes notes</a
          >
        </li>
        <li>
          <a
            @click="navigateTo('/dashboard')"
            class="btn btn-ghost hover:btn-primary flex justify-start items-center"
          >
            <Icon name="majesticons:users" size="1rem" />
            Patients</a
          >
        </li>
        <li class="mt-auto">
          <button
            v-if="isAuthenticated"
            class="btn btn-neutral btn-outline"
            @click="signOut"
          >
            <Icon name="majesticons:logout-half-circle" size="1rem" />
            {{ t("sign_out") }}
          </button>
          <button
            v-else
            class="btn btn-soft hover:btn-primary flex justify-start items-center w-full"
            @click="navigateTo('/login')"
          >
            <Icon name="majesticons:login-half-circle" size="1rem" />
            {{ t("sign_in") }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locales, t, setLocale } = useI18n();

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const isAuthenticated = ref(!!user.value);

const config = useRuntimeConfig();
const applicationName = config.public.applicationName;

async function signOut() {
  try {
    await supabase.auth.signOut();
    isAuthenticated.value = false;
    navigateTo("/");
  } catch (error) {
    console.error("Error signing out:", error);
  }
}
</script>
