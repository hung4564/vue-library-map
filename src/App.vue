<template>
  <div id="app">
    <Map locale="vi">
      <MeasurementControl position="top-right" />
      <BaseMapControl position="bottom-left" />
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
  MeasurementControl,
  Map
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
    MeasurementControl,
    Map
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
