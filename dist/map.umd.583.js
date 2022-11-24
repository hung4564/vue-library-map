((typeof self !== 'undefined' ? self : this)["webpackChunkmap"] = (typeof self !== 'undefined' ? self : this)["webpackChunkmap"] || []).push([[583],{

/***/ 4519:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

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

/***/ 3246:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ MapControlGroupButton; }
});

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Map/control/MapControlGroupButton.vue?vue&type=template&id=7f7a17c4&scoped=true&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    staticClass: "button-container button-group-container",
    class: {
      'button-group-row-container': _vm.row,
      'button-group-column-container': !_vm.row
    },
    style: {
      width: !_vm.row ? _vm.size + 'px' : null,
      height: _vm.row ? _vm.size + 'px' : null
    }
  }, [_c('div', {
    staticClass: "button-group-sheet button-elevation",
    class: {
      'button-group-sheet-column': !_vm.row
    },
    staticStyle: {
      "border-radius": "150px"
    }
  }, [_vm._l(_vm.items, function (item, i) {
    return _c('MapButton', {
      key: i + '' + item.titl,
      attrs: {
        "height": _vm.size,
        "text": "",
        "title": item.title,
        "width": _vm.size
      },
      on: {
        "click": item.onClick
      }
    }, [_c('MapIcon', [_vm._v(" " + _vm._s(item.icon) + " ")])], 1);
  }), _vm._t("default")], 2)]);
};

var staticRenderFns = [];

// EXTERNAL MODULE: ./src/components/MapButton.vue + 5 modules
var MapButton = __webpack_require__(544);
// EXTERNAL MODULE: ./src/components/MapIcon.vue + 5 modules
var MapIcon = __webpack_require__(3839);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Map/control/MapControlGroupButton.vue?vue&type=script&lang=js&


/* harmony default export */ var MapControlGroupButtonvue_type_script_lang_js_ = ({
  components: {
    MapButton: MapButton/* default */.Z,
    MapIcon: MapIcon/* default */.Z
  },
  props: {
    // {title:string,icon:string,onClick:(e)=>{}}
    items: {
      type: Array,
      default: () => []
    },
    row: Boolean,
    size: {
      type: Number,
      default: 32
    }
  },

  provide() {
    return {
      isGroup: true,
      size: this.size
    };
  }

});
;// CONCATENATED MODULE: ./src/components/Map/control/MapControlGroupButton.vue?vue&type=script&lang=js&
 /* harmony default export */ var control_MapControlGroupButtonvue_type_script_lang_js_ = (MapControlGroupButtonvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Map/control/MapControlGroupButton.vue?vue&type=style&index=0&id=7f7a17c4&prod&scoped=true&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/Map/control/MapControlGroupButton.vue?vue&type=style&index=0&id=7f7a17c4&prod&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1001);
;// CONCATENATED MODULE: ./src/components/Map/control/MapControlGroupButton.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  control_MapControlGroupButtonvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "7f7a17c4",
  null
  
)

/* harmony default export */ var MapControlGroupButton = (component.exports);

/***/ }),

/***/ 583:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ PrintControl; }
});

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Map/modules/PrintControl/PrintControl.vue?vue&type=template&id=7ff13949&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('ModuleContainer', _vm._b({
    scopedSlots: _vm._u([{
      key: "btn",
      fn: function () {
        return [!_vm.print.show ? _c('MapControlButton', {
          attrs: {
            "active": _vm.print.show,
            "icon": "mdi-printer-outline",
            "tooltip": "In ấn"
          },
          on: {
            "click": function ($event) {
              return _vm.onSaveAll();
            }
          }
        }) : [_c('MapControlGroupButton', {
          attrs: {
            "row": ""
          }
        }, [_c('MapControlButton', {
          attrs: {
            "icon": "mdi-content-save-outline",
            "loading": _vm.print.loading,
            "tooltip": _vm.trans('actions.save')
          },
          on: {
            "click": function ($event) {
              return _vm.onSave();
            }
          }
        }), _c('MapControlButton', {
          attrs: {
            "disabled": _vm.print.loading,
            "icon": "mdi-close",
            "tooltip": _vm.trans('actions.clear')
          },
          on: {
            "click": function ($event) {
              return _vm.onClosePrint();
            }
          }
        })], 1)]];
      },
      proxy: true
    }])
  }, 'ModuleContainer', _vm.bindModule, false), [_vm._t("default")], 2);
};

var staticRenderFns = [];

// EXTERNAL MODULE: ./src/components/Map/control/MapControlButton.vue + 5 modules
var MapControlButton = __webpack_require__(4519);
// EXTERNAL MODULE: ./src/components/Map/control/MapControlGroupButton.vue + 5 modules
var MapControlGroupButton = __webpack_require__(3246);
// EXTERNAL MODULE: ./src/components/Map/mixins/ModuleMixin.js + 6 modules
var ModuleMixin = __webpack_require__(7512);
// EXTERNAL MODULE: ./node_modules/file-saver/dist/FileSaver.min.js
var FileSaver_min = __webpack_require__(4014);
;// CONCATENATED MODULE: ./src/components/Map/modules/PrintControl/print/CrosshairManager.js
class CrosshairManager {
  constructor(canvas) {
    this.mapCanvas = canvas;
    this.color = "#535353";
  }

  create() {
    this.updateValues();
    this.createCanvas(this.mapCanvas.parentElement);
  }

  updateValues() {
    this.width = this.mapCanvas.clientWidth;
    this.height = this.mapCanvas.clientHeight;
  }

  mapResize() {
    this.updateValues();
    this.updateCanvas();
  }

  updateCanvas() {
    if (this.svgCanvas !== undefined && this.yLine !== undefined && this.xLine !== undefined && this.width !== undefined && this.height !== undefined) {
      this.svgCanvas.setAttribute("width", `${this.width}px`);
      this.svgCanvas.setAttribute("height", `${this.height}px`);
      const halfWidth = this.width / 2;
      const halfHeight = this.height / 2;
      this.yLine.setAttribute("x1", `${halfWidth}px`);
      this.yLine.setAttribute("y1", "0px");
      this.yLine.setAttribute("x2", `${halfWidth}px`);
      this.yLine.setAttribute("y2", `${this.height}px`);
      this.xLine.setAttribute("x1", `${0}px`);
      this.xLine.setAttribute("y1", `${halfHeight}px`);
      this.xLine.setAttribute("x2", `${this.width}px`);
      this.xLine.setAttribute("y2", `${halfHeight}px`);
    } else {
      console.error("element value is null");
    }
  }

  createCanvas(container) {
    if (this.width !== undefined && this.height !== undefined) {
      const canvas = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      canvas.style.position = "absolute";
      canvas.style.top = "0px";
      canvas.style.left = "0px";
      canvas.style["pointer-events"] = "none";
      canvas.setAttribute("width", `${this.width}px`);
      canvas.setAttribute("height", `${this.height}px`);
      const halfWidth = this.width / 2;
      const halfHeight = this.height / 2;
      this.yLine = canvas.appendChild(this.createLine(halfWidth, 0, halfWidth, this.height, this.color, "2px"));
      this.xLine = canvas.appendChild(this.createLine(0, halfHeight, this.width, halfHeight, this.color, "2px"));
      container.appendChild(canvas);
      this.svgCanvas = canvas;
    }
  }

  createLine(x1, y1, x2, y2, color, w) {
    const aLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    aLine.setAttribute("x1", x1);
    aLine.setAttribute("y1", y1);
    aLine.setAttribute("x2", x2);
    aLine.setAttribute("y2", y2);
    aLine.setAttribute("stroke-dasharray", "5,5");
    aLine.setAttribute("stroke", color);
    aLine.setAttribute("stroke-width", w);
    return aLine;
  }

  destroy() {
    if (this.xLine !== undefined) {
      this.xLine.remove();
      this.xLine = undefined;
    }

    if (this.yLine !== undefined) {
      this.yLine.remove();
      this.yLine = undefined;
    }

    if (this.svgCanvas !== undefined) {
      this.svgCanvas.remove();
      this.svgCanvas = undefined;
    }
  }

}
// EXTERNAL MODULE: ./node_modules/mapbox-gl/dist/mapbox-gl.js
var mapbox_gl = __webpack_require__(9752);
var mapbox_gl_default = /*#__PURE__*/__webpack_require__.n(mapbox_gl);
;// CONCATENATED MODULE: ./src/components/Map/modules/PrintControl/print/ExportManager.js

function exportCanvas(canvas, options) {
  return new Promise(resolve => {
    let hidden_canv = document.createElement("canvas");
    hidden_canv.style.display = "none";
    let img = new Image();
    document.body.appendChild(hidden_canv);
    const {
      height,
      width,
      startX,
      startY
    } = options;

    img.onload = function () {
      hidden_canv.width = width;
      hidden_canv.height = height;
      let hidden_ctx = hidden_canv.getContext("2d");
      hidden_ctx.drawImage(img, startX, //Start Clipping
      startY, //Start Clipping
      width, //Clipping Width
      height, //Clipping Height
      0, //Place X
      0, //Place Y
      width, //Place Width
      height //Place Height
      );
      let data = hidden_canv.toDataURL("image/png");
      document.body.removeChild(hidden_canv);
      resolve(data);
    };

    img.src = canvas.toDataURL();
  });
}
function exportMapbox(map) {
  const hidden = document.createElement("div");
  hidden.className = "hidden-map";
  document.body.appendChild(hidden);
  let canvas = map.getCanvas();
  const container = document.createElement("div");
  container.style.width = canvas.clientWidth + "px";
  container.style.height = canvas.clientHeight + "px";
  hidden.appendChild(container);
  const renderMap = new (mapbox_gl_default()).Map({
    container,
    center: map.getCenter(),
    zoom: map.getZoom(),
    bearing: map.getBearing(),
    pitch: map.getPitch(),
    interactive: false,
    preserveDrawingBuffer: true,
    fadeDuration: 0,
    attributionControl: false,
    // hack to read transfrom request callback function
    transformRequest: map._requestManager._transformRequestFn
  });
  const style = map.getStyle();

  if (style && style.sources) {
    const sources = style.sources;
    Object.keys(sources).forEach(name => {
      const src = sources[name];
      Object.keys(src).forEach(key => {
        // delete properties if value is undefined.
        // for instance, raster-dem might has undefined value in "url" and "bounds"
        if (!src[key]) delete src[key];
      });
    });
  }

  renderMap.setStyle(style);
  return new Promise(resolve => {
    renderMap.once("idle", () => {
      const canvas = renderMap.getCanvas();
      resolve(canvas.toDataURL());
      renderMap.remove();
      hidden.parentNode?.removeChild(hidden);
    });
  });
}
;// CONCATENATED MODULE: ./src/components/Map/modules/PrintControl/print/PrintableAreaManager.js
class PrintableAreaManager {
  constructor(canvas, ratio = 1) {
    this.mapCanvas = canvas;
    this.ratio = ratio;
  }

  getCutSize() {
    return {
      width: this.cutWidth,
      height: this.cutHeight,
      startX: this.cutStartX,
      startY: this.cutStartY
    };
  }

  mapResize() {
    this.generateCutOut();
  }

  create() {
    this.createCanvas(this.mapCanvas.parentElement);
    this.generateCutOut();
  }

  createCanvas(container) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const clientWidth = this.mapCanvas.clientWidth;
    const clientHeight = this.mapCanvas.clientHeight;
    svg.style.position = "absolute";
    svg.style.top = "0px";
    svg.style.left = "0px";
    svg.style["pointer-events"] = "none";
    svg.setAttribute("width", `${clientWidth}px`);
    svg.setAttribute("height", `${clientHeight}px`);
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("style", "fill:#888888;stroke-width:0");
    path.setAttribute("fill-opacity", "0.5");
    svg.append(path);
    container.appendChild(svg);
    this.svgCanvas = svg;
    this.svgPath = path;
  }

  generateCutOut() {
    if (this.svgCanvas === undefined || this.svgPath === undefined) {
      return;
    }

    const clientWidth = this.mapCanvas.clientWidth;
    const clientHeight = this.mapCanvas.clientHeight;

    if (this.ratio >= 1) {
      this.cutWidth = Math.floor(clientHeight * 4 / 5 - 30);
      this.cutHeight = this.cutWidth / this.ratio;
    } else {
      this.cutHeight = Math.floor(clientHeight * 4 / 5 - 30);
      this.cutWidth = Math.floor(this.cutHeight * this.ratio);
    }

    this.cutStartX = clientWidth / 2 - this.cutWidth / 2;
    this.cutStartY = clientHeight / 2 - this.cutHeight / 2;
    const height = this.cutHeight;
    const width = this.cutWidth;
    const startX = this.cutStartX;
    const endX = startX + width;
    const startY = this.cutStartY;
    const endY = startY + height;
    this.svgCanvas.setAttribute("width", `${clientWidth}px`);
    this.svgCanvas.setAttribute("height", `${clientHeight}px`);
    this.svgPath.setAttribute("d", `M 0 0 L ${clientWidth} 0 L ${clientWidth} ${clientHeight} L 0 ${clientHeight} M ${startX} ${startY} L ${startX} ${endY} L ${endX} ${endY} L ${endX} ${startY}`);
  }

  destroy() {
    if (this.svgCanvas !== undefined) {
      this.svgCanvas.remove();
      this.svgCanvas = undefined;
    }
  }

}
;// CONCATENATED MODULE: ./src/components/Map/modules/PrintControl/print/index.js



;// CONCATENATED MODULE: ./src/components/Map/modules/PrintControl/store-print.js
const PRINT_MAP = {};
const initPrint = (mapId, {
  show,
  close,
  save,
  saveAll
}) => {
  PRINT_MAP[mapId] = {
    show,
    close,
    save,
    saveAll
  };
};
const showPrint = (mapId, {
  ratio = 1
} = {}) => {
  if (!PRINT_MAP[mapId]) return;
  PRINT_MAP[mapId].show({
    ratio
  });
};
const closePrint = mapId => {
  if (!PRINT_MAP[mapId]) return;
  PRINT_MAP[mapId].close();
};
const savePrint = (mapId, cb) => {
  if (!PRINT_MAP[mapId]) return;
  PRINT_MAP[mapId].save(cb);
};
const saveAllPrint = (mapId, cb) => {
  if (!PRINT_MAP[mapId]) return;
  PRINT_MAP[mapId].saveAll(cb);
};
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Map/modules/PrintControl/PrintControl.vue?vue&type=script&lang=js&






/* harmony default export */ var PrintControlvue_type_script_lang_js_ = ({
  components: {
    MapControlButton: MapControlButton/* default */.Z,
    MapControlGroupButton: MapControlGroupButton/* default */.Z
  },
  mixins: [ModuleMixin/* default */.Z],
  data: () => ({
    print: {
      show: false,
      loading: false
    }
  }),
  methods: {
    onDestroy() {
      this.onClosePrint();
    },

    async onSaveAll(cb) {
      this.print.loading = true;

      try {
        let image = await exportMapbox(this.map);

        if (cb) {
          cb(image);
        } else {
          await this.onDownload(image);
        }
      } finally {
        this.print.loading = false;
      }
    },

    async onSave(cb) {
      if (!this.printableArea) return;
      this.print.loading = true;

      try {
        let image = await exportMapbox(this.map, this.printableArea.getCutSize());

        if (cb) {
          cb(image);
        } else {
          await this.onDownload(image);
        }
      } finally {
        this.print.loading = false;
      }
    },

    onShowPrint(options) {
      this.print.show = true;
      this.toggleCrosshair(this.print.show, options);
      this.togglePrintableArea(this.print.show, options);
      this.map.on("resize", this.mapResizeBind);
    },

    onClosePrint() {
      this.print.loading = false;
      this.print.show = false;
      this.toggleCrosshair(this.print.show);
      this.togglePrintableArea(this.print.show);
      if (this.map) this.map.off("resize", this.mapResizeBind);
    },

    togglePrintableArea(show, {
      ratio = 1
    } = {}) {
      if (show === false) {
        if (this.printableArea !== undefined) {
          this.printableArea.destroy();
          this.printableArea = undefined;
        }
      } else {
        this.printableArea = new PrintableAreaManager(this.map.getCanvas(), ratio);
        this.printableArea.create();
      }
    },

    toggleCrosshair(show) {
      if (show === false) {
        if (this.crosshair !== undefined) {
          this.crosshair.destroy();
          this.crosshair = undefined;
        }
      } else {
        this.crosshair = new CrosshairManager(this.map.getCanvas());
        this.crosshair.create();
      }
    },

    onInit() {
      this.mapResizeBind = this.onMapResize.bind(this);
      initPrint(this.mapId, {
        show: options => this.onShowPrint(options),
        close: () => this.onClosePrint(),
        save: cb => this.onSave(cb),
        saveAll: cb => this.onSaveAll(cb)
      });
    },

    onMapResize() {
      if (this.printableArea) {
        this.printableArea.mapResize();
      }

      if (this.crosshair) {
        this.crosshair.mapResize();
      }
    },

    async onDownload(data64) {
      if (this.$listeners["click:download"]) {
        this.$emit("click:download", data64);
        return;
      }

      (0,FileSaver_min.saveAs)(data64, "map.png");
    }

  }
});
;// CONCATENATED MODULE: ./src/components/Map/modules/PrintControl/PrintControl.vue?vue&type=script&lang=js&
 /* harmony default export */ var PrintControl_PrintControlvue_type_script_lang_js_ = (PrintControlvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Map/modules/PrintControl/PrintControl.vue?vue&type=style&index=0&id=7ff13949&prod&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/Map/modules/PrintControl/PrintControl.vue?vue&type=style&index=0&id=7ff13949&prod&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1001);
;// CONCATENATED MODULE: ./src/components/Map/modules/PrintControl/PrintControl.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  PrintControl_PrintControlvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var PrintControl = (component.exports);

/***/ }),

/***/ 4014:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (a, b) {
  if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}
})(this, function () {
  "use strict";

  function b(a, b) {
    return "undefined" == typeof b ? b = {
      autoBom: !1
    } : "object" != typeof b && (console.warn("Deprecated: Expected third argument to be a object"), b = {
      autoBom: !b
    }), b.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob(["\uFEFF", a], {
      type: a.type
    }) : a;
  }

  function c(a, b, c) {
    var d = new XMLHttpRequest();
    d.open("GET", a), d.responseType = "blob", d.onload = function () {
      g(d.response, b, c);
    }, d.onerror = function () {
      console.error("could not download file");
    }, d.send();
  }

  function d(a) {
    var b = new XMLHttpRequest();
    b.open("HEAD", a, !1);

    try {
      b.send();
    } catch (a) {}

    return 200 <= b.status && 299 >= b.status;
  }

  function e(a) {
    try {
      a.dispatchEvent(new MouseEvent("click"));
    } catch (c) {
      var b = document.createEvent("MouseEvents");
      b.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), a.dispatchEvent(b);
    }
  }

  var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof __webpack_require__.g && __webpack_require__.g.global === __webpack_require__.g ? __webpack_require__.g : void 0,
      a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent),
      g = f.saveAs || ("object" != typeof window || window !== f ? function () {} : "download" in HTMLAnchorElement.prototype && !a ? function (b, g, h) {
    var i = f.URL || f.webkitURL,
        j = document.createElement("a");
    g = g || b.name || "download", j.download = g, j.rel = "noopener", "string" == typeof b ? (j.href = b, j.origin === location.origin ? e(j) : d(j.href) ? c(b, g, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b), setTimeout(function () {
      i.revokeObjectURL(j.href);
    }, 4E4), setTimeout(function () {
      e(j);
    }, 0));
  } : "msSaveOrOpenBlob" in navigator ? function (f, g, h) {
    if (g = g || f.name || "download", "string" != typeof f) navigator.msSaveOrOpenBlob(b(f, h), g);else if (d(f)) c(f, g, h);else {
      var i = document.createElement("a");
      i.href = f, i.target = "_blank", setTimeout(function () {
        e(i);
      });
    }
  } : function (b, d, e, g) {
    if (g = g || open("", "_blank"), g && (g.document.title = g.document.body.innerText = "downloading..."), "string" == typeof b) return c(b, d, e);
    var h = "application/octet-stream" === b.type,
        i = /constructor/i.test(f.HTMLElement) || f.safari,
        j = /CriOS\/[\d]+/.test(navigator.userAgent);

    if ((j || h && i || a) && "undefined" != typeof FileReader) {
      var k = new FileReader();
      k.onloadend = function () {
        var a = k.result;
        a = j ? a : a.replace(/^data:[^;]*;/, "data:attachment/file;"), g ? g.location.href = a : location = a, g = null;
      }, k.readAsDataURL(b);
    } else {
      var l = f.URL || f.webkitURL,
          m = l.createObjectURL(b);
      g ? g.location = m : location.href = m, g = null, setTimeout(function () {
        l.revokeObjectURL(m);
      }, 4E4);
    }
  });
  f.saveAs = g.saveAs = g,  true && (module.exports = g);
});

/***/ }),

/***/ 7512:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

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
//# sourceMappingURL=map.umd.583.js.map