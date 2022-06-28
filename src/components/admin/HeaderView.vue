<template>
  <header
    class="h-12 fixed z-20 w-full bg-gradient-to-r from-primary to-secondary"
  >
    <div class="container flex items-center h-full relative justify-between">
      <div class="header_left flex items-center gap-5">
        <slot></slot>
        <router-link to="/admin">
          <img src="../../assets/logo.svg" class="logo w-8" alt="" srcset="" />
        </router-link>
      </div>
      <div class="header_right h-full">
        <button
          class="
            flex
            gap-3
            group
            items-center
            relative
            h-full
            px-2
            hover:bg-slate-100 hover:bg-opacity-10
            md:px-4
            py-1
          "
        >
          <div
            class="
              rounded-full
              w-8
              h-8
              md:w-9 md:h-9
              relative
              overflow-hidden
              bg-slate-100
            "
          >
            <img
              :src="
                $store.state.auth.user.photoURL ||
                require('@/assets/profile_user.svg')
              "
              class="absolute left-0 top-0 w-full h-full object-cover"
              alt="user image"
            />
          </div>
          <span class="text-custom_white text-sm md:text-base">
            {{ name }}
          </span>
          <span
            class="
              shadow-sm
              group-focus:rotate-180
              rounded-full
              grid
              place-items-center
            "
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="fill-custom_white"
            >
              <path
                d="M12 16C11.7664 16.0005 11.5399 15.9191 11.36 15.77L5.36003 10.77C5.15581 10.6003 5.02739 10.3564 5.00301 10.0919C4.97863 9.8275 5.06029 9.56422 5.23003 9.36C5.39977 9.15578 5.64368 9.02736 5.90811 9.00298C6.17253 8.9786 6.43581 9.06026 6.64003 9.23L12 13.71L17.36 9.39C17.4623 9.30694 17.58 9.2449 17.7064 9.20747C17.8327 9.17004 17.9652 9.15795 18.0962 9.17189C18.2272 9.18582 18.3542 9.22552 18.4699 9.2887C18.5855 9.35187 18.6875 9.43727 18.77 9.54C18.8616 9.64282 18.931 9.76345 18.9738 9.89432C19.0166 10.0252 19.0319 10.1635 19.0187 10.3006C19.0056 10.4376 18.9643 10.5705 18.8974 10.6909C18.8305 10.8112 18.7395 10.9165 18.63 11L12.63 15.83C12.4449 15.9555 12.2231 16.0154 12 16V16Z"
              />
            </svg>
          </span>
          <ul
            class="
              menu
              absolute
              top-full
              right-0
              hidden
              group-focus:block
              overflow-hidden
            "
          >
            <li>
              <a
                @click="profileLink"
                class="px-4 py-2 flex gap-5 bg-slate-100 hover:bg-slate-200"
                ><svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C11.0111 2 10.0444 2.29324 9.22215 2.84265C8.3999 3.39206 7.75904 4.17295 7.3806 5.08658C7.00216 6.00021 6.90315 7.00555 7.09607 7.97545C7.289 8.94536 7.7652 9.83627 8.46447 10.5355C9.16373 11.2348 10.0546 11.711 11.0245 11.9039C11.9945 12.0969 12.9998 11.9978 13.9134 11.6194C14.827 11.241 15.6079 10.6001 16.1573 9.77785C16.7068 8.95561 17 7.98891 17 7C17 5.67392 16.4732 4.40215 15.5355 3.46447C14.5979 2.52678 13.3261 2 12 2V2ZM12 10C11.4067 10 10.8266 9.82405 10.3333 9.49441C9.83994 9.16476 9.45542 8.69623 9.22836 8.14805C9.0013 7.59987 8.94189 6.99667 9.05764 6.41473C9.1734 5.83279 9.45912 5.29824 9.87868 4.87868C10.2982 4.45912 10.8328 4.1734 11.4147 4.05764C11.9967 3.94189 12.5999 4.0013 13.1481 4.22836C13.6962 4.45542 14.1648 4.83994 14.4944 5.33329C14.8241 5.82664 15 6.40666 15 7C15 7.79565 14.6839 8.55871 14.1213 9.12132C13.5587 9.68393 12.7956 10 12 10V10ZM21 21V20C21 18.1435 20.2625 16.363 18.9497 15.0503C17.637 13.7375 15.8565 13 14 13H10C8.14348 13 6.36301 13.7375 5.05025 15.0503C3.7375 16.363 3 18.1435 3 20V21H5V20C5 18.6739 5.52678 17.4021 6.46447 16.4645C7.40215 15.5268 8.67392 15 10 15H14C15.3261 15 16.5979 15.5268 17.5355 16.4645C18.4732 17.4021 19 18.6739 19 20V21H21Z"
                    fill="#2D3144"
                  />
                </svg>
                Profile</a
              >
            </li>
            <li>
              <span
                class="flex gap-5 px-4 py-2 bg-slate-100 hover:bg-slate-200"
                @click="logout"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 12H22M22 12L18.667 8M22 12L18.667 16M14 7V5.174C14 4.89738 13.9426 4.62376 13.8314 4.37045C13.7203 4.11714 13.5578 3.88964 13.3542 3.70234C13.1507 3.51503 12.9104 3.37199 12.6488 3.28225C12.3871 3.19252 12.1097 3.15804 11.834 3.181L3.834 3.847C3.33405 3.88864 2.86801 4.11665 2.5283 4.48581C2.18859 4.85498 2.00002 5.33832 2 5.84V18.16C2.00002 18.6617 2.18859 19.145 2.5283 19.5142C2.86801 19.8834 3.33405 20.1114 3.834 20.153L11.834 20.82C12.1098 20.843 12.3873 20.8085 12.649 20.7187C12.9107 20.6289 13.151 20.4857 13.3546 20.2983C13.5582 20.1109 13.7206 19.8833 13.8317 19.6299C13.9428 19.3764 14.0001 19.1027 14 18.826V17"
                    stroke="#2D3144"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Sign Out</span
              >
            </li>
          </ul>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";

const store = useStore();
const router = useRouter();
const name = computed(() => {
  return (
    store.state.auth.user.displayName ||
    store.state.auth.user.email.split("@")[0]
  );
});
async function logout() {
  try {
    await store.dispatch("auth/sign_out");
    router.push({ name: "login" });
  } catch (error) {
    store.commit("SHOW_MSG", { message: error.message, type: "error" });
  }
}
function profileLink() {
  router.push({ name: "profile" });
}
</script>

<style>
</style>