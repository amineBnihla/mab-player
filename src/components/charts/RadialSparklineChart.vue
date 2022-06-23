<template>
  <apexchart
    type="radialBar"
    height="60"
    width="60"
    :options="optionsRadial"
    :series="seriesRadial"
  ></apexchart>
</template>

<script>
export default {
  data() {
    return {
      optionsRadial: {
        colors: ["#fff"],
        chart: {
          type: "radialBar",

          sparkline: {
            enabled: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: "50%",
            },
            track: {
              margin: 1,
            },
            dataLabels: {
              show: false,
            },
          },
        },
      },
      seriesRadial: [30],
    };
  },
};
</script>

<style>
</style>