<template>
  <Teleport to="body" v-if="toggleModal">
    <Suspense>
      <VideoModal :video_id="props.video.id">
        <span
          class="
            text-custom_black
            font-semibold
            text-lg
            absolute
            -top-12
            right-0
            cursor-pointer
            w-10
            h-10
            rounded-full
            bg-slate-100
            hover:bg-slate-200
            grid
            place-items-center
          "
          @click="showModal()"
          >X</span
        >
      </VideoModal>
      <template #fallback>
        <ModalLoading />
      </template>
    </Suspense>
  </Teleport>

  <AddToPlaylist
    v-if="showAddToPlaylist"
    @toggle-playlist-modal="showAddToList()"
    :video="props.video"
  />
  <MessageDelete
    v-if="showDeleteModal"
    type="video"
    @toggle-Modal="removeFromList()"
    :deleteId="props.video.id"
  />
  <div class="card relative rounded-lg flex flex-col overflow-hidden shadow-md">
    <img
      loading="lazy"
      :src="props.video.thumbnails"
      :alt="props.video.title"
      class="aspect-video"
    />
    <div
      class="
        card_content
        p-4
        relative
        flex flex-col flex-grow
        justify-between
        gap-5
      "
    >
      <h3 class="text-xl font-semibold text-custom_black">
        {{ props.video.title }}
      </h3>
      <p>
        {{ props.video.description }}
      </p>
      <div class="action flex gap-4">
        <button
          class="
            py-2
            px-4
            bg-primary
            rounded-lg
            text-custom_white
            text-base
            font-medium
          "
          @click="showModal()"
        >
          Watch
        </button>
        <button
          class="
            py-2
            px-4
            bg-secondary
            rounded-lg
            text-custom_white
            text-base
            font-medium
          "
          :class="props.addToList ? 'bg-secondary' : 'bg-red-600'"
          @click="
            props.addToList ? showAddToList(props.video) : removeFromList()
          "
        >
          {{ props.addToList ? "Add" : "Remove" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, defineAsyncComponent } from "vue";
import ModalLoading from "@/components/modal/ModalLoading.vue";
import ErrorModal from "@/components/modal/ErrorModal.vue";
import MessageDelete from "@/components/modal/MessageDelete.vue";
import { useStore } from "vuex";
const props = defineProps(["video", "addToList"]);
const VideoModal = defineAsyncComponent(() =>
  import("@/components/modal/VideoModal.vue")
);
const AddToPlaylist = defineAsyncComponent({
  loader: () => import("@/components/playlist/AddToPlaylist.vue"),
  loadingComponent: ModalLoading,
  errorComponent: ErrorModal,
});
const store = useStore();
let toggleModal = ref(false);
let showAddToPlaylist = ref(false);
let showDeleteModal = ref(false);
function showModal() {
  toggleModal.value = !toggleModal.value;
  if (toggleModal.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  store.commit("CHANGE_OVERLAY");
}

function showAddToList() {
  showAddToPlaylist.value = !showAddToPlaylist.value;
  if (showAddToPlaylist.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}
function removeFromList() {
  showDeleteModal.value = !showDeleteModal.value;
  store.commit("CHANGE_OVERLAY");
}
</script>

<style>
</style>