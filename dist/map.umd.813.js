"use strict";
((typeof self !== 'undefined' ? self : this)["webpackChunkmap"] = (typeof self !== 'undefined' ? self : this)["webpackChunkmap"] || []).push([[813],{

/***/ 4519:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ MapControlButton; }
});

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Map/control/MapControlButton.vue?vue&type=template&id=6efba1d6&scoped=true&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _vm.isGroup ? _c('MapButton', _vm._g(_vm._b({
    attrs: {
      "active": _vm.active,
      "elevation": "0",
      "fab": "",
      "height": _vm.groupSize,
      "text": "",
      "title": _vm.tooltip || _vm.title,
      "width": _vm.groupSize
    }
  }, 'MapButton', _vm.$attrs, false), _vm.$listeners), [_vm._t("default", function () {
    return [_c('MapIcon', [_vm._v(" " + _vm._s(_vm.icon) + " ")])];
  })], 2) : _c('div', {
    staticClass: "button-container"
  }, [_c('div', {
    attrs: {
      "title": _vm.tooltip || _vm.title
    }
  }, [_vm._t("default", function () {
    return [_c('MapButton', _vm._g(_vm._b({
      staticClass: "button-elevation",
      attrs: {
        "height": _vm.size,
        "loading": _vm.loading,
        "width": _vm.size
      }
    }, 'MapButton', _vm.$attrs, false), _vm.$listeners), [_vm._t("default", function () {
      return [_c('MapIcon', [_vm._v(" " + _vm._s(_vm.icon) + " ")])];
    })], 2)];
  })], 2)]);
};

var staticRenderFns = [];

// EXTERNAL MODULE: ./src/components/MapButton.vue + 5 modules
var MapButton = __webpack_require__(544);
// EXTERNAL MODULE: ./src/components/MapIcon.vue + 5 modules
var MapIcon = __webpack_require__(3839);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Map/control/MapControlButton.vue?vue&type=script&lang=js&


/* harmony default export */ var MapControlButtonvue_type_script_lang_js_ = ({
  components: {
    MapButton: MapButton/* default */.Z,
    MapIcon: MapIcon/* default */.Z
  },
  props: {
    icon: {
      type: String
    },
    tooltip: String,
    title: String,
    loading: Boolean,
    size: {
      type: Number,
      default: 32
    },
    active: Boolean
  },
  inject: {
    isGroup: {
      default: false
    },
    groupSize: {
      default: 0,
      from: "size"
    }
  },
  computed: {}
});
;// CONCATENATED MODULE: ./src/components/Map/control/MapControlButton.vue?vue&type=script&lang=js&
 /* harmony default export */ var control_MapControlButtonvue_type_script_lang_js_ = (MapControlButtonvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Map/control/MapControlButton.vue?vue&type=style&index=0&id=6efba1d6&prod&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/Map/control/MapControlButton.vue?vue&type=style&index=0&id=6efba1d6&prod&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1001);
;// CONCATENATED MODULE: ./src/components/Map/control/MapControlButton.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  control_MapControlButtonvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "6efba1d6",
  null
  
)

/* harmony default export */ var MapControlButton = (component.exports);

/***/ }),

/***/ 9813:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ FullScreenControl; }
});

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Map/modules/FullScreenControl/FullScreenControl.vue?vue&type=template&id=10c06493&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('ModuleContainer', _vm._b({
    scopedSlots: _vm._u([{
      key: "btn",
      fn: function () {
        return [_c('MapControlButton', {
          attrs: {
            "icon": "mdi-fullscreen",
            "title": !_vm.isFullScreen ? _vm.trans('map.action.fullscreen-control-enter') : _vm.trans('map.action.fullscreen-control-exit')
          },
          on: {
            "click": _vm.onToggleFullScreen
          }
        })];
      },
      proxy: true
    }])
  }, 'ModuleContainer', _vm.bindModule, false), [_vm._t("default")], 2);
};

var staticRenderFns = [];

// EXTERNAL MODULE: ./src/components/Map/mixins/ModuleMixin.js + 6 modules
var ModuleMixin = __webpack_require__(7512);
// EXTERNAL MODULE: ./src/components/Map/control/MapControlButton.vue + 5 modules
var MapControlButton = __webpack_require__(4519);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Map/modules/FullScreenControl/FullScreenControl.vue?vue&type=script&lang=js&


/* harmony default export */ var FullScreenControlvue_type_script_lang_js_ = ({
  components: {
    MapControlButton: MapControlButton/* default */.Z
  },
  props: {
    type: {
      type: String,
      default: "body"
    }
  },
  mixins: [ModuleMixin/* default */.Z],
  data: () => ({
    isFullScreen: false,
    onFullScreenChangeHandle: null
  }),

  created() {
    this.onFullScreenChangeHandle = this.onFullScreenChange.bind(this);

    if (document.addEventListener) {
      document.addEventListener("fullscreenchange", this.onFullScreenChangeHandle, false);
      document.addEventListener("mozfullscreenchange", this.onFullScreenChangeHandle, false);
      document.addEventListener("MSFullscreenChange", this.onFullScreenChangeHandle, false);
      document.addEventListener("webkitfullscreenchange", this.onFullScreenChangeHandle, false);
    }
  },

  beforeDestroy() {
    if (document.removeEventListener) {
      document.removeEventListener("fullscreenchange", this.onFullScreenChangeHandle, false);
      document.removeEventListener("mozfullscreenchange", this.onFullScreenChangeHandle, false);
      document.removeEventListener("MSFullscreenChange", this.onFullScreenChangeHandle, false);
      document.removeEventListener("webkitfullscreenchange", this.onFullScreenChangeHandle, false);
    }
  },

  methods: {
    onFullScreenChange() {
      this.isFullScreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
    },

    onInit() {},

    onToggleFullScreen() {
      if (document.fullscreenElement) {
        this.closeFullscreen();
      } else {
        let elm = this.type == "body" ? document.querySelector("body") : this.getMapContainer();
        this.openFullscreen(elm);
      }

      this.$nextTick(() => {
        this.map.resize();
      });
    },

    getMapContainer(el = this.map.getContainer()) {
      if (el.classList.contains("map-container") || el.tagName === "BODY") {
        return el;
      } else {
        return this.getMapContainer(el.parentElement);
      }
    },

    /* View in fullscreen */
    openFullscreen(elem) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
      }
    },

    /* Close fullscreen */
    closeFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    }

  }
});
;// CONCATENATED MODULE: ./src/components/Map/modules/FullScreenControl/FullScreenControl.vue?vue&type=script&lang=js&
 /* harmony default export */ var FullScreenControl_FullScreenControlvue_type_script_lang_js_ = (FullScreenControlvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1001);
;// CONCATENATED MODULE: ./src/components/Map/modules/FullScreenControl/FullScreenControl.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  FullScreenControl_FullScreenControlvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FullScreenControl = (component.exports);

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
//# sourceMappingURL=map.umd.813.js.map