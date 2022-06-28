<template>
  <div class="toolbar">
    <h2
      class="
        text-4xl
        font-semibold
        text-slate-600
        dark:text-slate-100
        capitalize
      "
    >
      {{ $store.state.videos.playlist.title }}
    </h2>
  </div>
  <div v-if="loading" class="min-h-[500px] grid place-items-center">
    <LoadingComponent class="w-14 h-14 border-4" />
  </div>
  <div
    v-else
    class="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10"
  >
    <YoutubeCard
      v-for="(video, index) in videos"
      :key="index"
      :video="video"
      :addToList="false"
    />
  </div>
</template>

<script setup>
import YoutubeCard from "@/components/cards/YoutubeCard.vue";
import LoadingComponent from "@/components/loaders/loadingComponent.vue";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const route = useRoute();
const videos = computed(() => store.getters["videos/videos"]);
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  await store.dispatch("videos/fetchVideosOfPlaylist", route.params.id);
  loading.value = false;
});
onUnmounted(() => {
  store.commit("videos/RESET_VIDEOS");
});
</script>

<style>
</style>