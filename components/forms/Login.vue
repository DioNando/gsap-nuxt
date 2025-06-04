<template>
  <section class="flex flex-col gap-6 w-full">
    <div class="flex flex-col w-full">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">{{ t("login.email") }}</legend>
        <div class="input w-full">
          <Icon name="majesticons:user" class="h-[1em] opacity-50" />
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
</template>

<script setup lang="ts">
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
