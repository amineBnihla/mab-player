<template>
  <apexchart
    type="area"
    height="50"
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
        chart: {
          type: "",
          sparkline: {
            enabled: true,
          },
        },
        colors: ["#fff"],
        xaxis: {
          categories: [1991, 1992, 1993, 1994],
        },
        stroke: {
          curve: "straight",
        },

        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.7,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },
      },
      series: [
        {
          name: "series-1",
          data: [0, 0, 0, 10],
        },
      ],
    };
  },
};
</script>

<style>
</style>