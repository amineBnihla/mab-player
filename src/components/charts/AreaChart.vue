<template>
  <apexchart type="area" :options="options" :series="series"></apexchart>
</template>

<script>
export default {
  data() {
    return {
      options: {
        colors: ["#DD5DB6", "#8960CB"],
        chart: {
          type: "area",
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Stock Price Movement",
          align: "left",
          margin: 10,
          offsetY: -5,
          style: {
            fontSize: "18px",
            fontWeight: "semibold",
            color: "#1B1C1E",
          },
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
        {
          name: "series-2",
          data: [30, 20, 55, 46, 39, 50, 20, 71],
        },
      ],
    };
  },
};
</script>

<style>
</style>