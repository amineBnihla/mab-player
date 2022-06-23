<template>
  <OverlayView v-if="$store.state.openOverlay" />
  <div class="relative">
    <HeaderView>
      <span
        class="inline-block w-8 h-8 cursor-pointer"
        @click="showSidebar = !showSidebar"
      >
        <svg
          viewBox="0 0 24 24"
          class="fill-gray-50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 8H21C21.2652 8 21.5196 7.89464 21.7071 7.70711C21.8946 7.51957 22 7.26522 22 7C22 6.73478 21.8946 6.48043 21.7071 6.29289C21.5196 6.10536 21.2652 6 21 6H3C2.73478 6 2.48043 6.10536 2.29289 6.29289C2.10536 6.48043 2 6.73478 2 7C2 7.26522 2.10536 7.51957 2.29289 7.70711C2.48043 7.89464 2.73478 8 3 8V8ZM21 16H3C2.73478 16 2.48043 16.1054 2.29289 16.2929C2.10536 16.4804 2 16.7348 2 17C2 17.2652 2.10536 17.5196 2.29289 17.7071C2.48043 17.8946 2.73478 18 3 18H21C21.2652 18 21.5196 17.8946 21.7071 17.7071C21.8946 17.5196 22 17.2652 22 17C22 16.7348 21.8946 16.4804 21.7071 16.2929C21.5196 16.1054 21.2652 16 21 16ZM21 11H3C2.73478 11 2.48043 11.1054 2.29289 11.2929C2.10536 11.4804 2 11.7348 2 12C2 12.2652 2.10536 12.5196 2.29289 12.7071C2.48043 12.8946 2.73478 13 3 13H21C21.2652 13 21.5196 12.8946 21.7071 12.7071C21.8946 12.5196 22 12.2652 22 12C22 11.7348 21.8946 11.4804 21.7071 11.2929C21.5196 11.1054 21.2652 11 21 11Z"
          />
        </svg>
      </span>
    </HeaderView>
    <div class="relative top-12 min-h-screen">
      <Transition name="overlayTransition">
        <div
          v-if="showSidebarOverlay"
          class="
            sidebar_overlay
            z-[5]
            absolute
            w-full
            h-full
            bg-black bg-opacity-75
          "
        ></div>
      </Transition>

      <SidebarView class="duration-700 z-30" :class="toggleSideBar" />
      <div class="main relative duration-500 py-10" :class="toggleContent">
        <div class="container">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderView from "@/components/admin/HeaderView.vue";
import SidebarView from "@/components/admin/SidebarView.vue";

import { computed, ref, defineAsyncComponent, watch } from "vue";

const OverlayView = defineAsyncComponent(() =>
  import("@/components/modal/overlayView.vue")
);
let showSidebar = ref(true);
let showSidebarOverlay = ref(false);

let toggleSideBar = computed(() => {
  return showSidebar.value == true ? "left-0 w-64" : "-left-full w-0";
});
let toggleContent = computed(() => {
  return showSidebar.value == true
    ? "left-0 w-full lg:w-[calc(100%-16rem)] lg:left-64 "
    : "left-0 w-full";
});
watch(showSidebar, (newVal) => {
  if (window.innerWidth < 1025) {
    showSidebarOverlay.value = newVal;
  }
});
if (window.innerWidth < 1025) {
  showSidebar.value = false;
} else {
  showSidebar.value = true;
}
window.addEventListener("resize", function () {
  if (this.innerWidth < 1025) {
    showSidebar.value = false;
  } else {
    showSidebar.value = true;
  }
});
</script>

<style scoped>
.overlayTransition-enter-active,
.overlayTransition-leave-active {
  transition: 500ms;
}
.overlayTransition-enter-from,
.overlayTransition-enter-to {
  opacity: 0;
  transform: translateX(-200px);
}
</style>