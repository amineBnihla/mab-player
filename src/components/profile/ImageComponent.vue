<template>
  <div
    class="
      px-5
      py-10
      flex flex-col
      justify-center
      gap-5
      items-center
      mb-5
      rounded-md
      shadow-md
    "
  >
    <div class="relative">
      <img
        :src="images.image"
        class="profile_img rounded-full shadow-md w-36 h-36 object-cover"
        alt="profile img"
        srcset=""
      />
      <div class="input_file absolute -bottom-1 -right-2">
        <input
          type="file"
          ref="input_file"
          class="hidden"
          @change="changeImage"
          id="input_file"
        />
        <button
          class="w-10 h-10 grid place-items-center rounded-full bg-secondary"
          @click="$refs.input_file.click()"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.7101 11.29C12.5231 11.1068 12.2718 11.0042 12.0101 11.0042C11.7483 11.0042 11.497 11.1068 11.3101 11.29L8.31008 14.19C8.20397 14.2776 8.11706 14.3861 8.0548 14.5088C7.99254 14.6314 7.95627 14.7656 7.94824 14.903C7.94021 15.0403 7.96061 15.1778 8.00815 15.3069C8.05569 15.436 8.12936 15.5539 8.22454 15.6532C8.31973 15.7526 8.43439 15.8312 8.56134 15.8842C8.6883 15.9371 8.82482 15.9634 8.96237 15.9612C9.09993 15.959 9.23555 15.9285 9.36076 15.8715C9.48598 15.8145 9.59809 15.7323 9.69008 15.63L11.0001 14.36V20C11.0001 20.2652 11.1054 20.5196 11.293 20.7071C11.4805 20.8947 11.7349 21 12.0001 21C12.2653 21 12.5196 20.8947 12.7072 20.7071C12.8947 20.5196 13.0001 20.2652 13.0001 20V14.41L14.2901 15.71C14.383 15.8037 14.4936 15.8781 14.6155 15.9289C14.7374 15.9797 14.8681 16.0058 15.0001 16.0058C15.1321 16.0058 15.2628 15.9797 15.3847 15.9289C15.5065 15.8781 15.6171 15.8037 15.7101 15.71C15.8038 15.617 15.8782 15.5064 15.929 15.3846C15.9797 15.2627 16.0059 15.132 16.0059 15C16.0059 14.868 15.9797 14.7373 15.929 14.6154C15.8782 14.4936 15.8038 14.383 15.7101 14.29L12.7101 11.29Z"
              fill="#FEFFFD"
            />
            <path
              d="M17.6699 7.00001C17.2619 5.82106 16.4965 4.79863 15.4802 4.07497C14.464 3.35132 13.2475 2.96243 11.9999 2.96243C10.7523 2.96243 9.5358 3.35132 8.51956 4.07497C7.50332 4.79863 6.73794 5.82106 6.3299 7.00001C5.43145 7.12035 4.58261 7.48266 3.8742 8.0482C3.16578 8.61374 2.62443 9.36123 2.30806 10.2107C1.99169 11.0602 1.91221 11.9797 2.0781 12.8708C2.244 13.762 2.64904 14.5913 3.2499 15.27C3.32247 15.3979 3.42235 15.5081 3.5424 15.593C3.66246 15.6778 3.79974 15.7351 3.94448 15.7609C4.08922 15.7866 4.23786 15.7801 4.3798 15.7418C4.52174 15.7036 4.6535 15.6345 4.76569 15.5395C4.87789 15.4445 4.96776 15.3259 5.02891 15.1923C5.09006 15.0586 5.12098 14.913 5.11947 14.766C5.11796 14.619 5.08406 14.4742 5.02018 14.3418C4.9563 14.2094 4.86402 14.0927 4.7499 14C4.36301 13.5675 4.10988 13.032 4.02118 12.4585C3.93249 11.885 4.01203 11.2981 4.25017 10.7689C4.48831 10.2397 4.87483 9.7909 5.36289 9.47694C5.85094 9.16298 6.41958 8.99731 6.9999 9.00001H7.0999C7.33384 9.00473 7.56203 8.92726 7.74475 8.78108C7.92747 8.63491 8.05314 8.42929 8.0999 8.20001C8.28351 7.29578 8.77408 6.48283 9.48849 5.89891C10.2029 5.31499 11.0972 4.996 12.0199 4.996C12.9426 4.996 13.8369 5.31499 14.5513 5.89891C15.2657 6.48283 15.7563 7.29578 15.9399 8.20001C15.9866 8.42929 16.1123 8.63491 16.295 8.78108C16.4778 8.92726 16.7059 9.00473 16.9399 9.00001H16.9999C17.5802 8.99731 18.1488 9.16298 18.6369 9.47694C19.125 9.7909 19.5115 10.2397 19.7496 10.7689C19.9878 11.2981 20.0673 11.885 19.9786 12.4585C19.8899 13.032 19.6368 13.5675 19.2499 14C19.1618 14.0988 19.0942 14.2141 19.051 14.3392C19.0078 14.4643 18.9899 14.5967 18.9983 14.7288C19.0066 14.8609 19.0411 14.99 19.0998 15.1087C19.1584 15.2273 19.24 15.3331 19.3399 15.42C19.5222 15.5808 19.7568 15.6697 19.9999 15.67C20.1419 15.6698 20.2822 15.6394 20.4115 15.5808C20.5408 15.5222 20.6562 15.4367 20.7499 15.33C21.3674 14.6525 21.7868 13.8182 21.9621 12.9184C22.1375 12.0185 22.0621 11.0878 21.7441 10.228C21.4262 9.36814 20.878 8.61224 20.1595 8.04295C19.4409 7.47365 18.5797 7.11285 17.6699 7.00001V7.00001Z"
              fill="#FEFFFD"
            />
          </svg>
        </button>
      </div>
    </div>
    <button
      class="
        py-2
        px-4
        w-fit
        bg-secondary
        capitalize
        text-custom_white
        rounded-lg
      "
      @click="updateImage"
    >
      <LoadingComponent v-if="loading" />
      <span v-else> Change image</span>
    </button>
  </div>
</template>

<script setup>
import LoadingComponent from "@/components/loaders/loadingComponent.vue";
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const images = reactive({
  image: require("@/assets/profile_user.svg"),
  oldImg: "",
});
function changeImage(e) {
  console.log(e.target.files);
  images.image = e.target.files[0];
  let reader = new FileReader();
  reader.onload = () => {
    document.querySelector(".profile_img").src = reader.result;
  };
  reader.readAsDataURL(images.image);
}
let loading = ref(false);
async function updateImage() {
  if (typeof images.image != "string") {
    loading.value = true;
    try {
      await store.dispatch("profile/change_image", images);
      loading.value = false;
      store.commit("SHOW_MSG", {
        message: "Image Profile Updated Successfuly",
        type: "success",
      });
    } catch (err) {
      store.commit("SHOW_MSG", {
        message: "something went wrong",
        type: "error",
      });
    }
  }
}
onMounted(() => {
  const user = store.state.auth.user;
  if (user.photoURL) {
    images.image = user.photoURL;
    images.oldImg = user.photoURL;
  }
});
</script>

<style>
</style>