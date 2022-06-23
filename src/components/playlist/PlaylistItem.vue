<template>
  <!--  <div v-if="props.loading" class="w-20 h-20">

  </div> -->
  <li
    class="
      flex
      items-center
      justify-between
      rounded-lg
      md:px-5
      bg-slate-200
      hover:bg-slate-300
    "
  >
    <div
      class="flex flex-grow items-center px-2 py-3 cursor-pointer"
      @click="showPlaylistVideos(props.playlist)"
    >
      <div class="playlist_img mr-10 grid place-items-center">
        <img
          :src="props.playlist.image"
          class="w-14 max-w-full"
          alt="login"
          srcset=""
        />
      </div>
      <div class="playlist_content">
        <h3 class="text-lg text-custom_black font-medium">
          {{ props.playlist.title }}
        </h3>
        <p
          class="
            text-sm
            md:text-base
            line-clamp-1
            text-slate-600
            dark:text-slate-100
          "
        >
          {{ props.playlist.description }}
        </p>
      </div>
    </div>

    <div class="playlist_action relative flex justify-end">
      <span
        class="
          inline-block
          rounded-full
          relative
          cursor-pointer
          duration-300
          hover:bg-slate-300
          group
        "
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.0049 11.995V12.005M12.0049 7.995V8.005M12.0049 15.995V16.005"
            stroke="#2D3144"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <Transition name="menu">
          <ul
            class="
              absolute
              group-hover:block
              hidden
              -top-[205%]
              -right-4
              rounded-lg
              overflow-hidden
            "
          >
            <li
              class="
                px-4
                py-2
                cursor-pointer
                bg-slate-100
                dark:bg-slate-600
                hover:bg-slate-300
                dark:hover:bg-slate-800
              "
              @click="$emit('editItem')"
            >
              <span
                class="
                  text-sm
                  md:text-base
                  text-custom_black
                  dark:text-custom_white
                "
                >Edit</span
              >
            </li>
            <li
              class="
                px-4
                py-2
                cursor-pointer
                bg-slate-100
                dark:bg-slate-600
                hover:bg-slate-300
                dark:hover:bg-slate-800
              "
              @click="$emit('deleteItem')"
            >
              <span
                class="
                  text-sm
                  md:text-base
                  text-custom_black
                  dark:text-custom_white
                "
                >Delete</span
              >
            </li>
          </ul>
        </Transition>
      </span>
    </div>
  </li>
</template>

<script setup>
import { defineProps } from "vue";

import { useRouter } from "vue-router";
const props = defineProps(["playlist"]);

//router variable to access all properties
const router = useRouter();
function showPlaylistVideos(playlist) {
  router.push({ name: "videos", params: { id: playlist.id } });
}
</script>

<style>
</style>