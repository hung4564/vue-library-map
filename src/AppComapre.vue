<template>
  <div id="app">
    <MapCompare locale="en">
      <template #map-before>
        <BaseMapControl position="bottom-left"></BaseMapControl>
      </template>
      <template #map-after>
        <BaseMapControl
          position="bottom-right"
          defaultBaseMap="Dark"
        ></BaseMapControl>
      </template>
      <FileUploadForMap position="bottom-right" />
      <LayerControl position="top-left" />
    </MapCompare>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import {
  FullScreenControl,
  MouseCoordinatesControl,
  ZoomControl,
  HomeControl,
  GeolocateControl,
  BaseMapControl,
  Map,
  PrintControl,
  MapCompare
} from "@components/Map";
import LayerControl from "./components/LayerControl/LayerControl.vue";
import FileUploadForMap from "./components/FileUploadForMap.vue";
export default {
  name: "App",
  components: {
    MapCompare,
    LayerControl,
    FileUploadForMap,
    BaseMapControl
  }
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
}

body,
html,
#app {
  height: 100%;
}
</style>
