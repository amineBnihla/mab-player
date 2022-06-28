<template>
  <div class="min-h-screen flex justify-center items-center">
    <div
      class="
        bg-gradient-to-tr
        from-primary
        to-secondary
        flex flex-col
        items-center
        justify-center
        py-5
        min-h-[400px]
        w-[500px]
        max-w-[90%]
        rounded-lg
        relative
      "
    >
      <form
        class="
          relative
          py-10
          px-5
          w-96
          max-w-[90%]
          bg-white bg-opacity-30
          rounded-xl
          backdrop-blur
          grid
          place-items-center
        "
        @submit.prevent="signUp()"
      >
        <h2 class="text-slate-100 text-4xl font-semibold mb-14">Sign Up</h2>
        <div class="flex w-full flex-col gap-9">
          <div class="relative">
            <InputField
              type="email"
              label="E-mail"
              id="email"
              class="rounded-lg"
              v-model="form.email"
            />
            <span
              v-for="(error, index) in v$.email.$errors"
              :key="index"
              class="text-red-600 block absolute left-0 -bottom-6"
              >{{ error.$message }}</span
            >
          </div>
          <div class="relative">
            <InputField
              type="password"
              label="Password"
              id="password"
              class="rounded-lg"
              v-model="form.password"
            />
            <span
              v-if="v$.password.$errors[0]"
              class="text-red-600 block absolute left-0 -bottom-6"
              >{{ v$.password.$errors[0].$message }}</span
            >
          </div>
        </div>
        <button
          type="submit"
          class="
            w-full
            hover:bg-slate-500
            duration-500
            rounded-lg
            bg-slate-600
            py-3
            px-4
            mt-9
            text-custom_white
          "
        >
          <LoadingComponent v-if="loading" />
          <span v-else>Sign up</span>
        </button>
        <router-link
          to="/"
          class="
            text-slate-800
            hover:text-slate-700
            font-medium
            mt-10
            capitalize
          "
          >Already have an account?</router-link
        >
      </form>
    </div>
  </div>
</template>

<script setup>
import InputField from "@/components/inputs/InputField.vue";
import LoadingComponent from "@/components/loaders/loadingComponent.vue";

import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import {
  passwordNumber,
  passwordCharachters,
  passwordSpecialChar,
} from "@/helpers/rules";
import { required, helpers, email, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
const router = useRouter();
const store = useStore();
const form = reactive({
  email: "",
  password: "",
});
const rules = {
  email: {
    email: helpers.withMessage("example@gmail.com", email),
    required: helpers.withMessage("email is required", required),
  },
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
};
const v$ = useVuelidate(rules, form);
let loading = ref(false);
async function signUp() {
  const res = await v$.value.$validate();
  if (res) {
    try {
      loading.value = true;
      await store.dispatch("auth/sign_up", form);
      loading.value = false;
      router.push({ name: "dashboard" });
    } catch (err) {
      loading.value = false;
      store.commit("SHOW_MSG", { message: err.message, type: "error" });
    }
  }
}
</script>

<style>
</style>