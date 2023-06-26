<template>
  <div id="app">
    <MapCompare locale="en">
      <CompareSetting />
      <ZoomControl position="bottom-right"></ZoomControl>
      <BaseMapControl
        position="bottom-right"
        defaultBaseMap="Dark"
      ></BaseMapControl>
    </MapCompare>
  </div>
</template>

<script>
import { BaseMapControl, ZoomControl } from "@components/Map";
import { MapCompare, CompareSetting } from "@components/MapCompare";
export default {
  name: "App",
  components: {
    MapCompare,
    BaseMapControl,
    CompareSetting,
    ZoomControl
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
