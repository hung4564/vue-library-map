<template>
  <div id="app">
    <Map locale="en" @map-loaded="onMapLoad">
      <PrintControl />
      <GeoLocateControl />
      <HomeControl />
      <ZoomControl />

      <FullScreenControl />
      <BaseMapControl position="bottom-left"></BaseMapControl>
      <MouseCoordinatesControl />
      <ActionControl />
    </Map>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import "mapbox-gl/dist/mapbox-gl.css";
import {
  FullScreenControl,
  MouseCoordinatesControl,
  ZoomControl,
  HomeControl,
  GeoLocateControl,
  BaseMapControl,
  Map,
  PrintControl,
  ActionControl
} from "@components/Map";
import { setEventMap } from "./components/Map/hooks/useEvent";
import { EventClick } from "./model/event";
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
    PrintControl,
    ActionControl
  },
  methods: {
    onMapLoad(map) {
      const {
        add: addEventClick,
        remove: removeEventClick,
        isActive: isEventClickActive
      } = setEventMap(
        map,
        new EventClick().setHandler((e) => {
          console.log("🚀 ~ newEventClick ~ e", e);
        })
      );
      this.$nextTick(() => {
        addEventClick();
      });
    }
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
