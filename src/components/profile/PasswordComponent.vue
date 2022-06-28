<template>
  <ReAuthenticateModal
    v-if="showAuthModal"
    :credentials="passwordCredential"
    @method="updatePassword"
    @toggle-auth-modal="toggleAuthModal"
  />
  <form
    @submit.prevent="updatePassword"
    class="flex flex-col px-4 rounded-md shadow-md gap-10 py-8"
  >
    <h3 class="text-xl font-bold text-slate-600 dark:text-slate-100">
      Change Password
    </h3>

    <div class="relative">
      <InputField
        label="password"
        v-model="passwordCredential.password"
        class="bg-slate-200"
        type="password"
      />
      <span
        class="text-red-600 text-sm absolute left-0 -bottom-6"
        v-if="v$.password.$errors.length > 0"
      >
        {{ v$.password.$errors[0].$message }}
      </span>
    </div>
    <div class="relative">
      <InputField
        label="password confirmation"
        class="bg-slate-200"
        v-model="passwordCredential.confirmPassword"
        type="password"
      />
      <span
        class="text-red-600 text-sm absolute left-0 -bottom-6"
        v-if="v$.confirmPassword.$errors.length > 0"
      >
        {{ v$.confirmPassword.$errors[0].$message }}
      </span>
    </div>

    <button
      type="submit"
      class="py-2 px-4 w-fit bg-secondary text-custom_white rounded-lg"
    >
      <LoadingComponent v-if="loading" />
      <span v-else>update</span>
    </button>
  </form>
</template>

<script setup>
import InputField from "@/components/inputs/InputField.vue";
import ReAuthenticateModal from "@/components/modal/ReAuthenticateModal.vue";
import LoadingComponent from "@/components/loaders/loadingComponent.vue";

import {
  passwordNumber,
  passwordCharachters,
  passwordSpecialChar,
  confirmPasswordMatch,
} from "@/helpers/rules";
import { useStore } from "vuex";
import { reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { helpers, minLength, required } from "@vuelidate/validators";
const store = useStore();
const loading = ref(false);
const passwordCredential = reactive({
  password: "",
  confirmPassword: "",
});
const rules = {
  password: {
    required: helpers.withMessage("password is required", required),
    special: helpers.withMessage(
      "must contain at least one special character - or _",
      passwordSpecialChar
    ),
    number: helpers.withMessage(
      "must contain at least one digit",
      passwordNumber
    ),
    charachter: helpers.withMessage(
      "must contain alphabet",
      passwordCharachters
    ),

    minLength: helpers.withMessage("password must be at least 8", minLength(8)),
  },
  confirmPassword: {
    required: helpers.withMessage(
      "password confirmation is required",
      required
    ),
    sameAsPassword: helpers.withMessage(
      "must match the password",
      confirmPasswordMatch(() => passwordCredential.password)
    ),
  },
};
const v$ = useVuelidate(rules, passwordCredential);
const showAuthModal = ref(false);
function toggleAuthModal() {
  showAuthModal.value = !showAuthModal.value;
  store.commit("CHANGE_OVERLAY");
}
async function updatePassword() {
  const valid = await v$.value.$validate();
  if (valid) {
    loading.value = true;
    try {
      await store.dispatch("profile/update_password", passwordCredential);
      loading.value = false;
      store.commit("SHOW_MSG", {
        message: "Updated successfuly",
        type: "success",
      });
      passwordCredential.password = "";
      passwordCredential.confirmPassword = "";
      reset();
    } catch (error) {
      loading.value = false;
      if (error.message.includes("auth/requires-recent-login")) {
        toggleAuthModal();
      } else {
        store.commit("SHOW_MSG", {
          message: "something went wrong",
          type: "error",
        });
      }
    }
  }
}
function reset() {
  console.log(v$.value);
  v$.value.$reset();
}
</script>

<style>
</style>