<template>
  <div class="home">
    {{ message }}
  </div>
</template>

<script setup>
import { ref } from "vue";
// @ is an alias to /src
const message = ref("Hello Everybody");
</script>
