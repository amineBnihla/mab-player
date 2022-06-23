<template>
  <apexchart
    height="60"
    width="60"
    :options="options"
    :series="series"
  ></apexchart>
</template>

<script>
export default {
  data() {
    return {
      series: [44, 55, 41],
      options: {
        colors: ["#fff", "#e3e3e3", "#f0f0f0"],
        chart: {
          type: "polarArea",
          sparkline: {
            enabled: true,
          },
        },
        stroke: {
          enabled: false,
        },
        yaxis: {
          show: false,
        },
        plotOptions: {
          polarArea: {
            rings: {
              strokeWidth: 0,
            },
            spokes: {
              strokeWidth: 0,
            },
          },
        },
        tooltip: {
          enabled: false,
        },
        fill: {
          opacity: 1,
        },
        dataLabels: {
          enabled: false,
        },
      },
    };
  },
};
</script>

<style>
.k {
  color: #e3e3e3;
}
</style>