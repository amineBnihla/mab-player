<template>
  <div
    class="
      z-30
      bg-slate-200
      w-[400px]
      origin-center
      max-w-[90%]
      fixed
      top-1/2
      left-1/2
      -translate-x-1/2 -translate-y-1/2
      flex flex-col
      rounded-xl
    "
  >
    <div class="title flex justify-between py-3 px-5">
      <h3>Re-Authenticate</h3>
      <span
        @click="$emit('toggleAuthModal')"
        class="cursor-pointer text-lg font-semibold text-slate-600"
        >X</span
      >
    </div>
    <form
      @submit.prevent="reAuthenticate()"
      class="px-5 pt-10 pb-5 flex flex-col gap-10 justify-between flex-grow"
    >
      <div class="space-y-2">
        <InputField type="password" label="Password" v-model="password" />
        <span
          class="text-red-600 block mb-2"
          v-for="(error, index) in v$.password.$errors"
          :key="index"
        >
          {{ error.$message }}
        </span>
      </div>
      <div class="flex gap-2 justify-self-end">
        <button
          :disabled="loading"
          class="px-4 py-2 rounded-lg bg-secondary"
          type="submit"
        >
          <LoadingComponent v-if="loading" />
          <span
            class="text-base font-semibold tracking-wider text-custom_white"
            v-else
          >
            Sign in</span
          >
        </button>
        <button
          type="button"
          @click="reset()"
          class="px-4 rounded-base text-custom_black text-lg"
        >
          Reset
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import InputField from "@/components/inputs/InputField.vue";
import LoadingComponent from "@/components/loaders/loadingComponent.vue";
import { defineEmits, computed, ref } from "vue";
import { useStore } from "vuex";
const emit = defineEmits(["toggleAuthModal", "method"]);
//const props = defineProps(["credentials"]);
const store = useStore();
const password = ref("");
const rules = computed(() => ({
  password: {
    required: helpers.withMessage("This password cannot be empty", required),
  },
}));

const v$ = useVuelidate(rules, { password });
let loading = ref(false);
async function reAuthenticate() {
  const valid = await v$.value.$validate();
  if (valid) {
    loading.value = true;
    try {
      await store.dispatch("auth/reAuthenticate", password.value);
      emit("method");
      loading.value = false;
      emit("toggleAuthModal");
    } catch (error) {
      loading.value = false;
      console.log(error);
      if (error.message.includes("(auth/wrong-password)")) {
        store.commit("SHOW_MSG", { message: "Wrong password", type: "error" });
      } else {
        store.commit("SHOW_MSG", { message: "something wrong", type: "error" });
      }
    }
  }
}
function reset() {
  v$.value.$reset();
}
</script>

<style scoped>
</style>