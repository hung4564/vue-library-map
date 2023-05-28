<template>
  <div id="app">
    <Map locale="en">
      <BaseMapControl position="bottom-left" />
      <FileUploadForMap />
      <PrintControl />
      <GeolocateControl />
      <HomeControl />
      <ZoomControl />

      <FullScreenControl />
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
import FileUploadForMap from "./components/FileUploadForMap.vue";
export default {
  name: "App",
  components: {
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
