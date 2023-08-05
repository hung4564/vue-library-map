const path = require("path");
function getProdExternals() {
  return {
    "@hungpv97/vue-library-draggable": "@hungpv97/vue-library-draggable",
    "@hungpv97/vue-map-store": "@hungpv97/vue-map-store",
    "@jamescoyle/vue-icon": "@jamescoyle/vue-icon",
    "@linusborg/vue-simple-portal": "@linusborg/vue-simple-portal",
    "@mapbox/mapbox-gl-sync-move": "@mapbox/mapbox-gl-sync-move",
    "geojson-validation": "geojson-validation",
    "file-saver": "file-saver",
    "core-js": "core-js",
    "@turf/bbox": "@turf/bbox",
    axios: "axios",
    proj4: "proj4",
    "mapbox-gl": "mapbox-gl",
    "@mdi/js": "@mdi/js",
    vue: "vue",
    lodash: "lodash"
  };
}

module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
      analyzerMode: process.env.NODE_ENV.includes("production")
        ? "disabled"
        : "server"
    }
  },
  publicPath:
    process.env.NODE_ENV === "webproduction" ? "/vue-library-map/" : "/",
  productionSourceMap: process.env.NODE_ENV !== "production",
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@components": path.join(__dirname, "src/components/"),
        "@constant": path.join(__dirname, "src/constant/"),
        "@utils": path.join(__dirname, "src/utils/"),
        "@app.config": path.join(__dirname, "src/app.config.json")
      }
    },
    externals: process.env.NODE_ENV === "production" ? getProdExternals() : {}
  }
};
