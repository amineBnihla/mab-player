<template>
  <div class="min-h-screen grid place-items-center">
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
          <div>
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
              class="text-red-600 block"
              >{{ error.$message }}</span
            >
          </div>
          <div>
            <InputField
              type="password"
              label="Password"
              id="password"
              class="rounded-lg"
              v-model="form.password"
            />
            <span
              v-for="(error, index) in v$.password.$errors"
              :key="index"
              class="text-red-600 block"
              >{{ error.$message }}</span
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
      </form>
      <router-link
        to="/login"
        class="text-slate-100 mt-10 capitalize hover:text-slate-200"
        >Already have an account</router-link
      >
    </div>
  </div>
</template>

<script setup>
import InputField from "@/components/inputs/InputField.vue";
import LoadingComponent from "@/components/loaders/loadingComponent.vue";

import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
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
    minLength: helpers.withMessage(
      "password must be at least 8 characteres",
      minLength(8)
    ),
  },
};
const v$ = useVuelidate(rules, form);
let loading = ref(false);
async function signUp() {
  console.log(v$);
  const res = await v$.value.$validate();
  console.log(res);
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