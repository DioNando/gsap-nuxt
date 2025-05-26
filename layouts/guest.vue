<template>
  <div class="min-h-screen flex flex-col">
    <header class="navbar bg-base-200 sticky top-0 z-50">
      <div class="navbar-start">
        <ApplicationLogo :size="2" />
      </div>
      <div class="navbar-center hidden lg:flex"></div>
      <div class="navbar-end flex items-center gap-3">
        <LanguageSwitcher />
        <!-- <ThemeToggler /> -->
        <button v-if="isAuthenticated" class="btn btn-neutral rounded-full" @click="signOut">
          <Icon name="majesticons:logout-half-circle" size="1rem" />
          {{ t("sign_out") }}
        </button>
        <button v-else class="btn btn-primary rounded-full" @click="navigateTo('/login')">
          <Icon name="majesticons:login-half-circle" size="1rem" />
          {{ t("sign_in") }}
        </button>
      </div>
    </header>
    <main class="flex-1 bg-gray-200 flex flex-col item-center justify-center">
      <slot />
    </main>
    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
      <aside>
        <p class="flex items-center">{{ t('footer.made_with') }} <Icon name="majesticons:heart" size="1.25rem" class="ml-1 text-primary" /></p>
        <p>{{ t('footer.copyright', { year: new Date().getFullYear() }) }}</p>
      </aside>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { locales, t, setLocale } = useI18n();

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const isAuthenticated = ref(!!user.value);

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
