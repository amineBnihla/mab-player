<template>
  <span
    class="
      w-5
      h-5
      inline-block
      border-2 border-slate-400
      rounded-full
      border-l-slate-200
      loading
    "
  ></span>
</template>

<script>
export default {};
</script>

<style scoped>
.loading {
  animation: loading 1s linear infinite;
}
@keyframes loading {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>