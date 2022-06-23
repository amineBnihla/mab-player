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
  let result = await store.dispatch("playlists/fetch_playlists");
  console.log(result);
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