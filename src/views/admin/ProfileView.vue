<template>
  <ImageComponent />
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
    <InfoComponent />
    <PasswordComponent />
  </div>
</template>

<script setup>
import ImageComponent from "@/components/profile/ImageComponent";
import InfoComponent from "@/components/profile/InfoComponent.vue";
import PasswordComponent from "@/components/profile/PasswordComponent.vue";
</script>

<style>
</style>