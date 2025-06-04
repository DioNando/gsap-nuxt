<template>
  <!-- Page content here -->
  <div class="h-16">
    <ApplicationLogo :size="2" />
  </div>
  <header class="w-full bg-base-200 fixed min-h-16 top-0 z-50 shadow-md">
    <div class="navbar">
      <div class="navbar-start">
        <div class="lg:hidden">
          <button @click="toggleDrawer" class="btn btn-ghost btn-circle">
            <Icon
              :name="!isDrawerOpen ? 'majesticons:menu' : 'majesticons:close'"
              size="2rem"
            />
          </button>
        </div>
        <ApplicationLogo :size="2" />
      </div>
      <div class="navbar-center hidden lg:flex"></div>
      <div class="navbar-end flex items-center gap-3">
        <ButtonsLanguageSwitcher />
        <ButtonsThemeToggler />
        <button
          v-if="isAuthenticated"
          class="btn btn-neutral rounded-full"
          @click="
            signOut;
            closeDrawer();
          "
        >
          <Icon name="majesticons:logout-half-circle" size="1rem" />
          <span class="hidden sm:inline">{{ t("sign_out") }}</span>
        </button>
        <button
          v-else
          class="btn btn-primary rounded-full"
          @click="
            navigateTo('/login');
            closeDrawer();
          "
        >
          <Icon name="majesticons:login-half-circle" size="1rem" />
          <span class="hidden sm:inline" @click="closeDrawer()">{{
            t("sign_in")
          }}</span>
        </button>
      </div>
    </div>
    <ul>
      <li
        v-for="(link, index) in navLinks"
        :key="index"
        class="menu-item hidden px-5 py-3 hover:bg-primary"
      >
        <a
          @click="
            navigateTo(link.path);
            closeDrawer();
          "
          class="flex flex-row-reverse justify-between items-center text-lg font-semibold link"
        >
          <Icon :name="link.icon" size="1.75rem" />
          {{ link.title.includes(".") ? t(link.title) : link.title }}</a
        >
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
const { locales, t, setLocale } = useI18n();
const { $gsap } = useNuxtApp();

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const isAuthenticated = ref(!!user.value);

const config = useRuntimeConfig();
const applicationName = config.public.applicationName;

// Définition des liens de navigation
const navLinks = [
  {
    path: "/",
    icon: "majesticons:home",
    title: "nav.home",
  },
  {
    path: "/dashboard",
    icon: "majesticons:dashboard",
    title: "dashboard.title",
  },
  {
    path: "/notes",
    icon: "majesticons:document",
    title: "Mes notes",
  },
  {
    path: "/patients",
    icon: "majesticons:users",
    title: "Patients",
  },
];

// Gestion du drawer
const isDrawerOpen = ref(false);

function toggleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value;

  if (isDrawerOpen.value) {
    $gsap.set(".menu-item", {
      display: "block",
      opacity: 1,
      stagger: 0.2,
      ease: "back.out(1.7)",
      duration: 0.3,
    });
  } else {
    $gsap.set(".menu-item", {
      display: "none",
      opacity: 0,
      stagger: 0.2,
      ease: "back.out(1.7)",
      duration: 0.3,
    });
  }
}

function closeDrawer() {
  isDrawerOpen.value = false;
}

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
