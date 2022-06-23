<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world-merc";
import "jsvectormap/dist/css/jsvectormap.min.css";

let map = ref({});
onMounted(() => {
  map.value = new jsVectorMap({
    markers: [
      { name: "Egypt", coords: [26.8206, 30.8025] }, // Egypt coordinates
      { name: "Canada", coords: [56.1304, 106.3468] }, // Canada coordinates
      {
        // US coordinates
        name: "United States",
        coords: [37.0902, 95.7129], // Add style for this particular marker
      },
    ],
    selector: "#map",
    map: "world_merc",
    zoomButtons: true,
    normalizeFunction: "polynomial",
    hoverOpacity: 0.5,
    hoverColor: false,
    zoomOnScroll: false,
    series: {
      regions: [
        {
          normalizeFunction: "polynomial",
        },
      ],
    },
    labels: {
      markers: {
        render: (marker) => marker.name,
      },
    },
    focusOn: {
      x: 0.5,
      y: 0.5,
      scale: 1,
    },
    onLoaded(map) {
      window.addEventListener("resize", () => {
        map.updateSize();
      });
    },
    markerStyle: {
      initial: {
        fill: "hsl(318, 65%, 62%)",
        stroke: "none",
        r: 5,
      },
      hover: {
        fill: "hsl(318, 65%, 62%)",
      },
    },
    markerLabelStyle: {
      initial: {
        fontSize: "14px",
        fill: "hsl(318, 65%, 62%)",
      },
    },
    regionStyle: {
      initial: {
        fill: "#777",
        fillOpacity: 0.35,
        stroke: "#fff",
        strokeWidth: 0.5,
        strokeOpacity: 1,
      },
      hover: {
        fillOpacity: 0.5,
      },
    },
    backgroundColor: "transparent",
  });
});
</script>

<style scoped>
#map {
  width: 100%;
}
</style>