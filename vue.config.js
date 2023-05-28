const path = require("path");
function getProdExternals() {
  return {
    "@hungpv4564/vue-library-draggable": "@hungpv4564/vue-library-draggable",
    "@jamescoyle/vue-icon": "@jamescoyle/vue-icon",
    "@turf/bbox": "@turf/bbox",
    axios: "axios",
    "mapbox-gl": "mapbox-gl",
    "@mdi/js": "@mdi/js",
    vue: "vue",
    lodash: "lodash",
    papaparse: "papaparse"
  };
}

module.exports = {
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
