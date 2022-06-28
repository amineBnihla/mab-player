<template>
  <form
    @submit.prevent="updateEmail"
    class="flex flex-col px-4 rounded-md shadow-md gap-10 py-8"
  >
    <h3 class="text-xl font-bold text-slate-600 dark:text-slate-100">
      Change Email
    </h3>

    <div>
      <InputField
        label="E-mail"
        class="bg-slate-200"
        v-model="email"
        type="email"
      />
    </div>
    <button
      type="submit"
      class="py-2 px-4 w-fit bg-secondary text-custom_white rounded-lg"
    >
      update
    </button>
  </form>
</template>

<script setup>
import InputField from "@/components/inputs/InputField.vue";
import { ref } from "vue";

const email = ref("");
</script>

<style>
</style>