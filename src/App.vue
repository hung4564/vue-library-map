<template>
  <div id="app">
    <Map locale="en">
      <PrintControl />
      <GeoLocateControl />
      <HomeControl />
      <ZoomControl />

      <FullScreenControl />
      <BaseMapControl position="bottom-left"></BaseMapControl>
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
  GeoLocateControl,
  BaseMapControl,
  Map,
  PrintControl
} from "@components/Map";
export default {
  name: "App",
  components: {
    FullScreenControl,
    MouseCoordinatesControl,
    ZoomControl,
    HomeControl,
    GeoLocateControl,
    BaseMapControl,
    Map,
    PrintControl
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
