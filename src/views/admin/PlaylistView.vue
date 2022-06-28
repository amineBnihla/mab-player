<template>
  <Transition name="playlist">
    <PlaylistModal
      v-if="showModal"
      :id="editId"
      @toggle-Modal="toggleModal(true)"
    />
  </Transition>
  <Transition name="playlist">
    <MessageDelete
      v-if="showDeleteModal"
      @toggle-Modal="toggleModal(false)"
      :deleteId="deleteId"
      type="playlist"
    />
  </Transition>

  <div
    class="
      toolbar
      bg-secondary
      px-3
      md:px-5
      flex
      items-center
      justify-between
      py-2
      mb-10
      rounded-lg
    "
  >
    <div class="text-custom_white flex items-center">
      <span class="text-xl font-semibold">Playlists</span>
      <svg
        width="21"
        class="fill-custom_white ml-3 mt-1"
        height="16"
        viewBox="0 0 19 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 14V10H9V8H13V4H15V8H19V10H15V14H13ZM0 10V8H7V10H0ZM0 6V4H11V6H0ZM0 2V0H11V2H0Z"
        />
      </svg>
    </div>
    <button
      @click="addPlaylist()"
      class="
        bg-primary
        py-2
        px-2
        md:px-4
        flex
        items-center
        gap-2
        text-custom_white
        hover:bg-opacity-75
        rounded-lg
      "
    >
      New Playlist
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 20V12M12 12V4M12 12H20M12 12H4"
          stroke="#FEFFFD"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>
    </button>
  </div>
  <div>
    <ul class="flex flex-col gap-5">
      <div v-if="loading">
        <SketlonLoader v-for="(number, index) in 20" :key="index" />
      </div>
      <div
        v-else-if="!loading && playlists.length == 0"
        class="min-h-[500px] flex flex-col justify-center items-center"
      >
        <svg
          width="156"
          height="153"
          viewBox="0 0 156 153"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M141.581 0.134033H14.5169C6.59678 0.134033 0.17627 6.55454 0.17627 14.4747H155.922C155.922 6.55454 149.502 0.134033 141.581 0.134033Z"
            fill="url(#paint0_linear_557_715)"
          />
          <path
            d="M0.17627 14.0828H155.922V132.701C155.922 137.975 153.827 143.033 150.098 146.762C146.369 150.491 141.311 152.586 136.037 152.586H20.0614C14.7875 152.586 9.72966 150.491 6.00048 146.762C2.2713 143.033 0.17627 137.975 0.17627 132.701V14.0828Z"
            fill="url(#paint1_linear_557_715)"
          />
          <path
            d="M129.15 29.0654H26.9984C24.8711 29.0654 23.1465 30.7881 23.1465 32.9132C23.1465 35.0382 24.8711 36.7609 26.9984 36.7609H129.15C131.278 36.7609 133.002 35.0382 133.002 32.9132C133.002 30.7881 131.278 29.0654 129.15 29.0654Z"
            fill="url(#paint2_linear_557_715)"
          />
          <path
            d="M129.15 61.7609H26.9984C24.8711 61.7609 23.1465 63.4836 23.1465 65.6087C23.1465 67.7338 24.8711 69.4565 26.9984 69.4565H129.15C131.278 69.4565 133.002 67.7338 133.002 65.6087C133.002 63.4836 131.278 61.7609 129.15 61.7609Z"
            fill="url(#paint3_linear_557_715)"
          />
          <path
            d="M129.15 94.4565H26.9984C24.8711 94.4565 23.1465 96.1792 23.1465 98.3043C23.1465 100.429 24.8711 102.152 26.9984 102.152H129.15C131.278 102.152 133.002 100.429 133.002 98.3043C133.002 96.1792 131.278 94.4565 129.15 94.4565Z"
            fill="url(#paint4_linear_557_715)"
          />
          <path
            d="M129.15 127.152H26.9984C24.8711 127.152 23.1465 128.875 23.1465 131C23.1465 133.125 24.8711 134.847 26.9984 134.847H129.15C131.278 134.847 133.002 133.125 133.002 131C133.002 128.875 131.278 127.152 129.15 127.152Z"
            fill="url(#paint5_linear_557_715)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_557_715"
              x1="-0.000123064"
              y1="3.44365"
              x2="156"
              y2="14.4436"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#DD5DB6" />
              <stop offset="1" stop-color="#8960CB" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_557_715"
              x1="-4.50011"
              y1="117.944"
              x2="220.5"
              y2="121.944"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop offset="1" stop-color="#C5BCFF" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_557_715"
              x1="18.5002"
              y1="36.4436"
              x2="139.5"
              y2="36.4436"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#DD5DB6" />
              <stop offset="1" stop-color="#D2F7FF" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_557_715"
              x1="18.5002"
              y1="69.1391"
              x2="139.5"
              y2="69.1391"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#DD5DB6" />
              <stop offset="1" stop-color="#D2F7FF" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_557_715"
              x1="18.5002"
              y1="101.835"
              x2="139.5"
              y2="101.835"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#DD5DB6" />
              <stop offset="1" stop-color="#D2F7FF" />
            </linearGradient>
            <linearGradient
              id="paint5_linear_557_715"
              x1="18.5002"
              y1="134.53"
              x2="139.5"
              y2="134.53"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#DD5DB6" />
              <stop offset="1" stop-color="#D2F7FF" />
            </linearGradient>
          </defs>
        </svg>
        <h2 class="mt-4 text-xl font-medium">No Playlists</h2>
      </div>
      <template v-else>
        <PlaylistItem
          v-for="(playlist, index) in playlists"
          :key="index"
          :playlist="playlist"
          @delete-item="deletePlaylist(playlist.id)"
          @edit-item="editPlaylist(playlist.id)"
        />
      </template>
    </ul>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

//import all the component

import PlaylistItem from "@/components/playlist/PlaylistItem.vue";
import SketlonLoader from "@/components/loaders/SketlonLoader.vue";
import PlaylistModal from "@/components/modal/playlistModal.vue";
import MessageDelete from "@/components/modal/MessageDelete.vue";
//store variable to access all  properties
const store = useStore();

//conditional variables

let showModal = ref(false);
let showDeleteModal = ref(false);
//get playlists from tha playlists store
let playlists = computed(() => store.getters["playlists/playlists"]);

//show add and edit modal or delete modal
function toggleModal(addEdit) {
  if (addEdit) {
    showModal.value = !showModal.value;
  } else {
    showDeleteModal.value = !showDeleteModal.value;
  }
  store.commit("CHANGE_OVERLAY");
}

//pass id to the modal to update element
let editId = ref(null);
let deleteId = ref(null);

//show modal to update playlist
function editPlaylist(id) {
  toggleModal(true);
  editId.value = id;
}
//show modal to add playlist
function addPlaylist() {
  toggleModal(true);
  editId.value = null;
}

//delete element using it's id
function deletePlaylist(id) {
  toggleModal(false);
  deleteId.value = id;
}
let loading = ref(false);
onMounted(async () => {
  loading.value = true;
  await store.dispatch("playlists/fetch_playlists");
  loading.value = false;
});
</script>

<style scoped>
.playlist-enter-active,
.playlist-leave-active {
  transition: 0.6s;
}
.playlist-enter-from,
.playlist-leave-to {
  opacity: 0;
  transform: scale(0.8) translate(-50%, -50%);
}
</style>