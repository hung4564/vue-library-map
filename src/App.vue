<template>
  <div id="app">
    <Map
      locale="en"
      @map-loaded="onMapLoaded"
      :mapboxAccessToken="mapboxAccessToken"
    >
      <MeasurementControl position="top-right" />
      <DrawControl position="top-right" />
      <SettingControl position="bottom-right" />
      <LayerControl position="top-left" />
      <CrsControl />
      <PrintControl />
      <GeoLocateControl />
      <HomeControl />
      <ZoomControl />

      <FullScreenControl />
      <BaseMapControl position="bottom-left" />
      <MouseCoordinatesControl />
      <IdentifyControl position="top-right" />
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
  ActionControl,
  MeasurementControl,
  LayerControl,
  IdentifyControl,
  SettingControl,
  CrsControl,
  DrawControl
} from "@map";
import { addLayer } from "./store/store-datasource";
import {
  createGeoJsonLayer,
  createRasterUrlLayer
} from "./model/datasource/sample";
import { LayerMapBuild, LayerSimpleMapboxBuild } from "./model";
import { LayerDrawBuild } from "./model/datasource/extra/draw";
import { LayerEditSourceBuild } from "./model/datasource/extra/edit-source";
export default {
  name: "App",
  components: {
    DrawControl,
    FullScreenControl,
    MouseCoordinatesControl,
    ZoomControl,
    HomeControl,
    GeoLocateControl,
    BaseMapControl,
    Map,
    PrintControl,
    ActionControl,
    MeasurementControl,
    LayerControl,
    IdentifyControl,
    SettingControl,
    CrsControl
  },
  data: () => ({ mapboxAccessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN }),
  methods: {
    async onMapLoaded(map) {
      addLayer(
        map.id,
        createRasterUrlLayer({
          name: "raster 1",
          tiles: [
            "https://naturalearthtiles.roblabs.com/tiles/natural_earth_cross_blended_hypso_shaded_relief.raster/{z}/{x}/{y}.png"
          ],
          bounds: [
            104.96327341667353, 18.461221184685627, 106.65936430823979,
            19.549518287564368
          ]
        })
      );
      addLayer(
        map.id,
        createGeoJsonLayer({
          name: "geojson 1",
          color: "red",
          geojson: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {
                  id: "1",
                  name: "feature 2"
                },
                geometry: {
                  coordinates: [
                    [
                      [104.96327341667353, 19.549518287564368],
                      [104.96327341667353, 18.461221184685627],
                      [106.65936430823979, 18.461221184685627],
                      [106.65936430823979, 19.549518287564368],
                      [104.96327341667353, 19.549518287564368]
                    ]
                  ],
                  type: "Polygon"
                }
              }
            ]
          },
          builds: [
            new LayerMapBuild().setLayers([
              new LayerSimpleMapboxBuild()
                .setStyleType("area")
                .setColor("blue")
                .build(),
              new LayerSimpleMapboxBuild()
                .setStyleType("point")
                .setColor("red")
                .build()
            ]),
            new LayerEditSourceBuild(),
            new LayerDrawBuild()
          ]
        })
      );
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
