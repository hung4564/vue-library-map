<template>
  <div id="app">
    <MapCompare locale="en">
      <CompareSettingControl />
      <ZoomControl position="bottom-right"></ZoomControl>
      <BaseMapControl
        position="bottom-right"
        defaultBaseMap="Dark"
      ></BaseMapControl>
    </MapCompare>
  </div>
</template>

<script>
import { BaseMapControl, ZoomControl } from "@/components/Map";
import { MapCompare, CompareSettingControl } from "@components/MapCompare";
export default {
  name: "App",
  components: {
    MapCompare,
    BaseMapControl,
    CompareSettingControl,
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
