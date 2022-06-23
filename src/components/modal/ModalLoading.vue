<template>
  <div
    class="
      w-20
      h-20
      fixed
      z-30
      top-1/2
      left-1/2
      -translate-x-1/2 -translate-y-1/2
      border-8 border-slate-600
      rounded-full
      border-l-slate-200
      loading
    "
  ></div>
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