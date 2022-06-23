<template>
  <Transition name="alert">
    <AlertMsg
      v-if="$store.state.message"
      :message="$store.state.message"
      :type="$store.state.type"
    />
  </Transition>
  <router-view />
</template>
<script setup>
import AlertMsg from "@/components/modal/AlertMsg";
</script>
<style scoped>
.alert-enter-active,
.alert-leave-active {
  transition: 0.6s;
}
.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
