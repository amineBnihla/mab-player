<template>
  <aside class="fixed bg-slate-50 z-10 h-screen py-5 border-r border-gray-200">
    <ul class="list-none">
      <li class="" v-for="(link, index) in links" :key="index">
        <router-link
          :to="link.to"
          class="
            py-2
            hover:bg-primary hover:text-custom_white
            px-4
            text-custom_black
            group
            dark:text-custom_white
            flex
            gap-4
            items-center
          "
        >
          <span v-html="link.icon"></span> {{ link.title }}</router-link
        >
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          title: "Dasboard",
          icon: `<svg width="24" height="24" class="fill-custom_black group-hover:fill-custom_white dark:fill-custom_white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.459 1.6605C12.3259 1.55674 12.162 1.5004 11.9933 1.5004C11.8245 1.5004 11.6606 1.55674 11.5275 1.6605L0.75 10.0643L1.68225 11.2433L3 10.2158V19.5C3.00079 19.8976 3.15908 20.2787 3.44022 20.5598C3.72135 20.8409 4.10242 20.9992 4.5 21H19.5C19.8976 20.9992 20.2787 20.8409 20.5598 20.5598C20.8409 20.2787 20.9992 19.8976 21 19.5V10.2225L22.3177 11.25L23.25 10.071L12.459 1.6605ZM13.5 19.5H10.5V13.5H13.5V19.5ZM15 19.5V13.5C14.9996 13.1023 14.8414 12.721 14.5602 12.4398C14.279 12.1586 13.8977 12.0004 13.5 12H10.5C10.1023 12.0004 9.721 12.1586 9.43978 12.4398C9.15856 12.721 9.0004 13.1023 9 13.5V19.5H4.5V9.0465L12 3.204L19.5 9.054V19.5H15Z"/>
</svg>
`,
          to: "/admin",
        },
        {
          title: "Search",
          icon: `  <svg
            width="24"
            height="24"
            class="fill-custom_black group-hover:fill-custom_white dark:fill-custom_white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 18C11.775 17.9996 13.4988 17.4054 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.405 13.4997 17.9996 11.7754 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z"
            
            />
          </svg>
`,
          to: "/admin/search",
        },
        {
          title: "playlist",
          icon: `  <svg
        width="21"
        class="fill-custom_black group-hover:fill-custom_white dark:fill-custom_white"
        height="16"
        viewBox="0 0 19 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 14V10H9V8H13V4H15V8H19V10H15V14H13ZM0 10V8H7V10H0ZM0 6V4H11V6H0ZM0 2V0H11V2H0Z"
        />
      </svg>
`,
          to: "/admin/playlist",
        },
      ],
    };
  },
};
</script>

<style>
</style>