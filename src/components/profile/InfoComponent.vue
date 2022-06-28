<template>
  <ReAuthenticateModal
    v-if="showAuthModal"
    :credentials="info"
    @method="updateInfo"
    @toggle-auth-modal="toggleAuthModal"
  />
  <form
    @submit.prevent="updateInfo"
    class="flex flex-col px-4 rounded-md shadow-md gap-10 py-8"
  >
    <h3 class="text-xl font-bold text-slate-600 dark:text-slate-100">
      Change Info
    </h3>
    <div class="relative">
      <InputField
        label="name"
        v-model="info.name"
        class="bg-slate-200"
        type="text"
      />
      <span
        v-for="(error, index) in v$.name.$errors"
        class="text-red-600 absolute left-0 -bottom-6"
        :key="index"
      >
        {{ error.$message }}
      </span>
    </div>
    <div class="relative">
      <InputField
        label="E-mail"
        class="bg-slate-200"
        v-model="info.email"
        type="email"
      />
      <span
        v-for="(error, index) in v$.email.$errors"
        class="text-red-600 absolute left-0 -bottom-6"
        :key="index"
      >
        {{ error.$message }}
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
import LoadingComponent from "@/components/loaders/loadingComponent.vue";
import ReAuthenticateModal from "@/components/modal/ReAuthenticateModal.vue";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, email } from "@vuelidate/validators";
import { useStore } from "vuex";
import { reactive, ref, onMounted } from "vue";
const store = useStore();
const showAuthModal = ref(false);
function toggleAuthModal() {
  showAuthModal.value = !showAuthModal.value;
  store.commit("CHANGE_OVERLAY");
}
const info = reactive({
  name: "",
  email: "",
});
const rules = {
  name: { required: helpers.withMessage("name is required", required) },
  email: {
    required: helpers.withMessage("e-mail is required", required),
    email: helpers.withMessage("Ex:example@gmail.com", email),
  },
};
const v$ = useVuelidate(rules, info);
let loading = ref(false);
async function updateInfo() {
  const valid = await v$.value.$validate();
  if (valid) {
    loading.value = true;
    try {
      await store.dispatch("profile/update_info", info);
      loading.value = false;
      store.commit("SHOW_MSG", {
        message: "Updated successfuly",
        type: "success",
      });
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
onMounted(() => {
  const user = store.state.auth.user;
  if (user.displayName || user.email) {
    info.name = user.displayName;
    info.email = user.email;
  }
});
</script>

<style>
</style>