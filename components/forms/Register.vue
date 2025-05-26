<template>
  <section class="flex flex-col gap-6 w-full">
    <div class="flex flex-col w-full">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          {{ t("register.display_name") }}
        </legend>
        <input type="text" v-model="display_name" class="input w-full" />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">{{ t("register.email") }}</legend>
        <input type="email" v-model="email" class="input w-full" />
        <p class="label text-error">{{ t(errorMsg) }}</p>
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          {{ t("register.password") }}
        </legend>
        <input type="password" v-model="password" class="input w-full" />
      </fieldset>
    </div>
    <button @click="signUp" class="btn btn-primary">
      {{ t("register.signup") }}
    </button>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const supabase = useSupabaseClient();
const display_name = ref("");
const email = ref("");
const password = ref("");
const errorMsg = ref("");

async function signUp() {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          display_name: display_name.value,
        },
      },
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
