<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
    <InsightsCard />
    <div class="rounded-lg shadow-xl bg-gray-50 py-5 px-2">
      <BarChart />
    </div>
    <div class="rounded-lg shadow-xl bg-gray-50 py-5 px-2">
      <AreaChart />
    </div>
    <div
      class="
        rounded-lg
        h-60
        sm:h-[350px]
        md:h-[400px]
        shadow-xl
        bg-gray-50
        py-5
        px-2
      "
    >
      <MapView />
    </div>
  </div>
</template>

<script setup>
import BarChart from "@/components/charts/BarChart";
import AreaChart from "@/components/charts/AreaChart";
import InsightsCard from "@/components/admin/InsightCards.vue";
import MapView from "@/components/maps/MapView.vue";
import { onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
onMounted(() => {
  store.dispatch("statistics/videos_count");
});
</script>

<style>
</style>