<template>
  <div
    class="
      min-h-[200px]
      w-96
      fixed
      z-30
      top-1/2
      left-1/2
      -translate-x-1/2 -translate-y-1/2
      rounded-lg
      bg-slate-100
      dark:bg-slate-600
      flex flex-col
      gap-5
      items-center
      justify-center
    "
  >
    <div class="toolbar">
      <h2 class="text-slate-600 dark:text-slate-100 text-xl font-semibold">
        Are You Sure ?
      </h2>
    </div>
    <div
      v-if="props.type == 'playlist'"
      class="content text-slate-600 dark:text-slate-100"
    >
      Deleting playlist will delete all video related to it
    </div>
    <div class="action flex gap-4">
      <button
        class="text-slate-600 dark:text-slate-100"
        @click="$emit('toggleModal')"
      >
        cancel
      </button>
      <button
        class="py-[6px] px-4 rounded-lg bg-red-600"
        @click="props.type == 'video' ? deleteVideo() : deletePlaylist()"
      >
        <LoadingComponent v-if="loading" />
        <span v-else class="text-custom_white"> delete </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { useStore } from "vuex";
import LoadingComponent from "@/components/loaders/loadingComponent.vue";
const store = useStore();
const emits = defineEmits(["toggleModal"]);
const props = defineProps(["deleteId", "type"]);
const loading = ref(false);

async function deletePlaylist() {
  try {
    loading.value = true;
    await store.dispatch("playlists/deletePlylist", props.deleteId);
    emits("toggleModal");
    loading.value = false;
    store.commit("SHOW_MSG", {
      message: "Playlist deleted successfuly",
      type: "success",
    });
  } catch (err) {
    emits("toggleModal");
    store.commit("SHOW_MSG", {
      message: "Something went wrong",
      type: "error",
    });
  }
}
async function deleteVideo() {
  try {
    loading.value = true;
    emits("toggleModal");
    await store.dispatch("videos/deleteVideo", props.deleteId);
    loading.value = false;
    store.commit("SHOW_MSG", {
      message: "Video deleted successfuly",
      type: "success",
    });
  } catch (err) {
    emits("toggleModal");
    store.commit("SHOW_MSG", {
      message: "Something went wrong",
      type: "error",
    });
  }
}
</script>

<style scoped>
</style>