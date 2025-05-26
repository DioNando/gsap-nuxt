<template>
  <div class="min-h-screen bg-base-100 flex flex-col">
    <div class="navbar bg-base-200">
      <div class="navbar-start">
        <div class="dropdown">
          <div
            tabindex="0"
            role="button"
            class="btn btn-square btn-ghost lg:hidden"
          >
            <Icon name="majesticons:menu" size="1.75rem" />
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/login">Login</NuxtLink></li>
          </ul>
        </div>
        <ApplicationLogo />
      </div>
      <div class="navbar-center hidden lg:flex"></div>
      <div class="navbar-end flex items-center gap-3">
        <LanguageSwitcher />
        <ThemeToggler />
        <button class="btn btn-ghost" @click="signOut">
          <Icon name="majesticons:logout-half-circle" size="1rem" />
          {{ t("sign_out") }}
        </button>
      </div>
    </div>
    <main class="flex-grow">
      <slot />
    </main>
    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
      <aside>
        <p>Copyright © 2025 - All rights reserved</p>
      </aside>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const { locales, t, setLocale } = useI18n();

const supabase = useSupabaseClient();

async function signOut() {
  try {
    await supabase.auth.signOut();
    navigateTo("/");
  } catch (error) {
    console.error("Error signing out:", error);
  }
}
</script>
