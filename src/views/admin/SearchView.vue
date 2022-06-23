<template>
  <div>
    <div class="flex justify-center">
      <div class="flex relative">
        <InputField
          type="text"
          label="Search"
          id="search"
          class="bg-slate-300 rounded-lg w-80"
          v-model="search"
          @keypress.enter="searchResult"
        />
        <button
          class="
            border-none
            outline-none
            px-2
            absolute
            right-0
            top-1/2
            -translate-y-1/2
          "
          @click="searchResult"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 18C11.775 17.9996 13.4988 17.4054 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.405 13.4997 17.9996 11.7754 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z"
              fill="#064669"
            />
          </svg>
        </button>
      </div>
    </div>
    <div
      v-if="results.length > 0"
      class="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-20"
    >
      <YoutubeCard
        v-for="(result, index) in results"
        :key="index"
        :video="result"
        :addToList="true"
      />
    </div>
    <div class="grid place-items-center min-h-[500px]" v-else-if="loading">
      <LoadingComponent class="w-14 h-14 border-4" />
    </div>
    <div class="empty_state grid place-items-center min-h-[500px]" v-else>
      <img
        src="@/assets/NoResult.svg"
        alt="No Results"
        class="w-60 max-w-full"
      />
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import InputField from "@/components/inputs/InputField.vue";
import YoutubeCard from "@/components/cards/YoutubeCard.vue";
import LoadingComponent from "@/components/loaders/loadingComponent.vue";
let search = ref("");
const store = useStore();
let results = computed(() => store.getters["videos/videos"]);
let loading = ref(false);
async function searchResult() {
  console.log(search.value);

  if (search.value != "") {
    loading.value = true;
    try {
      await store.dispatch("videos/searchResults", search.value);
      loading.value = false;
    } catch (err) {
      store.commit("SHOW_MSG", { message: err.message, type: "error" });
    }
  }
}
</script>

<style>
</style>