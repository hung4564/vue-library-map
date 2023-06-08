<template>
  <div id="app">
    <Map locale="en">
      <FileUploadForMap position="bottom-right" />
      <LayerControl position="top-left" />
      <PrintControl />
      <GeolocateControl />
      <HomeControl />
      <ZoomControl />

      <FullScreenControl />
      <BaseMapControl position="bottom-right"></BaseMapControl>
      <MouseCoordinatesControl />
    </Map>
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
  PrintControl
} from "@components/Map";
import LayerControl from "./components/LayerControl/LayerControl.vue";
import FileUploadForMap from "./components/FileUploadForMap.vue";
export default {
  name: "App",
  components: {
    // MapCompare,
    LayerControl,
    FullScreenControl,
    MouseCoordinatesControl,
    ZoomControl,
    HomeControl,
    GeolocateControl,
    BaseMapControl,
    Map,
    PrintControl,
    FileUploadForMap
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
