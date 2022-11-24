"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkmap"] = (typeof self !== 'undefined' ? self : this)["webpackChunkmap"] || []).push([[858],{

/***/ 858:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ MouseCoordinatesControl; }
});

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Map/modules/MouseCoordinatesControl/MouseCoordinatesControl.vue?vue&type=template&id=ff59bd4a&scoped=true&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('ModuleContainer', _vm._b({
    scopedSlots: _vm._u([{
      key: "btn",
      fn: function () {
        return [_c('div', {
          staticClass: "button-container d-flex mapboxgl-ctrl-mouse-coordinates-container"
        }, [_c('div', {
          staticClass: "mapboxgl-ctrl-mouse-coordinates"
        }, [_c('div', {
          staticClass: "mapboxgl-ctrl-mouse-coordinates-zoom flex-grow-0 d-flex pr-2"
        }, [_c('i', {
          class: [_vm.zoomIcon],
          attrs: {
            "title": "Current Zoom"
          }
        }), _c('div', {
          staticStyle: {
            "margin-left": "4px"
          }
        }, [_vm._v(_vm._s(_vm.currentZoom))])]), _c('div', {
          staticClass: "mapboxgl-ctrl-mouse-coordinates-point"
        }, [_c('i', {
          staticClass: "icon-clickable",
          class: _vm.icon,
          attrs: {
            "title": "Add Marker"
          },
          on: {
            "click": _vm.onAddMarker
          }
        }), _c('div', {
          staticClass: "selectable",
          staticStyle: {
            "margin-left": "4px"
          },
          style: {
            'min-width': _vm.isDMS ? '210px' : '100px'
          },
          domProps: {
            "innerHTML": _vm._s(_vm.currentPoint)
          }
        }), _c('i', {
          staticClass: "icon-clickable mdi mdi-cached",
          staticStyle: {
            "margin-left": "4px"
          },
          attrs: {
            "title": _vm.isDMS ? 'DMS <=> Latitude, Longitude' : 'Latitude, Longitude <=> DMS'
          },
          on: {
            "click": _vm.changeDisplayTypePixelValue
          }
        })])]), _c('div', {
          ref: "scale",
          staticClass: "mapboxgl-ctrl-scale-custom"
        })])];
      },
      proxy: true
    }])
  }, 'ModuleContainer', _vm.bindModule, false));
};

var staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/mapbox-gl/dist/mapbox-gl.js
var mapbox_gl = __webpack_require__(9752);
var mapbox_gl_default = /*#__PURE__*/__webpack_require__.n(mapbox_gl);
// EXTERNAL MODULE: ./src/components/Map/mixins/ModuleMixin.js + 6 modules
var ModuleMixin = __webpack_require__(7512);
// EXTERNAL MODULE: ./node_modules/proj4/lib/index.js + 90 modules
var lib = __webpack_require__(6647);
;// CONCATENATED MODULE: ./src/utils/CRS.js

const CRS = {};
Object.keys(CRS).forEach(name => {
  lib/* default.defs */.Z.defs(name, CRS[name]);
});
function deg_to_dms(deg) {
  var d = Math.floor(deg);
  var minfloat = (deg - d) * 60;
  var m = Math.floor(minfloat);
  var secfloat = (minfloat - m) * 60;
  var s = Math.round(secfloat); // After rounding, the seconds might become 60. These two
  // if-tests are not necessary if no rounding is done.

  if (s == 60) {
    m++;
    s = 0;
  }

  if (m == 60) {
    d++;
    m = 0;
  }

  return {
    deg: d,
    min: m,
    sec: s
  };
}
function dms_to_des({
  deg,
  min,
  sec
} = {}) {
  let result = (Number(deg) + Number(min) / 60 + Number(sec) / 3600).toFixed(6);
  return result;
}
function deg_to_dms_string(str) {
  let {
    deg,
    min,
    sec
  } = deg_to_dms(str);
  return deg + "° " + (min + "").padStart(2, "0") + "′ " + (sec + "").padStart(2, "0") + "″";
}
const latDMS = lat => {
  return `${dcToDeg(lat)}° ${dcToMin(lat)}' ${parseFloat(dcToSec(lat).toFixed(3))}" ${lat > 0 ? "N" : "S"}`;
};
const lngDMS = lng => {
  return `${dcToDeg(lng)}° ${dcToMin(lng)}' ${parseFloat(dcToSec(lng).toFixed(3))}" ${lng > 0 ? "E" : "W"}`;
};

const dcToDeg = val => {
  if (val === 0) {
    return 0;
  }

  return Math.floor(Math.abs(val));
};

const dcToMin = val => {
  if (val === 0) {
    return 0;
  }

  return Math.floor((Math.abs(val) - Math.floor(Math.abs(val))) * 60);
};

const dcToSec = val => {
  if (val === 0) {
    return 0;
  }

  return (Math.abs(val) - dcToDeg(val) - dcToMin(val) / 60) * 3600;
};
// EXTERNAL MODULE: ./src/utils/index.js + 2 modules
var utils = __webpack_require__(3823);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Map/modules/MouseCoordinatesControl/MouseCoordinatesControl.vue?vue&type=script&lang=js&




const defaultOptions = {
  unit: "metric"
};
/* harmony default export */ var MouseCoordinatesControlvue_type_script_lang_js_ = ({
  mixins: [ModuleMixin/* default */.Z],
  props: {
    icon: {
      type: String,
      default: "mdi mdi-map-marker-outline"
    },
    zoomIcon: {
      type: String,
      default: "mdi mdi-magnify"
    }
  },

  data() {
    return {
      lngLat: {
        latitude: 0,
        longitude: 0
      },
      currentZoom: 0,
      currentPoint: undefined,
      isDMS: true
    };
  },

  methods: {
    changeDisplayTypePixelValue() {
      this.isDMS = !this.isDMS;
      this.changePixelValue();
    },

    changePixelValue() {
      if (this.isDMS) this.currentPoint = latDMS(+this.lngLat.latitude.toFixed(4)) + ", &nbsp;" + lngDMS(+this.lngLat.longitude.toFixed(4));else this.currentPoint = this.lngLat.latitude.toFixed(4) + ",&nbsp;&nbsp;" + this.lngLat.longitude.toFixed(4);
    },

    onInit() {
      this.bindedOnMouseMove = this.onMouseMove.bind(this);
      this.bindedOnZoomEnd = this.onZoomEnd.bind(this);
      this.bindedOnMapMove = this.onMapMove.bind(this);
      this.map.on("move", this.bindedOnMapMove);
      this.map.on("mousemove", this.bindedOnMouseMove);
      this.map.on("zoomend", this.bindedOnZoomEnd);
      this.options = Object.assign({}, defaultOptions);
      this.currentZoom = this.map.getZoom().toFixed(2);
      let center = this.map.getCenter();
      this.lngLat.latitude = center.lat;
      this.lngLat.longitude = center.lng;
      this.changePixelValue();
      this.$nextTick(() => {
        updateScale(this.map, this.$refs.scale, this.options);
      });
    },

    onDestroy() {
      this.map.off("zoomend", this.bindedOnZoomEnd);
      this.map.off("mousemove", this.bindedOnMouseMove);
      this.map.off("move", this.bindedOnMapMove);
    },

    onMapMove() {
      updateScale(this.map, this.$refs.scale, this.options);
    },

    onMouseMove: (0,utils/* debounce */.Ds)(function (e) {
      // this.lngLat.latitude = e.lngLat.lat.toFixed(4)
      // this.lngLat.longitude = e.lngLat.lng.toFixed(4)
      let point = [e.lngLat.lng, e.lngLat.lat];
      this.lngLat.latitude = point[1];
      this.lngLat.longitude = point[0];
      this.changePixelValue();
    }, 15),

    onZoomEnd() {
      this.currentZoom = this.map.getZoom().toFixed(2);
    },

    addMarker(lngLat) {
      const text = window.document.createElement("div");
      text.className = "selectable";
      text.innerText = `${deg_to_dms_string(lngLat.lng.toFixed(8))}, ${deg_to_dms_string(lngLat.lat.toFixed(8))}`;
      const removeMarkerButton = window.document.createElement("i");
      removeMarkerButton.className = "mdi mdi-delete";
      removeMarkerButton.title = "Remove Marker";
      removeMarkerButton.style.marginLeft = "4px";
      removeMarkerButton.style.cursor = "pointer";
      removeMarkerButton.style.fontSize = "14px";
      removeMarkerButton.style.width = "14px";
      removeMarkerButton.style.height = "14px";
      removeMarkerButton.style.lineHeight = "14px";
      removeMarkerButton.addEventListener("click", () => {
        this.removeMarker();
      });
      const container = window.document.createElement("div");
      container.style.display = "flex";
      container.style.alignItems = "center";
      container.append(text, removeMarkerButton);
      const popup = new (mapbox_gl_default()).Popup({
        closeButton: false
      }).setDOMContent(container);
      this.marker = new (mapbox_gl_default()).Marker().setLngLat(lngLat).setPopup(popup).addTo(this.map);
      this.marker.getElement().style.cursor = "pointer";
      this.marker.togglePopup();
    },

    removeMarker() {
      if (!this.marker) return;
      this.marker.remove();
    },

    onMapClick(e) {
      this.addMarker(e.lngLat);
      this.changeCursor("");
    },

    changeCursor(cursor) {
      this.map.getCanvas().style.cursor = cursor;
    },

    onAddMarker() {
      this.removeMarker();
      this.changeCursor("crosshair");
      this.map.once("click", this.onMapClick.bind(this));
    }

  }
});

function updateScale(map, container, options) {
  // A horizontal scale is imagined to be present at center of the map
  // container with maximum length (Default) as 100px.
  // Using spherical law of cosines approximation, the real distance is
  // found between the two coordinates.
  const maxWidth = options && options.maxWidth || 100;
  const y = map._container.clientHeight / 2;
  const left = map.unproject([0, y]);
  const right = map.unproject([maxWidth, y]);
  const maxMeters = left.distanceTo(right); // The real distance corresponding to 100px scale length is rounded off to
  // near pretty number and the scale length for the same is found out.
  // Default unit of the scale is based on User's locale.

  if (options && options.unit === "imperial") {
    const maxFeet = 3.2808 * maxMeters;

    if (maxFeet > 5280) {
      const maxMiles = maxFeet / 5280;
      setScale(container, maxMiles, map._getUIString("ScaleControl.Miles"));
    } else {
      setScale(container, maxFeet, map._getUIString("ScaleControl.Feet"));
    }
  } else if (options && options.unit === "nautical") {
    const maxNauticals = maxMeters / 1852;
    setScale(container, maxNauticals, map._getUIString("ScaleControl.NauticalMiles"));
  } else if (maxMeters >= 1000) {
    setScale(container, maxMeters / 1000, map._getUIString("ScaleControl.Kilometers"));
  } else {
    setScale(container, maxMeters, map._getUIString("ScaleControl.Meters"));
  }
}

function setScale(container, maxDistance, unit) {
  const distance = getRoundNum(maxDistance);
  if (container) container.innerHTML = `${distance}&nbsp;${unit}`;
}

function getDecimalRoundNum(d) {
  const multiplier = Math.pow(10, Math.ceil(-Math.log(d) / Math.LN10));
  return Math.round(d * multiplier) / multiplier;
}

function getRoundNum(num) {
  const pow10 = Math.pow(10, `${Math.floor(num)}`.length - 1);
  let d = num / pow10;
  d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : d >= 1 ? 1 : getDecimalRoundNum(d);
  return pow10 * d;
}
;// CONCATENATED MODULE: ./src/components/Map/modules/MouseCoordinatesControl/MouseCoordinatesControl.vue?vue&type=script&lang=js&
 /* harmony default export */ var MouseCoordinatesControl_MouseCoordinatesControlvue_type_script_lang_js_ = (MouseCoordinatesControlvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Map/modules/MouseCoordinatesControl/MouseCoordinatesControl.vue?vue&type=style&index=0&id=ff59bd4a&prod&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/Map/modules/MouseCoordinatesControl/MouseCoordinatesControl.vue?vue&type=style&index=0&id=ff59bd4a&prod&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1001);
;// CONCATENATED MODULE: ./src/components/Map/modules/MouseCoordinatesControl/MouseCoordinatesControl.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  MouseCoordinatesControl_MouseCoordinatesControlvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "ff59bd4a",
  null
  
)

/* harmony default export */ var MouseCoordinatesControl = (component.exports);

/***/ }),

/***/ 7512:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ ModuleMixin; }
});

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(6699);
// EXTERNAL MODULE: ./src/components/Map/store/store-event.js
var store_event = __webpack_require__(52);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Map/ModuleContainer.vue?vue&type=template&id=beabf37e&scoped=true&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    staticClass: "module__container"
  }, [_vm.controlVisible && _vm.$slots['btn'] ? _c('portal', {
    attrs: {
      "order": _vm.order,
      "to": _vm.btnTo
    }
  }, [_c('div', [_vm._t("btn")], 2)]) : _vm._e(), _vm._t("default"), _c('portal', {
    attrs: {
      "to": _vm.draggableTo
    }
  }, [_vm._t("draggable", null, null, _vm.bindDrag)], 2)], 2);
};

var staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/portal-vue/dist/portal-vue.common.js
var portal_vue_common = __webpack_require__(9248);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Map/ModuleContainer.vue?vue&type=script&lang=js&


/* harmony default export */ var ModuleContainervue_type_script_lang_js_ = ({
  components: {
    Portal: portal_vue_common/* Portal */.h_
  },
  props: {
    prefix: {
      type: String,
      default: "mapbox"
    },
    btnWidth: {
      type: Number,
      default: 32
    },
    position: {
      type: String,
      default: "bottom-right",

      validator(value) {
        return ["top-left", "top-right", "bottom-left", "bottom-right"].indexOf(value) !== -1;
      }

    },
    controlVisible: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
    }
  },
  computed: {
    btnTo() {
      return `${this.position}-${this.prefix}`;
    },

    draggableTo() {
      return `map-draggable-${this.prefix}`;
    },

    bindDrag() {
      let bind = {};

      if (this.position.includes("left")) {
        bind.left = 18 + this.btnWidth;
      }

      if (this.position.includes("right")) {
        bind.right = 18 + this.btnWidth;
      }

      if (this.position.includes("top")) {
        bind.top = 10;
      }

      if (this.position.includes("bottom")) {
        bind.bottom = 10;
      }

      return bind;
    }

  }
});
;// CONCATENATED MODULE: ./src/components/Map/ModuleContainer.vue?vue&type=script&lang=js&
 /* harmony default export */ var Map_ModuleContainervue_type_script_lang_js_ = (ModuleContainervue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Map/ModuleContainer.vue?vue&type=style&index=0&id=beabf37e&prod&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/Map/ModuleContainer.vue?vue&type=style&index=0&id=beabf37e&prod&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1001);
;// CONCATENATED MODULE: ./src/components/Map/ModuleContainer.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  Map_ModuleContainervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "beabf37e",
  null
  
)

/* harmony default export */ var ModuleContainer = (component.exports);
;// CONCATENATED MODULE: ./src/components/Map/mixins/ModuleMixin.js



/* harmony default export */ var ModuleMixin = ({
  components: {
    ModuleContainer: ModuleContainer
  },
  props: {
    position: {
      type: String,
      default: "bottom-right",

      validator(value) {
        return ["top-left", "top-right", "bottom-left", "bottom-right"].indexOf(value) !== -1;
      }

    },
    controlVisible: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      loaded: false
    };
  },

  watch: {},
  inject: ["getMap", "mapId", "trans"],
  computed: {
    isLeft() {
      return this.position.includes("left");
    },

    isRight() {
      return this.position.includes("right");
    },

    isTop() {
      return this.position.includes("top");
    },

    isBottom() {
      return this.position.includes("bottom");
    },

    bindModule() {
      return {
        controlVisible: this.controlVisible,
        order: this.order,
        position: this.position,
        prefix: this.mapId
      };
    }

  },

  mounted() {
    this.$once("module-loaded", () => {
      this.loaded = true;
    });
    this.$on("module-failed", () => {
      this.loaded = false;
    });
    this.getMap(async map => {
      this.map = map; // Revoke event

      if (this.onInit instanceof Function) {
        const command = this.onInit();

        if (command instanceof Promise) {
          try {
            await command;
          } catch (error) {
            this.$emit("module-failed");
            throw error;
          }
        }
      }

      this.$emit("module-loaded");
    });
  },

  destroyed() {
    if (this.onDestroy instanceof Function) {
      try {
        this.onDestroy();
      } catch (e) {
        console.error(e);
      }
    }

    this.map = null;
  },

  methods: {
    removeListenerMap(event, eventId) {
      (0,store_event/* removeListenerMap */.sq)(this.mapId, event, eventId);
    },

    addListenerMap(event, eventId, cb) {
      (0,store_event/* addListenerMap */.bb)(this.mapId, event, eventId, cb);
    },

    actionAfterMapLoaded(cb) {
      if (!this.map) {
        return this.$once("module-loaded", () => {
          cb();
        });
      }

      cb();
    },

    removeSource(sourceId) {
      if (this.map.getSource(sourceId)) {
        this.map.removeSource(sourceId);
      }
    },

    addLayer(layer, beforeId) {
      if (!this.map) {
        return this.$once("module-loaded", () => {
          this.addLayer(layer, beforeId);
        });
      }

      this.map.addLayer(layer, beforeId);
    },

    removeLayer(layerId) {
      if (!this.map) return;

      if (this.map.getLayer(layerId)) {
        this.map.removeLayer(layerId);
      }

      if (this.map.getSource(layerId)) {
        this.map.removeSource(layerId);
      }
    }

  }
});

/***/ })

}]);
//# sourceMappingURL=map.umd.858.js.map