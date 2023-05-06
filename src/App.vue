<template>
  <div id="app">
    <Map locale="en">
      <BaseMapControl position="bottom-left" :order="1" />
      <PrintControl :order="6" />
      <GeolocateControl :order="5" />
      <HomeControl :order="4" />
      <ZoomControl :order="3" />

      <FullScreenControl :order="2" />
      <MouseCoordinatesControl :order="1" />
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
