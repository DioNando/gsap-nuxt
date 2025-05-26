<template>
  <div class="min-h-screen flex flex-col">
    <header class="navbar bg-base-200 sticky top-0 z-50">
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
            <li>
              <NuxtLink to="/">{{ t("nav.home") }}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/login">{{ t("nav.login") }}</NuxtLink>
            </li>
          </ul>
        </div>
        <ApplicationLogo :size="2" />
      </div>
      <div class="navbar-center hidden lg:flex"></div>
      <div class="navbar-end flex items-center gap-3">
        <LanguageSwitcher />
        <!-- <ThemeToggler /> -->
        <button class="btn btn-ghost" @click="signOut">
          <Icon name="majesticons:logout-half-circle" size="1rem" />
          {{ t("sign_out") }}
        </button>
      </div>
    </header>
    <main class="flex-1 bg-gray-200">
      <slot />
    </main>
    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
      <aside>
        <p>{{ t("copyright", { year: new Date().getFullYear() }) }}</p>
      </aside>
    </footer>
  </div>
</template>

<script setup lang="ts">
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
