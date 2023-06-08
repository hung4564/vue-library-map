const path = require("path");
function getProdExternals() {
  return {
    "@hungpv97/vue-library-draggable": "@hungpv97/vue-library-draggable",
    "@jamescoyle/vue-icon": "@jamescoyle/vue-icon",
    "@turf/bbox": "@turf/bbox",
    axios: "axios",
    "mapbox-gl": "mapbox-gl",
    "@mdi/js": "@mdi/js",
    vue: "vue",
    lodash: "lodash",
    papaparse: "papaparse",
    mitt: "mitt"
  };
}

module.exports = {
  publicPath:
    process.env.NODE_ENV === "webproduction"
      ? "/vue-library-map/" // Thay tên repository của các bạn vào đây nhé
      : "/",
  productionSourceMap: process.env.NODE_ENV !== "production",
  transpileDependencies: true,
  configureWebpack: {
    devtool: "eval-source-map",
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
