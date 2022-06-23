<template>
  <apexchart
    type="bar"
    height="30"
    width="80"
    :options="options"
    :series="series"
  ></apexchart>
</template>

<script>
export default {
  data() {
    return {
      options: {
        colors: ["#fff"],
        chart: {
          sparkline: {
            enabled: true,
          },
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996],
        },
      },
      series: [
        {
          name: "sales",
          data: [30, 40, 45, 50, 40, 60],
        },
      ],
    };
  },
};
</script>

<style>
</style>