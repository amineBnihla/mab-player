<template>
  <div
    class="
      w-full
      flex
      gap-16
      bg-slate-100
      items-center
      mb-4
      py-2
      rounded-lg
      px-5
    "
  >
    <div class="h-14 w-14 sketlon"></div>
    <div class="h-9 w-h-9 pt-1">
      <div class="h-2 w-16 sketlon mb-4"></div>
      <div class="h-2 w-32 sketlon"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.sketlon {
  background-image: linear-gradient(
    45deg,
    rgb(100 116 139 / 60%),
    rgb(100 116 139 / 60%) 50%,
    rgb(100 116 139 / 30%) 50.1%,
    rgb(100 116 139 / 30%) 70%,
    rgb(100 116 139 / 60%) 70.1%
  );
  background-size: 250%;
  animation: sketlon 3s linear infinite;
}
@keyframes sketlon {
  0% {
    background-position-x: -50px;
  }
  100% {
    background-position-x: 500px;
  }
}
</style>