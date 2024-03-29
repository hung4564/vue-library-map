const path = require("path");
function getProdExternals() {
  return {
    "@hungpv97/vue-library-draggable": "@hungpv97/vue-library-draggable",
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
    lodash: "lodash",
    "lodash.merge": "lodash.merge",
    "v-click-outside": "v-click-outside",
    vuedraggable: "vuedraggable",
    mitt: "mitt",
    "@turf/turf": "@turf/turf",
    codemirror: "codemirror",
    "vue-codemirror": "vue-codemirror"
  };
}

module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
      analyzerMode: process.env.NODE_ENV.includes("production")
        ? "disabled"
        : "json"
    }
  },
  chainWebpack: (config) => {
    // These are some necessary steps changing the default webpack config of the Vue CLI
    // that need to be changed in order for Typescript based components to generate their
    // declaration (.d.ts) files.
    //
    // Discussed here https://github.com/vuejs/vue-cli/issues/1081
    if (process.env.NODE_ENV === "production") {
      config.module.rule("ts").uses.delete("cache-loader");

      config.module
        .rule("ts")
        .use("ts-loader")
        .loader("ts-loader")
        .tap((opts) => {
          opts.transpileOnly = false;
          opts.happyPackMode = false;
          return opts;
        });
    }
  },
  parallel: false,
  publicPath:
    process.env.NODE_ENV === "webproduction" ? "/vue-library-map/" : "/",
  productionSourceMap: true,
  transpileDependencies: true,
  configureWebpack: {
    devtool: "source-map",
    resolve: {
      alias: {
        "@components": path.join(__dirname, "src/components/"),
        "@map": path.join(__dirname, "src/components/Map"),
        "@constant": path.join(__dirname, "src/constant/"),
        "@utils": path.join(__dirname, "src/utils/"),
        "@app.config": path.join(__dirname, "src/app.config.json")
      }
    },
    externals: process.env.NODE_ENV === "production" ? getProdExternals() : {}
  }
};
