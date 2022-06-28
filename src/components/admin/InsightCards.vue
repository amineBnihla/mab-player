<template>
  <div
    class="
      insights
      grid grid-cols-1
      md:grid-cols-2
      lg:grid-cols-4
      gap-5
      col-span-1
      lg:col-span-2
    "
  >
    <div
      v-for="(insight, index) in insights"
      :key="index"
      class="
        card
        py-2
        px-4
        flex
        items-center
        justify-between
        gap-5
        rounded-lg
        bg-secondary
      "
    >
      <div class="card__title text-custom_white">
        <h3 class="mb-4 font-semibold text-2xl">{{ insight.title }}</h3>
        <span class="text-lg">{{ insight.number }}</span>
      </div>
      <div class="card__chart">
        <component :is="insight.component" />
      </div>
    </div>
  </div>
</template>

<script setup>
import AreaSparklineChart from "@/components/charts/AreaSparklineChart.vue";
import RadialSparklineChart from "@/components/charts/RadialSparklineChart.vue";
import BarSparklineChart from "@/components/charts/BarSparklineChart.vue";
import DonutSparklineChart from "@/components/charts/DonutSparklineChart.vue";
import { reactive } from "vue";
import { useStore } from "vuex";
const store = useStore();

const insights = reactive([
  {
    title: "Playlist",
    number: store.state.statistics.playlist_count,
    component: AreaSparklineChart,
  },
  {
    title: "Views",
    number: 140,
    component: RadialSparklineChart,
  },
  {
    title: "Sales",
    number: 160,
    component: BarSparklineChart,
  },
  {
    title: "Countries",
    number: 160,
    component: DonutSparklineChart,
  },
]);
</script>


<style>
</style>