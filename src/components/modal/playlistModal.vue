<template>
  <div
    class="
      min-h-[450px]
      z-30
      bg-slate-200
      w-[400px]
      origin-center
      max-w-[90%]
      fixed
      top-1/2
      left-1/2
      -translate-x-1/2 -translate-y-1/2
      flex flex-col
      rounded-xl
    "
  >
    <div class="title flex justify-between py-3 px-5">
      <h3>{{ modal_title }}</h3>
      <span
        @click="$emit('toggleModal')"
        class="cursor-pointer text-lg font-semibold text-slate-600"
        >X</span
      >
    </div>
    <form
      @submit.prevent="props.id ? Update() : Add()"
      class="px-5 pt-10 pb-5 flex flex-col gap-5 justify-between flex-grow"
    >
      <div class="flex flex-col gap-10">
        <div class="flex flex-col gap-5">
          <div class="space-y-2">
            <InputField type="text" label="Title" v-model="form.title" />
            <span
              class="text-red-600 block mb-2"
              v-for="(error, index) in v$.title.$errors"
              :key="index"
            >
              {{ error.$message }}
            </span>
          </div>
          <div class="space-y-2 flex flex-col">
            <textarea
              name="description"
              v-model="form.description"
              placeholder="Description"
              class="border-none outline-none p-2"
              cols="40"
            ></textarea>
            <span
              class="text-red-600"
              v-for="(error, index) in v$.description.$errors"
              :key="index"
            >
              {{ error.$message }}
            </span>
          </div>
        </div>
        <div class="inputFile flex gap-2 flex-col">
          <img :src="form.image" class="img" width="90" alt="" srcset="" />
          <input
            type="file"
            @change="chooseFile"
            name="image"
            class="
              file:py-2 file:px-4 file:text-secondary file:font-semibold
              hover:file:text-pink-400
              file:cursor-pointer
              file:rounded-lg
              file:border-none
              file:text-base
            "
            id=""
          />
        </div>
      </div>
      <div class="flex gap-2 justify-self-end">
        <button
          :disabled="loading"
          class="px-4 py-2 rounded-lg bg-secondary"
          type="submit"
        >
          <LoadingComponent v-if="loading" />
          <span
            class="text-base font-semibold tracking-wider text-custom_white"
            v-else
          >
            {{ props.id ? "Edit" : "Add" }}</span
          >
        </button>
        <button
          type="button"
          @click="reset()"
          class="px-4 rounded-base text-custom_black text-lg"
        >
          Reset
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { required, alpha, helpers } from "@vuelidate/validators";
import InputField from "@/components/inputs/InputField.vue";
import LoadingComponent from "@/components/loaders/loadingComponent.vue";
import {
  defineProps,
  defineEmits,
  onMounted,
  computed,
  ref,
  reactive,
} from "vue";
import { useStore } from "vuex";
const emit = defineEmits(["toggleModal"]);
const props = defineProps(["id"]);
const store = useStore();

let modal_title = computed(() =>
  props.id ? "Edit Playlist" : "Add New Playlist"
);
let form = reactive({
  title: "",
  description: "",
  image: require("@/assets/playlist.svg"),
});
const rules = computed(() => ({
  title: {
    required: helpers.withMessage("This Title field cannot be empty", required),
    alpha: helpers.withMessage("The Title field must be string", alpha),
  }, // Matches state.firstName
  description: {
    required: helpers.withMessage(
      "This Description field cannot be empty",
      required
    ),
  },
}));

const v$ = useVuelidate(rules, form);
console.log(v$);

function chooseFile(e) {
  form.image = e.target.files[0];
  let reader = new FileReader();
  reader.onload = () => {
    document.querySelector(".inputFile .img").src = reader.result;
  };
  reader.readAsDataURL(form.image);
}
let loading = ref(false);

async function Add() {
  const res = await v$.value.$validate();
  if (res) {
    try {
      loading.value = true;
      await store.dispatch("playlists/addPlaylist", form);
      loading.value = false;
      emit("toggleModal");

      store.commit("SHOW_MSG", {
        message: "Playlist Added Successfuly",
        type: "success",
      });
    } catch (err) {
      store.commit("SHOW_MSG", { message: err.message, type: "error" });
    }
  }
}
async function Update() {
  const res = await v$.value.$validate();
  if (res) {
    try {
      loading.value = true;
      await store.dispatch("playlists/updatePlaylist", form);
      loading.value = false;
      emit("toggleModal");
      console.log("cooooolMsg");
      store.commit("SHOW_MSG", {
        message: "Playlist Updated Successfuly",
        type: "success",
      });
    } catch (err) {
      store.commit("SHOW_MSG", { message: err.message, type: "error" });
    }
  }
}
function reset() {
  v$.value.$reset();
}
onMounted(async () => {
  if (props.id) {
    console.log(props.id);
    const playlist = await store.dispatch(
      "playlists/fetch_playlist_by_id",
      props.id
    );
    console.log(playlist);

    form.id = playlist.id;
    form.title = playlist.title;
    form.description = playlist.description;
    form.image = playlist.image;
  }
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