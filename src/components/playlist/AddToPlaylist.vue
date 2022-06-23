<template>
  <Transition name="playlist">
    <PlaylistModal v-if="showAddPlaylist" @toggle-modal="toggleAddPlaylist()" />
  </Transition>
  <div
    class="
      fixed
      inset-0
      w-screen
      min-h-screen
      z-20
      overflow-auto
      bg-custom_white
    "
  >
    <div class="toolbar">
      <div
        class="container flex justify-end py-3 border-b-[1px] border-slate-200"
      >
        <span
          class="
            text-custom_black
            font-semibold
            text-lg
            cursor-pointer
            w-10
            h-10
            rounded-full
            bg-slate-100
            hover:bg-slate-200
            grid
            place-items-center
          "
          @click="$emit('togglePlaylistModal')"
          >X</span
        >
      </div>
    </div>
    <div class="container py-10">
      <div class="playlists mb-10">
        <h3 class="text-2xl font-bold mb-5">Playlists</h3>
        <ul
          class="pl-5 flex flex-col gap-4"
          :class="{ 'items-center': loading }"
        >
          <template v-if="loading">
            <SketlonLoader v-for="(number, index) in 5" :key="index" />
          </template>
          <li
            v-else
            class="
              flex
              items-center
              gap-5
              rounded-xl
              cursor-pointer
              hover:bg-slate-300
              dark:hover:bg-slate-800
              shadow-md
              py-3
              px-5
              duration-300
              bg-slate-100
              dark:bg-slate-600
            "
            v-for="(playlist, index) in playlists"
            :key="index"
            @click="addVideoToPlaylist(playlist.id)"
          >
            <img
              :src="playlist.image"
              class="w-14 max-w-full"
              :alt="playlist.title"
              srcset=""
            />
            <div class="content">
              <div class="title text-lg font-semibold text-custom_black">
                {{ playlist.title }}
              </div>
              <p
                class="
                  description
                  text-sm
                  md:text-base
                  text-slate-600
                  dark:text-slate-100
                "
              >
                {{ playlist.description }}
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="div">
        <h3 class="text-2xl font-bold mb-5">Add playlist</h3>
        <button
          class="
            ml-5
            text-lg
            tracking-wide
            py-2
            px-4
            rounded-lg
            shadow-md
            bg-slate-100
            dark:bg-slate-600
            text-custom_black
            dark:text-custom_white
            hover:bg-slate-300
            dark:hover:bg-slate-700
            duration-300
            flex
            gap-2
            items-center
          "
          @click="toggleAddPlaylist()"
        >
          Add New playlist
          <svg
            width="19"
            height="14"
            viewBox="0 0 19 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 14V10H9V8H13V4H15V8H19V10H15V14H13ZM0 10V8H7V10H0ZM0 6V4H11V6H0ZM0 2V0H11V2H0Z"
              fill="#2D3144"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, defineProps, defineEmits } from "vue";
import { useStore } from "vuex";
import PlaylistModal from "@/components/modal/playlistModal.vue";
//import LoadingComponent from "@/components/loaders/loadingComponent.vue";
import SketlonLoader from "@/components/loaders/SketlonLoader.vue";
const props = defineProps(["video"]);
const emits = defineEmits(["togglePlaylistModal"]);
const playlists = computed(() => store.getters["playlists/playlists"]);
const showAddPlaylist = ref(false);
function toggleAddPlaylist() {
  showAddPlaylist.value = !showAddPlaylist.value;
  store.commit("CHANGE_OVERLAY");
}
const store = useStore();
const loading = ref(false);
async function addVideoToPlaylist(playlistId) {
  console.log(playlistId, props.video);
  try {
    loading.value = true;
    const result = await store.dispatch("playlists/addVideoToPlaylist", {
      playlistId: playlistId,
      video: props.video,
    });
    loading.value = false;
    console.log(result);
    if (!result) {
      store.commit("SHOW_MSG", {
        message: "Video already exist in this playlist",
        type: "error",
      });
      return;
    }
    emits("togglePlaylistModal");
    store.commit("SHOW_MSG", {
      message: "Video Added Successfuly",
      type: "success",
    });
  } catch (err) {
    store.commit("SHOW_MSG", {
      message: err.message,
      type: "error",
    });
    loading.value = false;
    emits("togglePlaylistModal");
  }
}
onMounted(async () => {
  console.log(props);
  loading.value = true;
  console.log("start");
  await store.dispatch("playlists/fetch_playlists");
  console.log("end");
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